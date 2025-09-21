import { NextResponse } from "next/server";

const COOKIE_NAME = "sessionToken";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully" });

  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    expires: new Date(0), 
    httpOnly: true,
  });

  return res;
}
