// lib/security.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from './prisma';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface SecurityAuditLog {
  userId?: string;
  action: string;
  resource?: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  details?: any;
}

/**
 * Rate limiting middleware
 */
export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const ip = getClientIP(request);
    const key = `${ip}:${request.nextUrl.pathname}`;
    const now = Date.now();
    
    const existing = rateLimitStore.get(key);
    
    if (!existing || now > existing.resetTime) {
      // Reset window
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });
      return null; // Allow request
    }
    
    if (existing.count >= config.maxRequests) {
      // Rate limit exceeded
      await auditLog({
        action: 'RATE_LIMIT_EXCEEDED',
        ip,
        userAgent: request.headers.get('user-agent') || '',
        timestamp: new Date(),
        success: false,
        details: { endpoint: request.nextUrl.pathname, count: existing.count }
      });
      
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((existing.resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(existing.resetTime / 1000).toString()
          }
        }
      );
    }
    
    // Increment counter
    existing.count++;
    rateLimitStore.set(key, existing);
    
    return null; // Allow request
  };
}

/**
 * Input validation and sanitization
 */
export class InputValidator {
  static sanitizeString(input: string, maxLength: number = 1000): string {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/[<>]/g, '') // Basic XSS prevention
      .replace(/javascript:/gi, '') // Prevent javascript: URLs
      .replace(/data:/gi, ''); // Prevent data: URLs (except images which need special handling)
  }
  
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }
  
  static isValidImageData(data: string): boolean {
    // Check if it's a valid base64 image
    const imageRegex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
    return imageRegex.test(data) && data.length <= 10 * 1024 * 1024; // 10MB limit
  }
  
  static validateCharacterData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!data.name || typeof data.name !== 'string') {
      errors.push('Character name is required and must be a string');
    } else if (data.name.length > 100) {
      errors.push('Character name must be less than 100 characters');
    }
    
    if (data.description && data.description.length > 5000) {
      errors.push('Character description must be less than 5000 characters');
    }
    
    if (data.image_data && !this.isValidImageData(data.image_data)) {
      errors.push('Invalid image data format or size');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

/**
 * Security audit logging
 */
export async function auditLog(log: SecurityAuditLog): Promise<void> {
  try {
    // In production, you might want to use a dedicated audit log service
    // or a separate database table for audit logs
    console.log('[AUDIT]', JSON.stringify({
      ...log,
      // Never log sensitive data
      details: log.details ? 'REDACTED' : undefined
    }));
    
    // Store in database if needed
    if (process.env.NODE_ENV === 'production') {
      // You could add an AuditLog model to Prisma schema
      // await prisma.auditLog.create({ data: log });
    }
  } catch (error) {
    // Audit logging should never break the main flow
    console.error('Failed to write audit log:', error);
  }
}

/**
 * Get client IP address safely
 */
export function getClientIP(request: NextRequest): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const xRealIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  
  if (xRealIP) {
    return xRealIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
}

/**
 * Content Security Policy headers
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.openai.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),
    
    // Other security headers
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    
    // Remove potentially revealing headers
    'X-Powered-By': 'NPC Forge'
  };
}

/**
 * Sanitize error messages for API responses
 */
export function sanitizeError(error: any): { message: string; code?: string } {
  // Never expose internal error details in production
  if (process.env.NODE_ENV === 'production') {
    // Map specific errors to user-friendly messages
    if (error.code === 'P2002') {
      return { message: 'A record with this information already exists' };
    }
    
    if (error.message?.includes('authentication')) {
      return { message: 'Authentication required' };
    }
    
    if (error.message?.includes('authorization')) {
      return { message: 'Access denied' };
    }
    
    // Generic message for unknown errors
    return { message: 'An error occurred. Please try again.' };
  }
  
  // In development, return more details
  return {
    message: error.message || 'Unknown error',
    code: error.code
  };
}

/**
 * Data encryption helpers (for sensitive fields)
 */
export class DataEncryption {
  private static getEncryptionKey(): string {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
      throw new Error('ENCRYPTION_KEY environment variable is required');
    }
    return key;
  }
  
  // Note: This is a simplified example. In production, use a proper encryption library
  // like @aws-crypto/client-node or similar
  static async encrypt(data: string): Promise<string> {
    // Implement proper encryption here
    // For now, this is just base64 encoding (NOT SECURE - example only)
    return Buffer.from(data).toString('base64');
  }
  
  static async decrypt(encryptedData: string): Promise<string> {
    // Implement proper decryption here
    // For now, this is just base64 decoding (NOT SECURE - example only)
    return Buffer.from(encryptedData, 'base64').toString();
  }
}

/**
 * Session security enhancements
 */
export function enhanceSessionSecurity() {
  return {
    // Implement session revocation
    async revokeUserSessions(userId: string): Promise<void> {
      try {
        // Delete all sessions for the user
        await prisma.session.deleteMany({
          where: { userId }
        });
        
        await auditLog({
          userId,
          action: 'SESSIONS_REVOKED',
          ip: 'server',
          userAgent: 'server',
          timestamp: new Date(),
          success: true
        });
      } catch (error) {
        console.error('Failed to revoke sessions:', error);
        throw error;
      }
    },
    
    // Track suspicious activity
    async trackSuspiciousActivity(userId: string, activity: string): Promise<void> {
      await auditLog({
        userId,
        action: 'SUSPICIOUS_ACTIVITY',
        ip: 'server',
        userAgent: 'server',
        timestamp: new Date(),
        success: false,
        details: { activity }
      });
    }
  };
}