"use client";

import HeroSection from "@/components/HeroSection";
import TransitionSection from "@/components/TransitionSection";
import WingsSection from "@/components/WingsSection";

export default function Home() {
  return (
    <main
      className="relative"
      style={{ background: "#0A0A0A" }}
    >
      <HeroSection />
      <TransitionSection />
      <WingsSection />
    </main>
  );
}
