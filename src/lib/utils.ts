import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isValid } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely formats a post date. Returns an empty string for missing or invalid
 * dates so a malformed frontmatter date can never crash rendering.
 */
export function formatDate(date: string | undefined, pattern = "MMM d, yyyy"): string {
  if (!date) return ""
  const parsed = new Date(date)
  return isValid(parsed) ? format(parsed, pattern) : ""
}
