// src/app/api/v1/characters/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, validateApiKey } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Character, CharacterFormData } from '@/lib/types';
import { 
  rateLimit, 
  InputValidator, 
  auditLog, 
  getClientIP, 
  getSecurityHeaders,
  sanitizeError 
} from '@/lib/security';

// Rate limiting configurations
const GET_RATE_LIMIT = { maxRequests: 100, windowMs: 60000 }; // 100 requests per minute
const POST_RATE_LIMIT = { maxRequests: 10, windowMs: 60000 }; // 10 creates per minute

// Maximum request size (5MB)
const MAX_REQUEST_SIZE = 5 * 1024 * 1024;

// Helper function to check if error has message property
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error occurred';
}

// Helper function to authenticate request with enhanced logging
async function authenticateRequest(request: NextRequest) {
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Try API key first
  const apiKey = request.headers.get('x-api-key');
  if (apiKey) {
    try {
      const user = await validateApiKey(apiKey);
      if (user) {
        await auditLog({
          userId: user.id,
          action: 'API_KEY_AUTH_SUCCESS',
          ip,
          userAgent,
          timestamp: new Date(),
          success: true
        });
        return user;
      } else {
        await auditLog({
          action: 'API_KEY_AUTH_FAILED',
          ip,
          userAgent,
          timestamp: new Date(),
          success: false,
          details: { apiKey: `${apiKey.substring(0, 8)}...` }
        });
      }
    } catch (error) {
      await auditLog({
        action: 'API_KEY_AUTH_ERROR',
        ip,
        userAgent,
        timestamp: new Date(),
        success: false,
        details: { error: getErrorMessage(error) }
      });
    }
  }
  
  // Fall back to session
  try {
    const user = await getCurrentUser();
    if (user) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id }
      });
      
      if (dbUser) {
        await auditLog({
          userId: dbUser.id,
          action: 'SESSION_AUTH_SUCCESS',
          ip,
          userAgent,
          timestamp: new Date(),
          success: true
        });
        return dbUser;
      }
    }
  } catch (error) {
    await auditLog({
      action: 'SESSION_AUTH_ERROR',
      ip,
      userAgent,
      timestamp: new Date(),
      success: false,
      details: { error: getErrorMessage(error) }
    });
  }
  
  await auditLog({
    action: 'AUTH_FAILED',
    ip,
    userAgent,
    timestamp: new Date(),
    success: false
  });
  
  return null;
}

