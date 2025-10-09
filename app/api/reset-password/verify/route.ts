import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("reset_expiry")
    .eq("reset_token", token)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  if (!user.reset_expiry || new Date(user.reset_expiry) < new Date()) {
    return NextResponse.json({ error: "Token expired" }, { status: 400 });
  }

  return NextResponse.json({ valid: true });
}
