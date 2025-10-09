import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { sendPasswordChangeConfirmation } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Token and password are required." }, { status: 400 });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("reset_token", token)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "Invalid or expired token." }, { status: 400 });
  }

  if (!user.reset_expiry || new Date(user.reset_expiry) < new Date()) {
    return NextResponse.json({ error: "Token expired." }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const { error: updateError } = await supabase
    .from("users")
    .update({
      password_hash: hashed,
      reset_token: null,
      reset_expiry: null,
    })
    .eq("id", user.id);

  if (updateError) {
    return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
  }

  try {
    await sendPasswordChangeConfirmation(user.email);
  } catch (err) {
    console.error("Email send error:", err);
  }

  return NextResponse.json({ message: "Password reset successful!" });
}
