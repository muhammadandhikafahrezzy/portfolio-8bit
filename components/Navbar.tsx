"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { soundManager } from "./SoundManager";
import { PixelCoin, PixelKnight } from "./PixelIcons";
import { Volume2, VolumeX, Menu, X, Gamepad2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface NavbarProps {
  score?: number;
  onCoinCollect?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ score = 100, onCoinCollect }) => {
  const pathname = usePathname();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "TENTANG" },
    { href: "/projects", label: "PROYEK" },
    { href: "/experience", label: "PENGALAMAN" },
    { href: "/certificates", label: "SERTIFIKAT" },
    { href: "/minigame", label: "MINIGAME 🕹️" },
    { href: "/contact", label: "KONTAK" },
  ];

  const handleNavClick = () => {
    soundManager.playClick();
    setMobileMenuOpen(false);
  };

  const handleSoundToggle = () => {
    const newState = soundManager.toggleMute();
    setSoundEnabled(newState);
  };

  return (
    <header className="sticky top-2 z-50 px-3 md:px-6 max-w-7xl mx-auto w-full">
      <div className="bg-[#0e2235]/95 backdrop-blur border-4 border-black shadow-[4px_4px_0px_#000000] p-2 md:p-2.5 flex items-center justify-between gap-2">
        {/* Left: Navigation Buttons (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 font-pixel text-[10px]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-2.5 py-2 border-2 border-black transition-all transform active:translate-y-1 ${
                  isActive
                    ? "bg-[#eab308] text-black font-bold shadow-[2px_2px_0px_#000000]"
                    : "bg-[#1e3a5f] text-slate-200 hover:bg-[#2563eb] hover:text-white shadow-[2px_2px_0px_#000000]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile / Tablet Menu Toggle */}
        <div className="flex xl:hidden items-center gap-2">
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
          <Link
            href="/"
            onClick={handleNavClick}
            className="font-pixel text-[9px] sm:text-[10px] text-yellow-400 truncate max-w-[120px] sm:max-w-none"
          >
            ANDHIKA.DATA
          </Link>
        </div>

        {/* Right: Score Counter, SFX Toggle & User Avatar Badge */}
        <div className="flex items-center gap-1.5 md:gap-2.5">
          {/* Interactive Coin Collector button */}
          <button
            onClick={() => {
              soundManager.playCoin();
              if (onCoinCollect) onCoinCollect();
            }}
            title="Klik koin untuk menambah skor!"
            className="flex items-center gap-1 bg-[#164e63] hover:bg-[#0e7490] text-yellow-300 px-2 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] active:scale-95 transition-transform cursor-pointer group"
          >
            <PixelCoin className="w-4 h-4 group-hover:animate-bounce" />
            <span className="font-pixel text-[9px] md:text-[11px] tracking-wider">
              {score.toString().padStart(4, "0")}
            </span>
          </button>

          {/* Sound Effect Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? "Matikan Suara SFX" : "Nyalakan Suara SFX"}
            className={`px-2 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 font-pixel text-[8px] md:text-[9px] transition-colors ${
              soundEnabled
                ? "bg-[#15803d] text-white hover:bg-[#16a34a]"
                : "bg-[#991b1b] text-white hover:bg-[#b91c1c]"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? "SFX: ON" : "SFX: OFF"}</span>
          </button>

          {/* User Photo & Character Profile Badge */}
          <Link
            href="/about"
            onClick={handleNavClick}
            className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] border-2 border-black shadow-[2px_2px_0px_#000] px-2 py-1 transition-colors cursor-pointer"
          >
            {/* Authentic User Photo Thumbnail */}
            <div className="relative w-6 h-6 border border-black overflow-hidden bg-slate-800 flex-shrink-0">
              <Image
                src="/Gemini_Generated_Image_3mneq83mneq83mne.jpg"
                alt="Muhammad Andhika Fahrezzy"
                fill
                className="object-cover object-top"
                sizes="24px"
              />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-pixel text-[8px] md:text-[9px] text-yellow-400 font-bold leading-tight truncate max-w-[110px] md:max-w-[150px]">
                {PORTFOLIO_DATA.hero.characterName.split(" ")[0]} {PORTFOLIO_DATA.hero.characterName.split(" ")[1]}
              </span>
              <span className="font-vt323 text-xs md:text-sm text-cyan-300 leading-none">
                DATA ANALYST
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile / Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 bg-[#0e2235] border-4 border-black shadow-[4px_4px_0px_#000] p-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-pixel text-[9px]">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`p-2 text-left border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 ${
                    isActive
                      ? "bg-yellow-400 text-black font-bold"
                      : "bg-[#1e3a5f] hover:bg-[#2563eb] text-slate-100"
                  }`}
                >
                  ▶ {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
