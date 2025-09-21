import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const COOKIE_NAME = "sessionToken";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/auth/v1/callback")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  let isValidSession = false;

  if (token) {
    const { data: user } = await supabase
      .from("users")
      .select("id, session_expiry")
      .eq("session_token", token)
      .single();

    if (user) {
      if (!user.session_expiry || new Date(user.session_expiry) > new Date()) {
        isValidSession = true;
      } else {
        await supabase
          .from("users")
          .update({ session_token: null, session_expiry: null })
          .eq("id", user.id);
      }
    }
  }

  if (!isValidSession && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isValidSession && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
