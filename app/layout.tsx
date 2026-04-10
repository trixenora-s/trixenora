import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Platform",
  description: "Harness the power of advanced AI models. Chat, create, and build.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-900 text-slate-100">{children}</body>
    </html>
  );
}

