import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/editor'];

// Routes that should redirect to editor if already logged in
const authRoutes = ['/auth'];

export function middleware(request: NextRequest) {
  // Check for custom JWT token OR NextAuth session token
  const customToken = request.cookies.get('auth-token')?.value;
  const nextAuthToken = request.cookies.get('next-auth.session-token')?.value 
    || request.cookies.get('__Secure-next-auth.session-token')?.value;
  
  const isAuthenticated = !!customToken || !!nextAuthToken;
  const { pathname } = request.nextUrl;

  console.log('Middleware - path:', pathname, 'authenticated:', isAuthenticated);

  // Check if accessing protected routes
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // If trying to access protected route without any token, redirect to auth
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL('/auth', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // If trying to access auth route with token, redirect to editor
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/editor', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/editor/:path*', '/auth'],
};
