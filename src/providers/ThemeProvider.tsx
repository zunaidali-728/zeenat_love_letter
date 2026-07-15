"use client";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Let Next.js properly render the children on the server to prevent SSR hydration mismatches.
  // We remove the artificial mounted blocker. 
  return <>{children}</>;
}
