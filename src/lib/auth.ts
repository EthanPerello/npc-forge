// src/lib/auth.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export type AuthUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

// Database user type (without importing from Prisma)
export type DatabaseUser = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Get the current user session on the server side
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return null;
  }
  
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };
}

/**
 * Get the current user from the database with full details
 */
export async function getCurrentUserFromDB(): Promise<DatabaseUser | null> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return null;
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    
    return user;
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return null;
  }
}

/**
 * Check if the current user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

/**
 * Get user preferences from the database
 */
export async function getUserPreferences(userId: string) {
  try {
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId },
    });
    
    return preferences;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  userId: string, 
  preferences: Partial<{
    theme: string;
    defaultTextModel: string;
    defaultImageModel: string;
    allowPublicCharacters: boolean;
    allowDataCollection: boolean;
    emailNotifications: boolean;
    otherSettings: any;
  }>
) {
  try {
    const updated = await prisma.userPreferences.upsert({
      where: { userId },
      update: preferences,
      create: {
        userId,
        ...preferences,
      },
    });
    
    return updated;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
}

/**
 * Validate API key for external integrations
 */
export async function validateApiKey(apiKey: string): Promise<DatabaseUser | null> {
  try {
    const key = await prisma.apiKey.findUnique({
      where: { 
        key: apiKey,
        isActive: true,
      },
      include: {
        user: true,
      },
    });
    
    if (!key) {
      return null;
    }
    
    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: key.id },
      data: { lastUsed: new Date() },
    });
    
    return key.user;
  } catch (error) {
    console.error('Error validating API key:', error);
    return null;
  }
}

/**
 * Generate a new API key for a user
 */
export async function createApiKey(
  userId: string, 
  name: string, 
  scopes: string[] = ['characters:read', 'chat:create']
): Promise<string> {
  try {
    // Generate a secure random API key
    const apiKey = `nf_${generateRandomString(32)}`;
    
    await prisma.apiKey.create({
      data: {
        userId,
        key: apiKey,
        name,
        scopes,
      },
    });
    
    return apiKey;
  } catch (error) {
    console.error('Error creating API key:', error);
    throw error;
  }
}

/**
 * Get usage tracking for a user and model
 */
export async function getUsageTracking(userId: string, model: string): Promise<number> {
  const monthKey = getCurrentMonthKey();
  
  try {
    const usage = await prisma.usageTracking.findUnique({
      where: {
        userId_model_monthKey: {
          userId,
          model,
          monthKey,
        },
      },
    });
    
    return usage?.count || 0;
  } catch (error) {
    console.error('Error fetching usage tracking:', error);
    return 0;
  }
}

/**
 * Increment usage tracking for a user and model
 */
export async function incrementUsageTracking(userId: string, model: string): Promise<void> {
  const monthKey = getCurrentMonthKey();
  
  try {
    await prisma.usageTracking.upsert({
      where: {
        userId_model_monthKey: {
          userId,
          model,
          monthKey,
        },
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        userId,
        model,
        monthKey,
        count: 1,
      },
    });
  } catch (error) {
    console.error('Error incrementing usage tracking:', error);
    throw error;
  }
}

/**
 * Helper function to generate random string for API keys
 */
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Get current month key in YYYY-MM format
 */
function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}