"use client";

import React, { useState } from "react";
import { soundManager } from "./SoundManager";
import { PixelCoin, PixelSlime, PixelBat, PixelWarpPipe, PixelKnight } from "./PixelIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";
import { Heart } from "lucide-react";

interface PixelFooterProps {
  score: number;
  onCoinCollect: () => void;
}

export const PixelFooter: React.FC<PixelFooterProps> = ({ score, onCoinCollect }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [hpSegments, setHpSegments] = useState<number>(6);
  const [slimeColor, setSlimeColor] = useState<"green" | "blue">("green");

  const handleSlimeClick = () => {
    soundManager.playSlimeBounce();
    setSlimeColor((prev) => (prev === "green" ? "blue" : "green"));
  };

  const handleHpClick = () => {
    soundManager.playClick();
    setHpSegments((prev) => (prev > 1 ? prev - 1 : 6));
  };

  return (
    <footer className="relative mt-8 sm:mt-12 pt-6 sm:pt-8 pb-4 overflow-hidden select-none">
      {/* Background Stage Floor Props */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 sm:gap-2">
        {/* Left: Mario-style Warp Pipe, Bat & Slime */}
        <div className="flex items-end gap-2 sm:gap-3 mb-[-4px] sm:mb-[-6px]">
          {/* Warp Pipe */}
          <div className="relative">
            <PixelWarpPipe className="w-10 h-12 sm:w-16 sm:h-20 md:w-20 md:h-24 drop-shadow-[2px_2px_0px_#000]" />
            {/* Bat hovering above pipe */}
            <div className="absolute -top-4 sm:-top-6 left-2 sm:left-3 animate-floatSlow">
              <PixelBat className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </div>
          </div>

          {/* Interactive Slime */}
          <button
            onClick={handleSlimeClick}
            title={language === "id" ? "Klik slime untuk mengubah warna!" : "Click slime to morph color!"}
            className="animate-slimeWobble cursor-pointer mb-1 sm:mb-2 hover:scale-110 transition-transform"
          >
            <PixelSlime className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 drop-shadow-[2px_2px_0px_#000]" color={slimeColor} />
          </button>
        </div>

        {/* Center: Interactive Coin & Copyright */}
        <div className="text-center pb-2 sm:pb-3 flex flex-col items-center gap-1.5 sm:gap-2 px-2">
          <button
            onClick={() => {
              soundManager.playCoin();
              onCoinCollect();
            }}
            title={t.nav.coinTooltip}
            className="animate-bouncePixel cursor-pointer hover:scale-125 transition-transform"
          >
            <PixelCoin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          </button>

          <p className="font-pixel text-[7px] sm:text-[8px] md:text-[9px] text-slate-400">
            © {new Date().getFullYear()} {PORTFOLIO_DATA.about.name}. ALL RIGHTS RESERVED.
          </p>
          <p className="font-vt323 text-xs sm:text-sm text-cyan-400">
            {language === "id"
              ? "CRAFTED WITH NEXT.JS, TAILWIND CSS & RETRO 8-BIT PASSION 🕹️"
              : "CRAFTED WITH NEXT.JS, TAILWIND CSS & RETRO 8-BIT PASSION 🕹️"}
          </p>
        </div>

        {/* Right: Retro HP Bar & Guard Knight on Ledge */}
        <div className="flex flex-col items-center sm:items-end gap-1.5 sm:gap-2 mb-[-4px] sm:mb-[-6px]">
          {/* Health Bar (Segmented Red Boxes) */}
          <div
            onClick={handleHpClick}
            title={language === "id" ? "Klik HP Bar untuk regenerasi darah!" : "Click HP bar to restore health!"}
            className="bg-[#0f172a] border border-black sm:border-2 p-1 shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
          >
            <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 fill-red-500" />
            <div className="flex gap-0.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 border border-black transition-colors ${
                    i < hpSegments ? "bg-red-500" : "bg-slate-800"
                  }`}
                />
              ))}
            </div>
            <span className="font-pixel text-[6px] sm:text-[7px] text-yellow-300 ml-0.5">HP</span>
          </div>

          {/* Knight Guard on Platform */}
          <div className="hidden sm:flex flex-col items-end">
            <PixelKnight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 drop-shadow-[2px_2px_0px_#000]" />
            {/* Ledge block */}
            <div className="w-14 sm:w-16 h-3 sm:h-4 bg-[#854d0e] border-t-2 border-x-2 border-black flex items-center justify-around">
              <span className="w-1.5 h-1 bg-[#16a34a]" />
              <span className="w-1.5 h-1 bg-[#16a34a]" />
            </div>
          </div>
        </div>
      </div>

      {/* Ground Platform Dirt Layer */}
      <div className="w-full relative z-20">
        <div className="h-2 bg-[#22c55e] border-y-2 border-black" />
        <div className="h-6 sm:h-8 md:h-10 bg-[#78350f] border-b-2 sm:border-b-4 border-black flex items-center justify-around overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#5c280b] border border-[#a16207] inline-block opacity-60"
            />
          ))}
        </div>
      </div>
    </footer>
  );
};
