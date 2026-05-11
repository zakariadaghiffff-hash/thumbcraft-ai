import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ThumbCraft AI — AI YouTube Thumbnail Generator",
  description:
    "Create stunning, high-CTR YouTube thumbnails in seconds with AI. Choose from multiple styles, edit with our built-in editor, and export production-ready thumbnails.",
  keywords: [
    "YouTube thumbnail generator",
    "AI thumbnails",
    "thumbnail maker",
    "YouTube creator tools",
    "AI image generation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
