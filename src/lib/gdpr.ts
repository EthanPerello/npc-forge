// lib/gdpr.ts
import { prisma } from './prisma';
import { auditLog } from './security';

export interface UserDataExport {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  preferences: any;
  characters: any[];
  chatSessions: any[];
  apiKeys: any[];
  usageTracking: any[];
}

export interface DataRetentionPolicy {
  userDataRetentionDays: number;
  anonymizeAfterDays: number;
  inactivityThresholdDays: number;
}

const DEFAULT_RETENTION_POLICY: DataRetentionPolicy = {
  userDataRetentionDays: 365 * 2, // 2 years
  anonymizeAfterDays: 365 * 7, // 7 years
  inactivityThresholdDays: 365, // 1 year
};

/**
 * GDPR Article 15: Right of access
 * Export all user data in a portable format
 */
export async function exportUserData(userId: string): Promise<UserDataExport> {
  try {
    await auditLog({
      userId,
      action: 'DATA_EXPORT_REQUESTED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: true
    });

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Get user preferences
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId }
    });

    // Get characters (without sensitive internal data)
    const characters = await prisma.character.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        data: true,
        portraitUrl: true,
        isPublic: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    // Get chat sessions
    const chatSessions = await prisma.chatSession.findMany({
      where: { userId },
      select: {
        id: true,
        characterId: true,
        name: true,
        messages: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    // Get API keys (without the actual keys for security)
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        scopes: true,
        isActive: true,
        createdAt: true,
        lastUsed: true,
      }
    });

    // Get usage tracking
    const usageTracking = await prisma.usageTracking.findMany({
      where: { userId },
      select: {
        model: true,
        count: true,
        monthKey: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return {
      user: {
        id: user.id,
        name: user.name || '',
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      preferences,
      characters,
      chatSessions,
      apiKeys,
      usageTracking
    };

  } catch (error) {
    await auditLog({
      userId,
      action: 'DATA_EXPORT_FAILED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: false,
      details: { error: error.message }
    });
    throw error;
  }
}

/**
 * GDPR Article 17: Right to erasure (Right to be forgotten)
 * Completely delete user and all associated data
 */
export async function deleteUserData(userId: string, reason: string = 'user_request'): Promise<void> {
  try {
    await auditLog({
      userId,
      action: 'DATA_DELETION_STARTED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: true,
      details: { reason }
    });

    // Delete in the correct order due to foreign key constraints
    
    // 1. Delete chat sessions
    await prisma.chatSession.deleteMany({
      where: { userId }
    });

    // 2. Delete characters
    await prisma.character.deleteMany({
      where: { userId }
    });

    // 3. Delete API keys
    await prisma.apiKey.deleteMany({
      where: { userId }
    });

    // 4. Delete usage tracking
    await prisma.usageTracking.deleteMany({
      where: { userId }
    });

    // 5. Delete user preferences
    await prisma.userPreferences.deleteMany({
      where: { userId }
    });

    // 6. Delete sessions
    await prisma.session.deleteMany({
      where: { userId }
    });

    // 7. Delete accounts
    await prisma.account.deleteMany({
      where: { userId }
    });

    // 8. Finally delete the user
    await prisma.user.delete({
      where: { id: userId }
    });

    // Final audit log (won't include userId since user is deleted)
    await auditLog({
      action: 'DATA_DELETION_COMPLETED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: true,
      details: { deletedUserId: userId, reason }
    });

  } catch (error) {
    await auditLog({
      userId,
      action: 'DATA_DELETION_FAILED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: false,
      details: { error: error.message, reason }
    });
    throw error;
  }
}

/**
 * GDPR Article 16: Right to rectification
 * Update user data with corrections
 */
export async function updateUserData(
  userId: string, 
  updates: {
    name?: string;
    email?: string;
    preferences?: any;
  }
): Promise<void> {
  try {
    await auditLog({
      userId,
      action: 'DATA_RECTIFICATION_STARTED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: true
    });

    if (updates.name !== undefined || updates.email !== undefined) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          ...(updates.name !== undefined && { name: updates.name }),
          ...(updates.email !== undefined && { email: updates.email }),
          updatedAt: new Date(),
        }
      });
    }

    if (updates.preferences) {
      await prisma.userPreferences.upsert({
        where: { userId },
        update: {
          ...updates.preferences,
          updatedAt: new Date(),
        },
        create: {
          userId,
          ...updates.preferences,
        }
      });
    }

    await auditLog({
      userId,
      action: 'DATA_RECTIFICATION_COMPLETED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: true
    });

  } catch (error) {
    await auditLog({
      userId,
      action: 'DATA_RECTIFICATION_FAILED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: false,
      details: { error: error.message }
    });
    throw error;
  }
}

