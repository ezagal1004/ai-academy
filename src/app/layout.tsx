import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Academy - The Human Test",
  description: "Learn about AI and the Turing Test through an interactive game for kids aged 7-11",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Background Image - Server Rendered */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/bg.png"
            alt="AI Academy Background"
            fill
            className="object-cover"
            priority
          />
          {/* Light overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-blue-900/20" />
        </div>

        

        {/* Game Content */}
        {children}
      </body>
    </html>
  );
}