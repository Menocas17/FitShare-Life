"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "@/components/page-components/Header";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [color, setColor] = useState<"red" | "green">("red");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Optional: verify token validity on page load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      const res = await fetch(`/api/reset-password/verify?token=${token}`);
      setIsValid(res.ok);
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setColor("red");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/reset-password/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to reset password.");
      setColor("red");
    } else {
      setMessage("Password reset successful! Redirecting...");
      setColor("green");
      setTimeout(() => router.push("/login"), 2000);
    }
    setLoading(false);
  };

  if (isValid === false) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center flex-grow">
          <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Invalid or expired link
            </h2>
            <p className="text-text-light mb-4">
              Please request a new password reset link.
            </p>
            <Button onClick={() => router.push("/login")}>Go to Login</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center flex-grow">
        <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-foreground mb-6">
            Reset Password
          </h2>

          {isValid === null ? (
            <p className="text-center text-text-light">Verifying link...</p>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-border"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-border"
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}

          {message && (
            <p
              className={`mt-4 text-center ${
                color === "green" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
