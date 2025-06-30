// app/api/v1/characters/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, validateApiKey } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Character, CharacterFormData } from '@/lib/types';

// Helper function to authenticate request
async function authenticateRequest(request: NextRequest) {
  // Try API key first
  const apiKey = request.headers.get('x-api-key');
  if (apiKey) {
    const user = await validateApiKey(apiKey);
    if (user) {
      return user;
    }
  }
  
  // Fall back to session
  const user = await getCurrentUser();
  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    });
    return dbUser;
  }
  
  return null;
}

// GET /api/v1/characters/[id] - Get specific character
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const character = await prisma.character.findUnique({
      where: {
        id: params.id,
        userId: user.id, // Ensure user owns the character
      },
    });
    
    if (!character) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }
    
    // Return in format compatible with existing code
    return NextResponse.json({
      id: character.id,
      character: character.data as Character,
      createdAt: character.createdAt.toISOString(),
      isExample: false,
      hasStoredImage: !!character.portraitUrl,
    });
  } catch (error) {
    console.error('Error fetching character:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/v1/characters/[id] - Update character
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { name, data, formData, tags, isPublic } = body;
    
    // Verify character exists and user owns it
    const existingCharacter = await prisma.character.findUnique({
      where: {
        id: params.id,
        userId: user.id,
      },
    });
    
    if (!existingCharacter) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }
    
    // Extract portrait URL if available
    let portraitUrl = existingCharacter.portraitUrl;
    if (data?.image_url) {
      portraitUrl = data.image_url;
    }
    
    // Build update data
    const updateData: any = {
      updatedAt: new Date(),
    };
    
    if (name !== undefined) updateData.name = name;
    if (data !== undefined) updateData.data = data;
    if (portraitUrl !== undefined) updateData.portraitUrl = portraitUrl;
    if (tags !== undefined) updateData.tags = tags;
    if (isPublic !== undefined) updateData.isPublic = isPublic;
    
    const updatedCharacter = await prisma.character.update({
      where: { id: params.id },
      data: updateData,
    });
    
    // Return in format compatible with existing code
    return NextResponse.json({
      id: updatedCharacter.id,
      character: updatedCharacter.data as Character,
      createdAt: updatedCharacter.createdAt.toISOString(),
      isExample: false,
      formData,
      hasStoredImage: !!updatedCharacter.portraitUrl,
    });
  } catch (error) {
    console.error('Error updating character:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/v1/characters/[id] - Delete character
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify character exists and user owns it
    const existingCharacter = await prisma.character.findUnique({
      where: {
        id: params.id,
        userId: user.id,
      },
    });
    
    if (!existingCharacter) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }
    
    // Delete related chat sessions first
    await prisma.chatSession.deleteMany({
      where: {
        characterId: params.id,
        userId: user.id,
      },
    });
    
    // Delete the character
    await prisma.character.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting character:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}