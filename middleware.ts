// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check route types
    const isV1ApiRoute = req.nextUrl.pathname.startsWith('/api/v1');
    const isAuthApiRoute = req.nextUrl.pathname.startsWith('/api/auth');
    const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');
    const isExistingApiRoute = req.nextUrl.pathname.startsWith('/api/') && 
                              !req.nextUrl.pathname.startsWith('/api/v1') && 
                              !req.nextUrl.pathname.startsWith('/api/auth');
    
    // Allow existing API routes (generate, chat, etc.) to pass through unchanged
    if (isExistingApiRoute) {
      return NextResponse.next();
    }
    
    // Allow auth API routes to pass through
    if (isAuthApiRoute) {
      return NextResponse.next();
    }
    
    // For new v1 API routes, check for API key or session
    if (isV1ApiRoute) {
      const apiKey = req.headers.get('x-api-key');
      const hasSession = req.nextauth.token;
      
      // If no API key and no session, require authentication
      if (!apiKey && !hasSession) {
        return new NextResponse(
          JSON.stringify({ error: 'Authentication required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // For dashboard routes, require authentication
    if (isDashboardRoute && !req.nextauth.token) {
      const signInUrl = new URL('/auth/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(signInUrl);
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to main app even without authentication (backwards compatibility)
        const isMainApp = req.nextUrl.pathname === '/' || 
                         req.nextUrl.pathname.startsWith('/library') ||
                         req.nextUrl.pathname.startsWith('/chat') ||
                         req.nextUrl.pathname.startsWith('/docs');
        
        // Allow existing API routes to work without auth changes
        const isExistingApiRoute = req.nextUrl.pathname.startsWith('/api/') && 
                                  !req.nextUrl.pathname.startsWith('/api/v1') && 
                                  !req.nextUrl.pathname.startsWith('/api/auth');
        
        if (isMainApp || isExistingApiRoute) {
          return true; // Allow access regardless of auth status
        }
        
        // Require authentication for protected routes
        const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') ||
                               req.nextUrl.pathname.startsWith('/api/v1');
        
        if (isProtectedRoute) {
          return !!token; // Require authentication
        }
        
        return true; // Allow access to other routes
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/v1/:path*',
    '/auth/:path*',
  ],
};