/**
 * GDPR Article 20: Right to data portability
 * Export data in a machine-readable format
 */
export async function exportUserDataPortable(userId: string): Promise<string> {
  const data = await exportUserData(userId);
  return JSON.stringify(data, null, 2);
}

/**
 * Data retention management
 * Automatically clean up old data according to retention policies
 */
export async function enforceDataRetention(
  policy: DataRetentionPolicy = DEFAULT_RETENTION_POLICY
): Promise<{ deletedUsers: number; anonymizedUsers: number }> {
  const now = new Date();
  const deletionDate = new Date(now.getTime() - policy.userDataRetentionDays * 24 * 60 * 60 * 1000);
  const anonymizationDate = new Date(now.getTime() - policy.anonymizeAfterDays * 24 * 60 * 60 * 1000);
  const inactivityDate = new Date(now.getTime() - policy.inactivityThresholdDays * 24 * 60 * 60 * 1000);

  let deletedUsers = 0;
  let anonymizedUsers = 0;

  try {
    // Find users who haven't been active and are past retention period
    const usersToDelete = await prisma.user.findMany({
      where: {
        updatedAt: { lt: deletionDate },
        // Add additional criteria like "marked for deletion" or "inactive"
      },
      select: { id: true, email: true }
    });

    // Delete users past retention period
    for (const user of usersToDelete) {
      try {
        await deleteUserData(user.id, 'retention_policy');
        deletedUsers++;
      } catch (error) {
        console.error(`Failed to delete user ${user.id}:`, error);
      }
    }

    // Find users to anonymize (older than anonymization threshold)
    const usersToAnonymize = await prisma.user.findMany({
      where: {
        updatedAt: { lt: anonymizationDate },
        email: { not: { startsWith: 'anon_' } } // Don't re-anonymize
      },
      select: { id: true }
    });

    // Anonymize very old accounts
    for (const user of usersToAnonymize) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            name: 'Anonymous User',
            email: `anon_${user.id}@deleted.local`,
            image: null,
            emailVerified: null,
            updatedAt: new Date(),
          }
        });
        anonymizedUsers++;
      } catch (error) {
        console.error(`Failed to anonymize user ${user.id}:`, error);
      }
    }

    await auditLog({
      action: 'DATA_RETENTION_ENFORCED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: true,
      details: { deletedUsers, anonymizedUsers }
    });

    return { deletedUsers, anonymizedUsers };

  } catch (error) {
    await auditLog({
      action: 'DATA_RETENTION_FAILED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: false,
      details: { error: error.message }
    });
    throw error;
  }
}

/**
 * Consent management
 */
export async function updateUserConsent(
  userId: string, 
  consents: {
    allowDataCollection?: boolean;
    allowPublicCharacters?: boolean;
    emailNotifications?: boolean;
    allowAnalytics?: boolean;
  }
): Promise<void> {
  try {
    await prisma.userPreferences.upsert({
      where: { userId },
      update: {
        ...consents,
        updatedAt: new Date(),
      },
      create: {
        userId,
        ...consents,
      }
    });

    await auditLog({
      userId,
      action: 'CONSENT_UPDATED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: true,
      details: { consents }
    });

  } catch (error) {
    await auditLog({
      userId,
      action: 'CONSENT_UPDATE_FAILED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: false,
      details: { error: error.message }
    });
    throw error;
  }
}

/**
 * Data breach notification system
 */
export async function handleDataBreach(
  description: string,
  affectedUserIds: string[],
  severity: 'low' | 'medium' | 'high' | 'critical'
): Promise<void> {
  try {
    // Log the breach
    await auditLog({
      action: 'DATA_BREACH_DETECTED',
      ip: 'server',
      userAgent: 'server',
      timestamp: new Date(),
      success: false,
      details: {
        description,
        affectedUsers: affectedUserIds.length,
        severity
      }
    });

    // In a real system, you would:
    // 1. Notify affected users via email
    // 2. Report to relevant authorities if required
    // 3. Take immediate containment actions
    // 4. Document the breach response

    console.error(`DATA BREACH [${severity.toUpperCase()}]: ${description}`);
    console.error(`Affected users: ${affectedUserIds.length}`);

    // For GDPR compliance, breaches must be reported within 72 hours
    if (severity === 'high' || severity === 'critical') {
      console.error('HIGH SEVERITY BREACH - IMMEDIATE ACTION REQUIRED');
      // Implement automatic notifications here
    }

  } catch (error) {
    console.error('Failed to handle data breach notification:', error);
  }
}