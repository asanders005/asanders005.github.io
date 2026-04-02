// Server Component — can export `metadata` because there is no "use client".
// All interactive/animated code lives in HeroSection (a Client Component).
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Portfolio | Aiden Sanders",
};

export default function HomePage() {
  return <HeroSection />;
}
