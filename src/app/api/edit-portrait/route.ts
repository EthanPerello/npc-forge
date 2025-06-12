// src/app/api/edit-portrait/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Character, ImageModel } from '@/lib/types';
import { incrementUsage, hasReachedLimit } from '@/lib/usage-limits';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120000, // 2 minutes timeout for image editing
});

// Maximum request size (50MB to handle large images for gpt-image-1)
const MAX_REQUEST_SIZE = 50 * 1024 * 1024;

// Only gpt-image-1 supports reliable image editing
const EDIT_SUPPORTED_MODELS: ImageModel[] = ['gpt-image-1'];

interface EditPortraitRequest {
  character: Character;
  editPrompt: string;
  imageModel?: ImageModel;
}

interface EditPortraitResponse {
  success: boolean;
  character?: Character;
  error?: string;
  errorType?: string;
}

// Helper function to categorize errors
const categorizeError = (error: any): { type: string; message: string; status: number } => {
  if (error?.status || error?.code) {
    const status = error.status;
    const message = error.message || error.error?.message || 'Unknown API error';
    
    switch (status) {
      case 429:
        return {
          type: 'rate_limit',
          message: 'Rate limit exceeded. Please try again in a few minutes.',
          status: 429
        };
      case 400:
        if (message.toLowerCase().includes('prompt')) {
          return {
            type: 'invalid_request',
            message: 'Edit description too long or invalid. Please try a shorter description.',
            status: 400
          };
        }
        if (message.toLowerCase().includes('image')) {
          return {
            type: 'invalid_request',
            message: 'Image format or size not supported. Please try a different image.',
            status: 400
          };
        }
        return {
          type: 'invalid_request',
          message: 'Invalid request. Please check your edit description and image format.',
          status: 400
        };
      case 401:
        return {
          type: 'authentication',
          message: 'Authentication failed. Please check API configuration.',
          status: 401
        };
      case 403:
        return {
          type: 'quota_exceeded',
          message: 'Monthly quota exceeded for this model tier.',
          status: 403
        };
      case 413:
        return {
          type: 'payload_too_large',
          message: 'Image too large. Please try with a smaller image.',
          status: 413
        };
      default:
        return {
          type: 'api_error',
          message: `API error: ${message}`,
          status: status || 500
        };
    }
  }
  
  if (error?.name === 'AbortError' || error?.message?.includes('timeout')) {
    return {
      type: 'timeout',
      message: 'Image editing timed out. Please try again.',
      status: 408
    };
  }
  
  return {
    type: 'unknown',
    message: error?.message || 'An unexpected error occurred',
    status: 500
  };
};

// Helper function to validate edit prompt
function validateEditPrompt(prompt: string, model: ImageModel): { isValid: boolean; error?: string } {
  if (!prompt || typeof prompt !== 'string') {
    return { isValid: false, error: 'Edit description is required' };
  }
  
  const trimmedPrompt = prompt.trim();
  if (trimmedPrompt.length === 0) {
    return { isValid: false, error: 'Edit description cannot be empty' };
  }
  
  // GPT-Image-1 supports up to 32,000 characters
  const maxLength = 32000;
  if (trimmedPrompt.length > maxLength) {
    return { 
      isValid: false, 
      error: `Edit description is too long (max ${maxLength} characters)` 
    };
  }
  
  return { isValid: true };
}

// Helper function to validate image size
function validateImageSize(imageData: string): { isValid: boolean; error?: string } {
  // Remove data URL prefix to get base64 data
  const base64Data = imageData.split(',')[1];
  if (!base64Data) {
    return { isValid: false, error: 'Invalid image data format' };
  }
  
  // Estimate file size from base64 length
  const sizeInBytes = (base64Data.length * 3) / 4;
  const sizeInMB = sizeInBytes / (1024 * 1024);
  
  // GPT-Image-1 supports up to 50MB
  const maxSize = 50;
  
  if (sizeInMB > maxSize) {
    return { 
      isValid: false, 
      error: `Image too large (${sizeInMB.toFixed(2)}MB). Maximum size is ${maxSize}MB.` 
    };
  }
  
  return { isValid: true };
}

// Helper function to convert base64 data URL to File object
function dataURLToFile(dataURL: string, filename: string = 'image.png'): File {
  // Remove the data URL prefix (data:image/png;base64,)
  const base64Data = dataURL.split(',')[1];
  if (!base64Data) {
    throw new Error('Invalid data URL format');
  }
  
  // Convert to binary string then to Uint8Array
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Create a File object
  return new File([bytes], filename, { type: 'image/png' });
}

