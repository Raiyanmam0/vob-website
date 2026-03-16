import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voice of Business | Claim Your Throne",
  description: "Voice of Business — Empowering The Leader Within. Recruitment 2025.",
  openGraph: {
    title: "Voice of Business | Claim Your Throne",
    description: "Join the realm. Voice of Business recruitment is open.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
