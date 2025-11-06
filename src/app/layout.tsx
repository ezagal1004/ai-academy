import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
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
  title: "AI Academy - Human vs Machine",
  description: "Learn about AI and Benchmarks through interactive games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Allow scrolling but prevent bounce on mobile */
            html, body {
              overscroll-behavior: none;
              overscroll-behavior-y: none;
              overscroll-behavior-x: none;
              -webkit-overflow-scrolling: touch;
            }
            
            /* Hide scrollbars but allow scrolling */
            * {
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none; /* IE and Edge */
            }
            
            *::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
              width: 0;
              height: 0;
            }
          `
        }} />
      </head>
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