export async function POST(request: NextRequest) {
  try {
    // Check request size
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Request too large. Please try with a smaller image.',
          errorType: 'payload_too_large'
        } as EditPortraitResponse,
        { status: 413 }
      );
    }

    const body: EditPortraitRequest = await request.json();
    const { character, editPrompt, imageModel = 'gpt-image-1' } = body;
    
    // Validate that the model supports editing
    if (!EDIT_SUPPORTED_MODELS.includes(imageModel)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `${imageModel} doesn't support reliable image editing. Please use gpt-image-1.`,
          errorType: 'unsupported_model'
        } as EditPortraitResponse,
        { status: 400 }
      );
    }
    
    // Validate request
    if (!character) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Character data is required',
          errorType: 'invalid_request'
        } as EditPortraitResponse,
        { status: 400 }
      );
    }
    
    if (!character.image_data && !character.image_url) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Character must have an existing portrait to edit',
          errorType: 'invalid_request'
        } as EditPortraitResponse,
        { status: 400 }
      );
    }
    
    // Validate edit prompt
    const promptValidation = validateEditPrompt(editPrompt, imageModel);
    if (!promptValidation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: promptValidation.error,
          errorType: 'invalid_request'
        } as EditPortraitResponse,
        { status: 400 }
      );
    }
    
    console.log(`Editing portrait for character: ${character.name}`);
    console.log(`Edit prompt: "${editPrompt}"`);
    console.log(`Using image model: ${imageModel}`);
    
    // Check usage limits BEFORE making API call
    try {
      if (hasReachedLimit(imageModel)) {
        console.log(`Portrait editing blocked: Usage limit reached for ${imageModel}`);
        return NextResponse.json(
          { 
            success: false, 
            error: `Monthly limit reached for ${imageModel}. Please wait until next month.`,
            errorType: 'quota_exceeded'
          } as EditPortraitResponse,
          { status: 403 }
        );
      }
    } catch (limitError) {
      console.warn('Error checking image model usage limits (continuing anyway):', limitError);
    }
    
    try {
      // Get the current image data
      let imageData: string;
      
      if (character.image_data) {
        imageData = character.image_data;
      } else if (character.image_url) {
        // Fetch image from URL and convert to data URL
        const imageResponse = await fetch(character.image_url);
        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch image: ${imageResponse.status}`);
        }
        const arrayBuffer = await imageResponse.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        imageData = `data:image/png;base64,${base64}`;
      } else {
        throw new Error('No image data available for editing');
      }

      // Validate image size
      const sizeValidation = validateImageSize(imageData);
      if (!sizeValidation.isValid) {
        return NextResponse.json(
          { 
            success: false, 
            error: sizeValidation.error,
            errorType: 'invalid_request'
          } as EditPortraitResponse,
          { status: 400 }
        );
      }
      
      // Convert to File object
      const imageFile = dataURLToFile(imageData, 'image.png');
      
      console.log(`Image file size: ${imageFile.size} bytes (${(imageFile.size / (1024 * 1024)).toFixed(2)}MB)`);
      console.log(`Image file type: ${imageFile.type}`);
      console.log(`Using OpenAI image editing endpoint with ${imageModel}`);
      
      // Prepare API parameters for GPT-Image-1
      const editParams = {
        model: imageModel,
        image: imageFile,
        prompt: editPrompt,
        n: 1,
        size: '1024x1024' as const,
        quality: 'high' as const,
        output_format: 'png' as const
      };
      
      console.log('Edit parameters:', {
        model: editParams.model,
        promptLength: editParams.prompt.length,
        size: editParams.size,
        quality: editParams.quality,
        output_format: editParams.output_format,
        imageSize: `${(imageFile.size / (1024 * 1024)).toFixed(2)}MB`,
        imageType: imageFile.type
      });
      
      // Use the OpenAI image editing endpoint
      const editResponse = await openai.images.edit(editParams);
      
      // Extract the image data (GPT-Image-1 returns base64 directly)
      const b64Image = editResponse.data[0].b64_json;
      if (!b64Image) {
        throw new Error('No base64 image data returned from GPT-Image-1 editing');
      }
      
      const editedImageData = `data:image/png;base64,${b64Image}`;
      
      // Validate the edited image data
      if (!editedImageData.match(/^data:image\/[^;]+;base64,[A-Za-z0-9+/]*={0,2}$/)) {
        throw new Error('Invalid base64 image data received from editing');
      }
      
      // Increment usage count AFTER successful editing
      try {
        incrementUsage(imageModel);
        console.log(`Successfully incremented usage for image model ${imageModel}`);
      } catch (usageError) {
        console.warn('Error incrementing image model usage (continuing anyway):', usageError);
      }
      
      // Create updated character with the edited portrait
      const updatedCharacter: Character = {
        ...character,
        image_data: editedImageData,
        portrait_options: {
          ...character.portrait_options,
          image_model: imageModel
        }
      };
      
      console.log(`Successfully edited portrait for character: ${character.name} using ${imageModel}!`);
      
      return NextResponse.json({
        success: true,
        character: updatedCharacter
      } as EditPortraitResponse);
      
    } catch (apiError) {
      console.error('Image editing API error:', apiError);
      
      const errorInfo = categorizeError(apiError);
      return NextResponse.json(
        {
          success: false,
          error: errorInfo.message,
          errorType: errorInfo.type
        } as EditPortraitResponse,
        { status: errorInfo.status }
      );
    }
    
  } catch (error) {
    console.error('Request processing error:', error);
    
    const errorInfo = categorizeError(error);
    
    return NextResponse.json(
      {
        success: false,
        error: errorInfo.message,
        errorType: errorInfo.type
      } as EditPortraitResponse,
      { status: errorInfo.status }
    );
  }
}