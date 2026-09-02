"use client";

import React, { useState } from "react";
import { soundManager } from "./SoundManager";
import { PixelCoin, PixelKnight } from "./PixelIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import confetti from "canvas-confetti";

interface HeroBannerProps {
  onCoinCollect: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onCoinCollect }) => {
  const [windowMinimized, setWindowMinimized] = useState(false);
  const [knightJumping, setKnightJumping] = useState(false);

  const handleStartAdventure = () => {
    soundManager.playLevelUp();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#facc15", "#38bdf8", "#4ade80", "#f43f5e"],
      });
    } catch {
      // Confetti fallback
    }

    const target = document.getElementById("world-map") || document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKnightClick = () => {
    soundManager.playJump();
    setKnightJumping(true);
    setTimeout(() => setKnightJumping(false), 500);
  };

  return (
    <section id="home" className="pt-2 sm:pt-4 pb-4 sm:pb-8 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full">
      {/* 8-Bit Window Container */}
      <div className="bg-[#9a3412] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] overflow-hidden transition-all duration-300">
        {/* Window Title Bar */}
        <div className="bg-[#c2410c] px-2.5 sm:px-3 py-1.5 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 border border-black inline-block flex-shrink-0" />
            <span className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              STAGE_01: DATA ANALYST_PORTFOLIO
            </span>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <button
              onClick={() => {
                soundManager.playClick();
                setWindowMinimized(!windowMinimized);
              }}
              title="Minimize"
              className="w-4 h-4 sm:w-5 sm:h-5 bg-[#ea580c] hover:bg-[#fb923c] text-white flex items-center justify-center border border-black active:translate-y-0.5 cursor-pointer"
            >
              _
            </button>
            <button
              onClick={() => soundManager.playClick()}
              title="Maximize"
              className="w-4 h-4 sm:w-5 sm:h-5 bg-[#ea580c] hover:bg-[#fb923c] text-white flex items-center justify-center border border-black active:translate-y-0.5 cursor-pointer"
            >
              □
            </button>
            <button
              onClick={() => {
                soundManager.playWindowClose();
                setWindowMinimized(true);
                setTimeout(() => setWindowMinimized(false), 800);
              }}
              title="Reset Window"
              className="w-4 h-4 sm:w-5 sm:h-5 bg-[#b91c1c] hover:bg-[#ef4444] text-white flex items-center justify-center border border-black active:translate-y-0.5 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window Content Area (Platformer Stage) */}
        {!windowMinimized && (
          <div className="relative bg-gradient-to-b from-[#0e517e] via-[#0284c7] to-[#38bdf8] p-3 sm:p-6 md:p-8 min-h-[340px] sm:min-h-[380px] md:min-h-[440px] flex flex-col justify-between overflow-hidden border border-[#fdba74]">
            {/* Background Pixel Clouds */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
              {/* Cloud 1 */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-10 animate-floatSlow">
                <div className="w-14 sm:w-20 md:w-24 h-5 sm:h-7 md:h-8 bg-white/90 shadow-[2px_2px_0px_#000] relative">
                  <div className="w-7 sm:w-10 md:w-12 h-3 sm:h-5 md:h-6 bg-white/90 absolute -top-2 sm:-top-3 left-3 sm:left-4" />
                </div>
              </div>
              {/* Cloud 2 */}
              <div className="absolute top-8 sm:top-12 right-6 sm:right-28 animate-float">
                <div className="w-16 sm:w-24 md:w-32 h-5 sm:h-7 md:h-8 bg-white/90 shadow-[2px_2px_0px_#000] relative">
                  <div className="w-8 sm:w-12 md:w-14 h-3 sm:h-5 md:h-6 bg-white/90 absolute -top-2 sm:-top-3 left-4 sm:left-6" />
                </div>
              </div>
            </div>

            {/* Floating Interactive Coins */}
            <div className="absolute top-6 left-1/4 animate-bouncePixel">
              <button
                onClick={() => {
                  soundManager.playCoin();
                  onCoinCollect();
                }}
                className="hover:scale-125 transition-transform cursor-pointer"
                title="Klik untuk ambil koin!"
              >
                <PixelCoin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </button>
            </div>
            <div className="absolute top-12 right-1/4 animate-bouncePixel" style={{ animationDelay: "0.3s" }}>
              <button
                onClick={() => {
                  soundManager.playCoin();
                  onCoinCollect();
                }}
                className="hover:scale-125 transition-transform cursor-pointer"
                title="Klik untuk ambil koin!"
              >
                <PixelCoin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </button>
            </div>

            {/* Center Content: Title & CTA */}
            <div className="relative z-10 text-center max-w-3xl mx-auto my-auto pt-2 pb-4 sm:pb-6 px-1">
              <p className="font-pixel text-[9px] sm:text-[11px] md:text-sm text-yellow-300 tracking-wider mb-1.5 sm:mb-2 drop-shadow-[2px_2px_0px_#000000]">
                {PORTFOLIO_DATA.hero.greeting}
              </p>
              <h1 className="font-pixel text-lg sm:text-2xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight mb-2 sm:mb-3 text-shadow-pixel whitespace-pre-line">
                <span className="text-yellow-400">{PORTFOLIO_DATA.hero.title}</span>
              </h1>
              <p className="font-vt323 text-base sm:text-xl md:text-2xl text-slate-100 mb-4 sm:mb-6 max-w-xl mx-auto tracking-wide drop-shadow-[2px_2px_0px_#000000] leading-snug">
                {PORTFOLIO_DATA.hero.subtitle}
              </p>

              {/* Glowing CTA Button */}
              <button
                onClick={handleStartAdventure}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative inline-flex items-center gap-1.5 sm:gap-2 bg-[#facc15] hover:bg-[#eab308] text-black font-pixel text-[9px] sm:text-xs md:text-sm px-4 sm:px-6 py-2.5 sm:py-3 border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] active:translate-y-1 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer animate-pulse font-bold"
              >
                <span className="text-red-600">▶</span>
                <span>{PORTFOLIO_DATA.hero.cta}</span>
                <span className="text-red-600">◀</span>
              </button>
            </div>

            {/* Bottom 8-Bit Platformer Stage Ground & Elements */}
            <div className="relative z-10 mt-auto pt-2 sm:pt-4">
              {/* Stage Characters & Props */}
              <div className="flex items-end justify-between px-1 sm:px-4 md:px-8 mb-[-2px]">
                {/* Left: Pixel Trees & Bush */}
                <div className="flex items-end gap-1">
                  {/* Big Tree */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-[#15803d] border-2 border-black rounded-none shadow-[2px_2px_0px_#000]" />
                    <div className="w-2 sm:w-3 h-3 sm:h-5 bg-[#78350f] border-x-2 border-black" />
                  </div>
                  {/* Small Tree */}
                  <div className="hidden xs:flex flex-col items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#16a34a] border-2 border-black shadow-[2px_2px_0px_#000]" />
                    <div className="w-2 sm:w-2.5 h-2.5 sm:h-4 bg-[#78350f] border-x-2 border-black" />
                  </div>
                  {/* Brick item box */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#ea580c] border-2 border-black flex items-center justify-center font-pixel text-[8px] sm:text-[10px] text-yellow-300 shadow-[2px_2px_0px_#000]">
                    ?
                  </div>
                </div>

                {/* Center: Playable Knight Character Sprite */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleKnightClick}
                    title="Klik ksatria untuk melompat!"
                    className={`cursor-pointer transition-transform ${
                      knightJumping ? "-translate-y-8 scale-110" : "hover:-translate-y-1"
                    }`}
                  >
                    <PixelKnight className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 drop-shadow-[2px_2px_0px_#000]" />
                  </button>
                </div>

                {/* Right: Castle Tower */}
                <div className="flex items-end gap-1 sm:gap-2">
                  {/* 8-Bit Castle Tower */}
                  <div className="w-14 sm:w-18 md:w-24 bg-[#64748b] border-2 sm:border-4 border-black relative">
                    {/* Battlement tops */}
                    <div className="flex justify-between -mt-2 sm:-mt-3 px-0.5 sm:px-1">
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#475569] border border-black" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#475569] border border-black" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#475569] border border-black" />
                    </div>
                    {/* Tower Windows */}
                    <div className="p-1 sm:p-2 flex flex-col items-center gap-1">
                      <div className="w-2 sm:w-3 h-3 sm:h-4 bg-black" />
                      {/* Castle Door */}
                      <div className="w-5 sm:w-6 h-6 sm:h-8 bg-[#451a03] border sm:border-2 border-black rounded-t-lg mt-0.5 sm:mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ground Grass & Dirt Blocks Layer */}
              <div className="w-full">
                <div className="h-2.5 sm:h-3 bg-[#22c55e] border-y-2 border-black" />
                <div className="h-5 sm:h-6 md:h-8 bg-[#854d0e] border-b-2 sm:border-b-4 border-black relative overflow-hidden flex items-center justify-around">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#713f12] border border-[#a16207] inline-block opacity-70"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
