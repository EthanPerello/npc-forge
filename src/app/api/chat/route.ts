// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatAPIRequest, ChatAPIResponse, ChatMessage } from '@/lib/chat-types';
import { getUsageData, incrementUsage, hasReachedLimit, getMonthlyLimit } from '@/lib/usage-limits';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000, // 60 seconds timeout for chat responses
});

// Maximum request size (10MB)
const MAX_REQUEST_SIZE = 10 * 1024 * 1024;

// Helper function to create system message
function createSystemMessage(character: any): ChatMessage {
  const name = character.name;
  const appearance = character.appearance || "appearance unknown";
  const personality = character.personality || "personality undefined";
  const backstory = character.backstory_hook || "background mysterious";
  
  // Gather traits for context
  const traits: string[] = [];
  
  if (character.selected_traits) {
    Object.entries(character.selected_traits).forEach(([key, value]) => {
      if (value && key !== 'genre' && key !== 'sub_genre') {
        if (Array.isArray(value)) {
          traits.push(`${key.replace(/_/g, ' ')}: ${value.join(', ')}`);
        } else {
          traits.push(`${key.replace(/_/g, ' ')}: ${value}`);
        }
      }
    });
  }
  
  if (character.added_traits) {
    Object.entries(character.added_traits).forEach(([key, value]) => {
      if (value && !key.includes('error') && !key.includes('fallback') && !key.includes('api')) {
        traits.push(`${key.replace(/_/g, ' ')}: ${value}`);
      }
    });
  }
  
  const traitsText = traits.length > 0 ? `\n\nAdditional traits: ${traits.join(', ')}` : '';
  
  const systemPrompt = `You are ${name}, a character from a role-playing game. You should respond as this character would, staying true to their personality and background.

Character Details:
- Name: ${name}
- Appearance: ${appearance}
- Personality: ${personality}
- Background: ${backstory}${traitsText}

Instructions:
- Stay in character at all times
- Respond naturally as ${name} would
- Use the character's personality and background to inform your responses
- Keep responses conversational and engaging
- Don't break character or mention that you are an AI
- Draw from the character's traits and background when appropriate
- Match your response length to the user's input:
  * For simple greetings ("Hi", "Hello"): Give a brief, friendly response (1-2 sentences)
  * For casual questions: Give a moderate response (2-4 sentences)
  * For complex questions or requests for backstory/details: Give a fuller response (1-2 paragraphs)
  * Never exceed 3 paragraphs regardless of the question
- Always provide complete thoughts and sentences - never cut off mid-sentence
- If you need more space to complete your thought, prioritize being concise rather than cutting off`;

  return {
    id: `system-${Date.now()}`,
    role: 'system',
    content: systemPrompt,
    timestamp: new Date().toISOString(),
  };
}

// Helper function to determine appropriate response length based on user input
function getMaxTokensForInput(userMessage: string): number {
  const messageLength = userMessage.trim().length;
  const wordCount = userMessage.trim().split(/\s+/).length;
  
  // Check for keywords that indicate detailed responses are wanted
  const detailKeywords = [
    'backstory', 'background', 'history', 'story', 'tell me about', 'explain', 
    'describe', 'what happened', 'how did', 'why do', 'what makes', 'details',
    'elaborate', 'more about', 'in depth'
  ];
  
  const hasDetailKeyword = detailKeywords.some(keyword => 
    userMessage.toLowerCase().includes(keyword)
  );
  
  // Simple greetings and short messages
  if (messageLength < 20 || wordCount <= 3) {
    return 150; // Brief response - enough for 1-2 sentences without cutoff
  }
  
  // Requests for detailed information
  if (hasDetailKeyword || messageLength > 100 || wordCount > 15) {
    return 600; // Detailed response - enough for 1-2 paragraphs without cutoff
  }
  
  // Medium complexity questions
  if (messageLength > 50 || wordCount > 8) {
    return 350; // Moderate response - enough for 2-4 sentences without cutoff
  }
  
  // Default for casual conversation
  return 200; // Brief to moderate response without cutoff
}

