import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, name")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json(
      { error: "No account found with that email." },
      { status: 404 }
    );
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 3600 * 1000).toISOString();

  await supabase
    .from("users")
    .update({ reset_token: token, reset_expiry: expiry })
    .eq("id", user.id);

  await sendResetEmail(user.email, token);

  return NextResponse.json({ message: "Password reset email sent." });
}
