import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  fallback: ["monospace"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitShare Life - Your Fitness Journey",
  description:
    "Track workouts, connect with fitness enthusiasts, and achieve your fitness goals with FitShare Life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = [geistSans.variable, geistMono.variable]
    .filter(Boolean)
    .join(" ");

  return (
    <html lang="en">
      <body className={fontClasses || "font-sans"}>{children}</body>
    </html>
  );
}