// Helper function to categorize errors with proper JSON formatting
function categorizeError(error: any): { type: string; message: string; shouldRetry: boolean } {
  if (error?.status || error?.code) {
    const status = error.status;
    const message = error.message || error.error?.message || 'Unknown API error';
    
    switch (status) {
      case 429:
        return {
          type: 'rate_limit',
          message: 'Too many requests. Please try again in a few minutes.',
          shouldRetry: true
        };
      case 400:
        if (message.toLowerCase().includes('quota')) {
          return {
            type: 'quota_exceeded',
            message: 'Monthly quota exceeded for this model.',
            shouldRetry: false
          };
        }
        return {
          type: 'invalid_request',
          message: 'Invalid request. Please try again.',
          shouldRetry: false
        };
      case 401:
        return {
          type: 'authentication',
          message: 'Authentication error. Please contact support.',
          shouldRetry: false
        };
      case 403:
        return {
          type: 'quota_exceeded',
          message: 'Monthly usage limit reached.',
          shouldRetry: false
        };
      case 413:
        return {
          type: 'payload_too_large',
          message: 'Request too large. Please try with shorter message.',
          shouldRetry: false
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: 'server_error',
          message: 'Server temporarily unavailable. Please try again.',
          shouldRetry: true
        };
      default:
        return {
          type: 'api_error',
          message: 'API error occurred. Please try again.',
          shouldRetry: status >= 500
        };
    }
  }
  
  // Handle network errors
  if (error?.name === 'AbortError' || error?.message?.includes('timeout')) {
    return {
      type: 'timeout',
      message: 'Request timed out. Please try again.',
      shouldRetry: true
    };
  }
  
  if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
    return {
      type: 'network',
      message: 'Network error. Please check your connection.',
      shouldRetry: true
    };
  }
  
  return {
    type: 'unknown',
    message: error?.message || 'An unexpected error occurred',
    shouldRetry: false
  };
}

