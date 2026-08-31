"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { PixelFooter } from "@/components/PixelFooter";
import { PixelCoin, PixelSlime, PixelBat } from "@/components/PixelIcons";
import { soundManager } from "@/components/SoundManager";

export default function Home() {
  const [score, setScore] = useState(100);

  const handleCoinCollect = () => {
    setScore((prev) => prev + 100);
  };

  return (
    <div className="retro-grid-bg min-h-screen relative overflow-hidden flex flex-col justify-between">
      {/* Background Ambience Floating Sprites */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {/* Floating Coin 1 */}
        <div className="absolute top-28 left-6 md:left-14 animate-float opacity-75">
          <PixelCoin className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        {/* Floating Coin 2 */}
        <div className="absolute top-36 right-6 md:right-16 animate-floatSlow opacity-75">
          <PixelCoin className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        {/* Slime Left */}
        <div className="absolute top-1/2 left-4 md:left-10 animate-slimeWobble opacity-60">
          <PixelSlime className="w-7 h-7" color="blue" />
        </div>
        {/* Bat Right */}
        <div className="absolute top-1/2 right-4 md:right-10 animate-floatSlow opacity-60">
          <PixelBat className="w-7 h-7" />
        </div>
        {/* Floating Coin 3 */}
        <div className="absolute bottom-40 left-12 animate-float opacity-70">
          <PixelCoin className="w-5 h-5" />
        </div>
        {/* Floating Coin 4 */}
        <div className="absolute bottom-48 right-14 animate-floatSlow opacity-70">
          <PixelCoin className="w-5 h-5" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top Pixel Navigation */}
        <div className="pt-3">
          <Navbar score={score} onCoinCollect={handleCoinCollect} />
        </div>

        {/* Hero Section Banner (Platformer Stage Window) */}
        <HeroBanner onCoinCollect={handleCoinCollect} />

        {/* 3 Main Modular Windows (Matching User Mockup) */}
        <section className="px-3 md:px-6 max-w-7xl mx-auto w-full py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            {/* 1. Tentang Saya */}
            <div className="h-full">
              <AboutSection />
            </div>

            {/* 2. Proyek */}
            <div className="h-full">
              <ProjectsSection />
            </div>

            {/* 3. Kontak */}
            <div className="h-full">
              <ContactSection />
            </div>
          </div>
        </section>

        {/* Experience Section (Adventure Milestones) */}
        <ExperienceSection />

        {/* Certificates Section (Trophy Room) */}
        <CertificatesSection />
      </div>

      {/* 8-Bit Ground Footer with Interactive Props & HP Bar */}
      <PixelFooter score={score} onCoinCollect={handleCoinCollect} />
    </div>
  );
}
