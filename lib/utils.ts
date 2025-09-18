import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the current year as a string
 * @returns Current year as string (e.g., "2025")
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}