// Helper function to sanitize character ID (more robust)
function sanitizeCharacterId(id: string): string {
  // Remove or replace problematic characters that could break routing/storage
  return id
    .replace(/["""'']/g, '"') // Normalize quotes
    .replace(/—/g, '-') // Replace em dashes
    .replace(/[^\w\s-]/g, '_') // Replace other special chars with underscores
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .toLowerCase();
}

// Helper function to create a clean character object for API (remove large data)
function cleanCharacterForAPI(character: any): any {
  const cleaned = { ...character };
  
  // Remove large base64 image data to reduce payload size
  delete cleaned.image_data;
  delete cleaned.image_url;
  
  // Clean the character name to prevent ID issues
  if (cleaned.name) {
    cleaned.name = cleaned.name
      .replace(/["""'']/g, '"')
      .replace(/—/g, '-')
      .replace(/[^\w\s-]/g, '')
      .trim();
  }
  
  // Limit the size of trait objects
  if (cleaned.selected_traits) {
    Object.keys(cleaned.selected_traits).forEach(key => {
      if (typeof cleaned.selected_traits[key] === 'string' && cleaned.selected_traits[key].length > 500) {
        cleaned.selected_traits[key] = cleaned.selected_traits[key].substring(0, 500) + '...';
      }
    });
  }
  
  if (cleaned.added_traits) {
    Object.keys(cleaned.added_traits).forEach(key => {
      const value = cleaned.added_traits[key];
      if (typeof value === 'string') {
        // Clean special characters from trait values
        cleaned.added_traits[key] = value
          .replace(/["""'']/g, '"')
          .replace(/—/g, '-')
          .substring(0, 500);
      }
    });
  }
  
  return cleaned;
}

export async function POST(req: NextRequest) {
  try {
    // Check request size
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Request too large. Please try with shorter message.',
          errorType: 'payload_too_large'
        } as ChatAPIResponse,
        { status: 413 }
      );
    }

    const body: ChatAPIRequest = await req.json();
    const { characterId, character, messages, newMessage, model } = body;
    
    // Validate request
    if (!characterId || !character || !newMessage || !model) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          errorType: 'invalid_request'
        } as ChatAPIResponse,
        { status: 400 }
      );
    }
    
    // Sanitize character ID to prevent routing/storage issues
    const sanitizedCharacterId = sanitizeCharacterId(characterId);
    console.log(`Chat request for character: ${character.name} (ID: ${sanitizedCharacterId})`);
    
    // Check message length
    if (newMessage.length > 1000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message too long. Please keep messages under 1000 characters.',
          errorType: 'invalid_request'
        } as ChatAPIResponse,
        { status: 400 }
      );
    }
    
    // Clean character object to reduce payload size and fix special characters
    const cleanedCharacter = cleanCharacterForAPI(character);
    
    // Check usage limits using the existing system BEFORE making API call
    try {
      if (hasReachedLimit(model)) {
        const usageData = getUsageData(model);
        const monthlyLimit = getMonthlyLimit(model);
        
        console.log(`Chat blocked: Usage limit reached for ${model}. Used: ${usageData.count}, Limit: ${monthlyLimit}`);
        
        return NextResponse.json(
          { 
            success: false, 
            error: `Monthly limit reached for ${model}. You have used ${usageData.count} of ${monthlyLimit} generations.`,
            errorType: 'quota_exceeded'
          } as ChatAPIResponse,
          { status: 403 }
        );
      }
    } catch (limitError) {
      console.warn('Error checking usage limits (continuing anyway):', limitError);
      // Continue with request if limit checking fails (fail open)
    }
    
    // Prepare messages for OpenAI
    const systemMessage = createSystemMessage(cleanedCharacter);
    
    // Convert our chat messages to OpenAI format with proper typing
    const openaiMessages: Array<{role: 'system' | 'user' | 'assistant', content: string}> = [
      { role: 'system', content: systemMessage.content },
      ...messages
        .filter(msg => msg.role !== 'system' && !msg.isError)
        .slice(-15) // Keep recent conversation context (last 15 messages)
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
      { role: 'user', content: newMessage }
    ];
    
    console.log(`Generating chat response for ${cleanedCharacter.name} using ${model}`);
    console.log(`Message context: ${openaiMessages.length - 2} previous messages`);
    console.log(`User message: "${newMessage.substring(0, 50)}..."`);
    
    // Determine appropriate response length based on user input
    const maxTokens = getMaxTokensForInput(newMessage);
    console.log(`Setting max tokens to ${maxTokens} for user input length ${newMessage.length}`);
    
    let responseContent: string;
    let usageIncremented = false;
    
    try {
      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: model,
        messages: openaiMessages,
        temperature: 0.8,
        max_tokens: maxTokens, // Dynamic token limit based on user input
        presence_penalty: 0.1, // Slight penalty to encourage varied responses
        frequency_penalty: 0.1, // Slight penalty to reduce repetition
      });
      
      responseContent = completion.choices[0]?.message?.content || '';
      
      if (!responseContent) {
        throw new Error('No response content from OpenAI');
      }
      
      // Increment usage count AFTER successful API call
      try {
        incrementUsage(model);
        usageIncremented = true;
        console.log(`Usage incremented for model ${model}`);
      } catch (usageError) {
        console.warn('Error incrementing usage (continuing anyway):', usageError);
        // Continue anyway since the API call was successful
      }
      
    } catch (apiError) {
      console.error('OpenAI API call failed:', apiError);
      throw apiError; // Re-throw to be handled by outer catch
    }
    
    // Check if response was likely cut off and handle it
    const trimmedResponse = responseContent.trim();
    const lastChar = trimmedResponse[trimmedResponse.length - 1];
    const endsWithPunctuation = ['.', '!', '?', '"', "'"].includes(lastChar);
    
    // If response doesn't end with punctuation and seems cut off, try again with higher token limit
    if (!endsWithPunctuation && trimmedResponse.length > 50) {
      console.log('Response appears to be cut off, retrying with higher token limit');
      
      try {
        const retryCompletion = await openai.chat.completions.create({
          model: model,
          messages: openaiMessages,
          temperature: 0.8,
          max_tokens: Math.min(maxTokens * 1.5, 800), // Increase by 50% but cap at 800
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        });
        
        const retryResponse = retryCompletion.choices[0]?.message?.content;
        if (retryResponse && retryResponse.trim().length > trimmedResponse.length) {
          console.log('Retry successful, using longer response');
          responseContent = retryResponse.trim();
          
          // Only increment usage once more if the first increment failed
          if (!usageIncremented) {
            try {
              incrementUsage(model);
              usageIncremented = true;
              console.log(`Usage incremented for model ${model} on retry`);
            } catch (usageError) {
              console.warn('Error incrementing usage on retry:', usageError);
            }
          }
        }
      } catch (retryError) {
        console.warn('Retry failed, using original response:', retryError);
        // Continue with original response
        responseContent = trimmedResponse;
      }
    } else {
      responseContent = trimmedResponse;
    }
    
    // Clean the response content of special characters that might cause issues
    responseContent = responseContent
      .replace(/["""'']/g, '"')
      .replace(/—/g, '-')
      .replace(/…/g, '...');
    
    // Create the response message
    const responseMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toISOString(),
      characterId: sanitizedCharacterId,
    };
    
    console.log(`Chat response generated successfully for ${cleanedCharacter.name} (${responseContent.length} chars)`);
    
    return NextResponse.json({
      success: true,
      message: responseMessage
    } as ChatAPIResponse);
    
  } catch (error) {
    console.error('Error in chat API:', error);
    
    const errorInfo = categorizeError(error);
    
    // Ensure we always return valid JSON
    const errorResponse: ChatAPIResponse = {
      success: false,
      error: errorInfo.message,
      errorType: errorInfo.type
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}