import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const COOKIE_NAME = "sessionToken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Find the user by session_token
  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, email, avatar, created_at")
    .eq("session_token", token)
    .single();

  if (error || !user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (token) {
    // Clear the session token in the database
    await supabase
      .from("users")
      .update({ session_token: null, session_expiry: null })
      .eq("session_token", token);
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
