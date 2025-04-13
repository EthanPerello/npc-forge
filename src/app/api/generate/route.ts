import { NextRequest, NextResponse } from 'next/server';
import { generateCharacter, generatePortrait } from '@/lib/openai';

export const maxDuration = 60; // Set maximum duration for this route to 60 seconds

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { description, genre } = body;

    // Validate inputs
    if (!description) {
      return NextResponse.json({ error: 'Character description is required' }, { status: 400 });
    }

    // Log request info
    console.log(`Generating character with description: "${description.substring(0, 30)}..." and genre: ${genre || 'none'}`);

    // Generate character
    const character = await generateCharacter(description, genre);
    
    // Log successful character generation
    console.log(`Successfully generated character: ${character.name}`);

    // Generate portrait (optional - you can make this configurable)
    try {
      const imageUrl = await generatePortrait(character);
      character.image_url = imageUrl;
      console.log(`Successfully generated portrait for ${character.name}`);
    } catch (imageError) {
      console.error('Error generating portrait (continuing without image):', imageError);
      // Continue without an image if the image generation fails
    }

    // Return the generated character
    return NextResponse.json({ character });
  } catch (error) {
    console.error('Error generating character:', error);
    
    // Provide a more descriptive error message based on the error type
    let errorMessage = 'Failed to generate character. Please try again.';
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'OpenAI API key error. Please check your API configuration.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. The server took too long to respond.';
        statusCode = 504;
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Rate limit exceeded. Please try again in a few moments.';
        statusCode = 429;
      }
      console.error(`Error details: ${error.message}`);
    }
    
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}