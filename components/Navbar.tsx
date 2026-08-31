"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "./SoundManager";
import { PixelCoin, PixelKnight } from "./PixelIcons";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface NavbarProps {
  score: number;
  onCoinCollect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ score, onCoinCollect }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "TENTANG SAYA" },
    { id: "projects", label: "PROYEK" },
    { id: "experience", label: "PENGALAMAN" },
    { id: "certificates", label: "SERTIFIKAT" },
    { id: "contact", label: "KONTAK" },
  ];

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSoundToggle = () => {
    const newState = soundManager.toggleMute();
    setSoundEnabled(newState);
  };

  return (
    <header className="sticky top-2 z-50 px-3 md:px-6 max-w-7xl mx-auto w-full">
      <div className="bg-[#0e2235]/95 backdrop-blur border-4 border-black shadow-[4px_4px_0px_#000000] p-2 md:p-3 flex items-center justify-between gap-2">
        {/* Left: Navigation Buttons (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 font-pixel text-[11px]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-3 py-2 border-2 border-black transition-all transform active:translate-y-1 ${
                  isActive
                    ? "bg-[#eab308] text-black font-bold shadow-[2px_2px_0px_#000000]"
                    : "bg-[#1e3a5f] text-slate-200 hover:bg-[#2563eb] hover:text-white shadow-[2px_2px_0px_#000000]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 bg-[#1e3a5f] text-white border-2 border-black shadow-[2px_2px_0px_#000]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-pixel text-[10px] text-yellow-400">ANDHIKA.DEV</span>
        </div>

        {/* Right: Score Counter, SFX Toggle & Character Badge */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Interactive Coin Collector button */}
          <button
            onClick={() => {
              soundManager.playCoin();
              onCoinCollect();
            }}
            title="Klik koin untuk menambah skor!"
            className="flex items-center gap-1.5 bg-[#164e63] hover:bg-[#0e7490] text-yellow-300 px-2.5 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] active:scale-95 transition-transform cursor-pointer group"
          >
            <PixelCoin className="w-4 h-4 group-hover:animate-bounce" />
            <span className="font-pixel text-[10px] md:text-xs tracking-wider">
              {score.toString().padStart(4, "0")}
            </span>
          </button>

          {/* Sound Effect Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? "Matikan Suara SFX" : "Nyalakan Suara SFX"}
            className={`px-2.5 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 font-pixel text-[9px] md:text-[10px] transition-colors ${
              soundEnabled
                ? "bg-[#15803d] text-white hover:bg-[#16a34a]"
                : "bg-[#991b1b] text-white hover:bg-[#b91c1c]"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? "SFX: ON" : "SFX: OFF"}</span>
          </button>

          {/* Character Profile Badge */}
          <div className="flex items-center gap-2 bg-[#1e293b] border-2 border-black shadow-[2px_2px_0px_#000] px-2.5 py-1">
            <PixelKnight className="w-6 h-6 md:w-7 md:h-7" />
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-pixel text-[9px] md:text-[10px] text-yellow-400 font-bold leading-tight truncate max-w-[130px] md:max-w-[180px]">
                {PORTFOLIO_DATA.hero.characterName}
              </span>
              <span className="font-vt323 text-xs md:text-sm text-cyan-300 leading-none">
                LV. 23 {PORTFOLIO_DATA.hero.role.split("&")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#0e2235] border-4 border-black shadow-[4px_4px_0px_#000] p-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 font-pixel text-[10px]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="p-2 bg-[#1e3a5f] hover:bg-[#2563eb] text-slate-100 text-left border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5"
              >
                ▶ {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
