import { NextRequest, NextResponse } from 'next/server';
import { generateCharacter, generatePortrait } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { description, genre } = body;

    // Validate inputs
    if (!description) {
      return NextResponse.json({ error: 'Character description is required' }, { status: 400 });
    }

    // Generate character
    const character = await generateCharacter(description, genre);

    // Generate portrait (optional - you can make this configurable)
    try {
      const imageUrl = await generatePortrait(character);
      character.image_url = imageUrl;
    } catch (imageError) {
      console.error('Error generating portrait (continuing without image):', imageError);
      // Continue without an image if the image generation fails
    }

    // Return the generated character
    return NextResponse.json({ character });
  } catch (error) {
    console.error('Error generating character:', error);
    return NextResponse.json(
      { error: 'Failed to generate character. Please try again.' }, 
      { status: 500 }
    );
  }
}