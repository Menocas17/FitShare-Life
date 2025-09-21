import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const COOKIE_NAME = "sessionToken";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, email, password_hash, avatar, created_at")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); 

  await supabase
    .from("users")
    .update({ session_token: token, session_expiry: expiry.toISOString() })
    .eq("id", user.id);

  const res = NextResponse.json({ user, message: "Login successful!" });
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 24 * 60 * 60,
  });

  return res;
}
