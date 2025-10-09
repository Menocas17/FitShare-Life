import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const COOKIE_NAME = "sessionToken";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { data: user, error } = await supabase
    .from("users")
    .insert({
      name,
      email,
      password_hash: hashedPassword,
      session_token: null,
      session_expiry: null,
    })
    .select("id, name, email, created_at")
    .single();

  if (error || !user) {
    return NextResponse.json(
      { error: error?.message || "Registration failed." },
      { status: 400 }
    );
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); 

  await supabase
    .from("users")
    .update({ session_token: token, session_expiry: expiry.toISOString() })
    .eq("id", user.id);

  const res = NextResponse.json({ user, message: "Registration successful!" });
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 24 * 60 * 60,
  });

  return res;
}
