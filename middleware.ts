import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sidebarLinks } from '@/constants';

const COOKIE_NAME = 'sessionToken';

// Extract protected routes from sidebarLinks
const getProtectedRoutes = () => {
  return sidebarLinks.map((link) => link.href);
};

// Additional protected routes (like account layout routes)
const additionalProtectedRoutes = ['/account'];

// Check if a pathname matches any protected route
const isProtectedRoute = (pathname: string) => {
  const sidebarRoutes = getProtectedRoutes();
  const allProtectedRoutes = [...sidebarRoutes, ...additionalProtectedRoutes];

  return allProtectedRoutes.some((route) => {
    // Handle exact matches and nested routes
    return pathname === route || pathname.startsWith(`${route}/`);
  });
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/auth/v1/callback')
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  let isValidSession = false;

  if (token) {
    const { data: user } = await supabase
      .from('users')
      .select('id, session_expiry')
      .eq('session_token', token)
      .single();

    if (user) {
      if (!user.session_expiry || new Date(user.session_expiry) > new Date()) {
        isValidSession = true;
      } else {
        await supabase
          .from('users')
          .update({ session_token: null, session_expiry: null })
          .eq('id', user.id);
      }
    }
  }

  // Redirect to login if trying to access protected routes without valid session
  if (!isValidSession && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redirect to dashboard if already logged in and trying to access login/register
  if (isValidSession && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Export matcher directly for Next 15
const sidebarRoutes = getProtectedRoutes();
export const matcher = [
  '/login',
  '/register',
  ...[...sidebarRoutes, ...additionalProtectedRoutes].map(
    (route) => `${route}/:path*`
  ),
];
