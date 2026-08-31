"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { PixelFooter } from "./PixelFooter";
import { PixelCoin, PixelSlime, PixelBat } from "./PixelIcons";

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState<number>(100);

  const handleCoinCollect = () => {
    setScore((prev) => prev + 100);
  };

  return (
    <div className="retro-grid-bg min-h-screen relative overflow-hidden flex flex-col justify-between">
      {/* Background Ambience Floating Sprites */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-28 left-6 md:left-14 animate-float opacity-75">
          <PixelCoin className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="absolute top-36 right-6 md:right-16 animate-floatSlow opacity-75">
          <PixelCoin className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="absolute top-1/2 left-4 md:left-10 animate-slimeWobble opacity-60">
          <PixelSlime className="w-7 h-7" color="blue" />
        </div>
        <div className="absolute top-1/2 right-4 md:right-10 animate-floatSlow opacity-60">
          <PixelBat className="w-7 h-7" />
        </div>
        <div className="absolute bottom-40 left-12 animate-float opacity-70">
          <PixelCoin className="w-5 h-5" />
        </div>
        <div className="absolute bottom-48 right-14 animate-floatSlow opacity-70">
          <PixelCoin className="w-5 h-5" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="pt-3">
          <Navbar score={score} onCoinCollect={handleCoinCollect} />
        </div>
        <main className="flex-1 w-full">{children}</main>
      </div>

      {/* Persistent 8-Bit Ground Footer with Interactive Props & HP Bar */}
      <PixelFooter score={score} onCoinCollect={handleCoinCollect} />
    </div>
  );
};
