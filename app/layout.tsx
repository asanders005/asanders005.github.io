import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

// next/font automatically self-hosts the font and injects a CSS variable.
// The `variable` name here matches what globals.css reads via var(--font-geist-mono).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Embedded Systems Developer",
  description: "Personal portfolio showcasing embedded systems and low-level software projects.",
};

// RootLayout wraps every page in the app.
// `children` is the page that matches the current URL.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full`}>
      <body className="h-full flex flex-col bg-surface text-primary antialiased">
        <Navbar />
        {/* min-h-0 prevents flex children from overflowing in some browsers */}
        <main className="flex-1 flex flex-col min-h-0">{children}</main>
      </body>
    </html>
  );
}
