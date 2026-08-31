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
    // Confetti burst
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

    const target = document.getElementById("about");
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
    <section id="home" className="pt-4 pb-8 px-3 md:px-6 max-w-7xl mx-auto w-full">
      {/* 8-Bit Window Container */}
      <div className="bg-[#9a3412] border-4 border-black shadow-[6px_6px_0px_#000000] overflow-hidden transition-all duration-300">
        {/* Window Title Bar */}
        <div className="bg-[#c2410c] px-3 py-1.5 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 border border-black inline-block" />
            <span className="font-pixel text-[10px] md:text-xs text-white tracking-wider font-bold">
              QUEST_WINDOW_STAGE_01.EXE
            </span>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1 font-pixel text-[10px]">
            <button
              onClick={() => {
                soundManager.playClick();
                setWindowMinimized(!windowMinimized);
              }}
              title="Minimize"
              className="w-5 h-5 bg-[#ea580c] hover:bg-[#fb923c] text-white flex items-center justify-center border-2 border-black active:translate-y-0.5"
            >
              _
            </button>
            <button
              onClick={() => soundManager.playClick()}
              title="Maximize"
              className="w-5 h-5 bg-[#ea580c] hover:bg-[#fb923c] text-white flex items-center justify-center border-2 border-black active:translate-y-0.5"
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
              className="w-5 h-5 bg-[#b91c1c] hover:bg-[#ef4444] text-white flex items-center justify-center border-2 border-black active:translate-y-0.5"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window Content Area (Platformer Stage) */}
        {!windowMinimized && (
          <div className="relative bg-gradient-to-b from-[#0e517e] via-[#0284c7] to-[#38bdf8] p-4 md:p-8 min-h-[380px] md:min-h-[440px] flex flex-col justify-between overflow-hidden border-2 border-[#fdba74]">
            {/* Background Pixel Clouds & Stars */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
              {/* Cloud 1 */}
              <div className="absolute top-6 left-10 animate-floatSlow">
                <div className="w-16 md:w-24 h-6 md:h-8 bg-white/90 shadow-[2px_2px_0px_#000] relative">
                  <div className="w-8 md:w-12 h-4 md:h-6 bg-white/90 absolute -top-3 left-4" />
                </div>
              </div>
              {/* Cloud 2 */}
              <div className="absolute top-12 right-28 animate-float">
                <div className="w-20 md:w-32 h-6 md:h-8 bg-white/90 shadow-[2px_2px_0px_#000] relative">
                  <div className="w-10 md:w-14 h-4 md:h-6 bg-white/90 absolute -top-3 left-6" />
                </div>
              </div>
            </div>

            {/* Floating Interactive Coins */}
            <div className="absolute top-8 left-1/4 animate-bouncePixel">
              <button
                onClick={() => {
                  soundManager.playCoin();
                  onCoinCollect();
                }}
                className="hover:scale-125 transition-transform cursor-pointer"
                title="Klik untuk ambil koin!"
              >
                <PixelCoin className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            </div>
            <div className="absolute top-16 right-1/4 animate-bouncePixel" style={{ animationDelay: "0.3s" }}>
              <button
                onClick={() => {
                  soundManager.playCoin();
                  onCoinCollect();
                }}
                className="hover:scale-125 transition-transform cursor-pointer"
                title="Klik untuk ambil koin!"
              >
                <PixelCoin className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            </div>

            {/* Center Content: Title & CTA */}
            <div className="relative z-10 text-center max-w-3xl mx-auto my-auto pt-2 pb-6">
              <p className="font-pixel text-[11px] md:text-sm text-yellow-300 tracking-wider mb-2 drop-shadow-[2px_2px_0px_#000000]">
                {PORTFOLIO_DATA.hero.greeting}
              </p>
              <h1 className="font-pixel text-2xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight mb-3 text-shadow-pixel">
                <span className="text-yellow-400">{PORTFOLIO_DATA.hero.title}</span>
              </h1>
              <p className="font-vt323 text-lg md:text-2xl text-slate-100 mb-6 max-w-xl mx-auto tracking-wide drop-shadow-[2px_2px_0px_#000000]">
                {PORTFOLIO_DATA.hero.subtitle}
              </p>

              {/* Glowing CTA Button */}
              <button
                onClick={handleStartAdventure}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative inline-flex items-center gap-2 bg-[#facc15] hover:bg-[#eab308] text-black font-pixel text-xs md:text-sm px-6 py-3 border-4 border-black shadow-[4px_4px_0px_#000000] active:translate-y-1 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer animate-pulse"
              >
                <span className="text-red-600">▶</span>
                <span>{PORTFOLIO_DATA.hero.cta}</span>
                <span className="text-red-600">◀</span>
              </button>
            </div>

            {/* Bottom 8-Bit Platformer Stage Ground & Elements */}
            <div className="relative z-10 mt-auto pt-4">
              {/* Stage Characters & Props */}
              <div className="flex items-end justify-between px-2 md:px-8 mb-[-2px]">
                {/* Left: Pixel Trees & Bush */}
                <div className="flex items-end gap-1">
                  {/* Big Tree */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-[#15803d] border-2 border-black rounded-none shadow-[2px_2px_0px_#000]" />
                    <div className="w-3 h-5 bg-[#78350f] border-x-2 border-black" />
                  </div>
                  {/* Small Tree */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#16a34a] border-2 border-black shadow-[2px_2px_0px_#000]" />
                    <div className="w-2.5 h-4 bg-[#78350f] border-x-2 border-black" />
                  </div>
                  {/* Brick item box */}
                  <div className="w-7 h-7 bg-[#ea580c] border-2 border-black flex items-center justify-center font-pixel text-[10px] text-yellow-300 shadow-[2px_2px_0px_#000]">
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
                    <PixelKnight className="w-10 h-10 md:w-14 md:h-14 drop-shadow-[2px_2px_0px_#000]" />
                  </button>
                </div>

                {/* Right: Brick blocks & Castle Tower */}
                <div className="flex items-end gap-2">
                  {/* Brick platform with coin */}
                  <div className="hidden sm:flex flex-col items-center">
                    <button
                      onClick={() => {
                        soundManager.playCoin();
                        onCoinCollect();
                      }}
                      className="mb-1 hover:scale-125 transition-transform"
                    >
                      <PixelCoin className="w-5 h-5" />
                    </button>
                    <div className="w-7 h-7 bg-[#b45309] border-2 border-black flex items-center justify-center font-pixel text-[9px] text-yellow-200">
                      🧱
                    </div>
                  </div>

                  {/* 8-Bit Castle Tower */}
                  <div className="w-16 md:w-24 bg-[#64748b] border-4 border-black relative">
                    {/* Battlement tops */}
                    <div className="flex justify-between -mt-3 px-1">
                      <div className="w-3 h-3 bg-[#475569] border-2 border-black" />
                      <div className="w-3 h-3 bg-[#475569] border-2 border-black" />
                      <div className="w-3 h-3 bg-[#475569] border-2 border-black" />
                    </div>
                    {/* Tower Windows */}
                    <div className="p-2 flex flex-col items-center gap-1">
                      <div className="w-3 h-4 bg-black" />
                      {/* Castle Door */}
                      <div className="w-6 h-8 bg-[#451a03] border-2 border-black rounded-t-lg mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ground Grass & Dirt Blocks Layer */}
              <div className="w-full">
                {/* Grass top line */}
                <div className="h-3 bg-[#22c55e] border-y-2 border-black" />
                {/* Dirt layer */}
                <div className="h-6 md:h-8 bg-[#854d0e] border-b-4 border-black relative overflow-hidden flex items-center justify-around">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-[#713f12] border border-[#a16207] inline-block opacity-70"
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