// GET /api/v1/characters - List user's characters with enhanced security
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await rateLimit(GET_RATE_LIMIT)(request);
    if (rateLimitResponse) return rateLimitResponse;
    
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { 
          status: 401,
          headers: getSecurityHeaders()
        }
      );
    }
    
    const { searchParams } = new URL(request.url);
    
    // Validate and sanitize query parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // Cap at 100
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
    const search = InputValidator.sanitizeString(searchParams.get('search') || '', 100);
    const isPublic = searchParams.get('public') === 'true';
    
    // Build where clause
    const where: any = {
      userId: user.id,
    };
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }
    
    if (isPublic !== undefined) {
      where.isPublic = isPublic;
    }
    
    const characters = await prisma.character.findMany({
      where,
      select: {
        id: true,
        name: true,
        data: true,
        portraitUrl: true,
        isPublic: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
      skip: offset,
      take: limit,
    });
    
    // Transform to match existing format
    const transformedCharacters = characters.map((char: any) => ({
      id: char.id,
      character: char.data as unknown as Character,
      createdAt: char.createdAt.toISOString(),
      isExample: false,
      hasStoredImage: !!char.portraitUrl,
    }));
    
    await auditLog({
      userId: user.id,
      action: 'CHARACTERS_LISTED',
      resource: 'characters',
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent') || '',
      timestamp: new Date(),
      success: true,
      details: { count: characters.length, search: !!search }
    });
    
    return NextResponse.json(transformedCharacters, {
      headers: getSecurityHeaders()
    });
    
  } catch (error) {
    console.error('Error fetching characters:', error);
    
    const sanitized = sanitizeError(error);
    
    return NextResponse.json(
      { error: sanitized.message },
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}

// POST /api/v1/characters - Create new character with enhanced validation
export async function POST(request: NextRequest) {
  try {
    // Check request size
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: 'Request too large. Maximum size is 5MB.' },
        { 
          status: 413,
          headers: getSecurityHeaders()
        }
      );
    }
    
    // Apply rate limiting
    const rateLimitResponse = await rateLimit(POST_RATE_LIMIT)(request);
    if (rateLimitResponse) return rateLimitResponse;
    
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { 
          status: 401,
          headers: getSecurityHeaders()
        }
      );
    }
    
    const body = await request.json();
    
    // Validate input data
    const { name, data, formData, tags = [], isPublic = false } = body;
    
    if (!name || !data) {
      await auditLog({
        userId: user.id,
        action: 'CHARACTER_CREATE_FAILED',
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent') || '',
        timestamp: new Date(),
        success: false,
        details: { reason: 'Missing required fields' }
      });
      
      return NextResponse.json(
        { error: 'Name and data are required' },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }
    
    // Validate character data
    const validation = InputValidator.validateCharacterData(data);
    if (!validation.isValid) {
      await auditLog({
        userId: user.id,
        action: 'CHARACTER_CREATE_FAILED',
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent') || '',
        timestamp: new Date(),
        success: false,
        details: { reason: 'Validation failed', errors: validation.errors }
      });
      
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }
    
    // Sanitize inputs
    const sanitizedName = InputValidator.sanitizeString(name, 100);
    const sanitizedTags = Array.isArray(tags) 
      ? tags.map(tag => InputValidator.sanitizeString(tag, 50)).filter(Boolean)
      : [];
    
    // Check user's character limit (prevent abuse)
    const userCharacterCount = await prisma.character.count({
      where: { userId: user.id }
    });
    
    const MAX_CHARACTERS_PER_USER = 1000; // Reasonable limit
    if (userCharacterCount >= MAX_CHARACTERS_PER_USER) {
      await auditLog({
        userId: user.id,
        action: 'CHARACTER_CREATE_FAILED',
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent') || '',
        timestamp: new Date(),
        success: false,
        details: { reason: 'Character limit exceeded', count: userCharacterCount }
      });
      
      return NextResponse.json(
        { error: 'Character limit exceeded. Please delete some characters first.' },
        { 
          status: 429,
          headers: getSecurityHeaders()
        }
      );
    }
    
    // Extract portrait URL if available
    let portraitUrl = null;
    if (data.image_url) {
      portraitUrl = data.image_url;
    }
    
    const character = await prisma.character.create({
      data: {
        userId: user.id,
        name: sanitizedName,
        data: data as any,
        portraitUrl,
        tags: sanitizedTags,
        isPublic: Boolean(isPublic),
      },
    });
    
    await auditLog({
      userId: user.id,
      action: 'CHARACTER_CREATED',
      resource: `character:${character.id}`,
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent') || '',
      timestamp: new Date(),
      success: true,
      details: { characterName: sanitizedName, isPublic }
    });
    
    // Return in format compatible with existing code
    return NextResponse.json({
      id: character.id,
      character: character.data as unknown as Character,
      createdAt: character.createdAt.toISOString(),
      isExample: false,
      formData,
      hasStoredImage: !!character.portraitUrl,
    }, {
      status: 201,
      headers: getSecurityHeaders()
    });
    
  } catch (error) {
    console.error('Error creating character:', error);
    
    const sanitized = sanitizeError(error);
    
    await auditLog({
      action: 'CHARACTER_CREATE_ERROR',
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent') || '',
      timestamp: new Date(),
      success: false,
      details: { error: sanitized.message }
    });
    
    return NextResponse.json(
      { error: sanitized.message },
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}