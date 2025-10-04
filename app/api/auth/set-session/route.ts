import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'sessionToken';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const res = NextResponse.redirect(new URL('/dashboard', req.url));
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 24 * 60 * 60,
  });

  return res;
}
