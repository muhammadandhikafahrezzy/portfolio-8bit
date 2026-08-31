"use client";

import React, { useState } from "react";
import { soundManager } from "./SoundManager";
import { PixelKnight, PixelSlime } from "./PixelIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { User, Award, Shield, Sparkles, BookOpen, MapPin } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dialogue" | "stats" | "skills">("dialogue");
  const [avatarJumping, setAvatarJumping] = useState(false);

  const handleAvatarClick = () => {
    soundManager.playJump();
    setAvatarJumping(true);
    setTimeout(() => setAvatarJumping(false), 400);
  };

  return (
    <div id="about" className="h-full flex flex-col">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[4px_4px_0px_#000000] h-full flex flex-col">
        {/* Title Bar */}
        <div className="bg-[#1e3a8a] px-3 py-1.5 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-cyan-400 border border-black inline-block" />
            <h2 className="font-pixel text-[11px] md:text-xs text-white tracking-wider font-bold">
              TENTANG SAYA
            </h2>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[9px]">
            <span className="w-4 h-4 bg-[#1e40af] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 bg-[#1e40af] text-white flex items-center justify-center border border-black">
              □
            </span>
            <span className="w-4 h-4 bg-[#991b1b] text-white flex items-center justify-center border border-black">
              ✕
            </span>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-3 md:p-4 bg-[#0a1622] flex-1 flex flex-col justify-between space-y-4">
          {/* Top: Character & Dialogue Speech Bubble */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            {/* Character Sprite Frame */}
            <div className="flex flex-col items-center">
              <button
                onClick={handleAvatarClick}
                title="Klik untuk berinteraksi!"
                className={`p-2 bg-[#1e293b] border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer transition-transform ${
                  avatarJumping ? "-translate-y-4 scale-105" : "hover:-translate-y-1"
                }`}
              >
                <PixelKnight className="w-12 h-12 md:w-14 md:h-14" />
              </button>
              <span className="font-pixel text-[8px] text-yellow-400 mt-1">ANDHIKA</span>
            </div>

            {/* Retro Dialogue Bubble */}
            <div className="relative flex-1 bg-[#f8fafc] text-black border-4 border-black p-3 shadow-[3px_3px_0px_#000000]">
              {/* Speech bubble pointer */}
              <div className="hidden sm:block absolute -left-3 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-black" />
              <div className="hidden sm:block absolute -left-2 top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-[#f8fafc]" />

              <p className="font-pixel text-[9px] md:text-[10px] leading-relaxed text-slate-900 uppercase">
                {PORTFOLIO_DATA.about.dialogue}
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 font-pixel text-[9px] border-b-2 border-slate-700 pb-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("dialogue");
              }}
              className={`px-2 py-1 border-2 border-black ${
                activeTab === "dialogue"
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              PROFIL
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("stats");
              }}
              className={`px-2 py-1 border-2 border-black ${
                activeTab === "stats"
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              STATUS RPG
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("skills");
              }}
              className={`px-2 py-1 border-2 border-black ${
                activeTab === "skills"
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              INVENTORI SKILL
            </button>
          </div>

          {/* Tab 1: Bio Profile */}
          {activeTab === "dialogue" && (
            <div className="space-y-2 text-slate-200">
              <div className="bg-[#111f30] p-2.5 border-2 border-black font-vt323 text-base md:text-lg leading-snug">
                <p className="text-slate-300">{PORTFOLIO_DATA.about.bio}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-pixel text-[9px]">
                <div className="flex items-center gap-1.5 bg-[#162a42] p-2 border border-black">
                  <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="truncate">{PORTFOLIO_DATA.about.degree}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#162a42] p-2 border border-black">
                  <Award className="w-3.5 h-3.5 text-green-400" />
                  <span>{PORTFOLIO_DATA.about.gpa}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#162a42] p-2 border border-black sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{PORTFOLIO_DATA.about.location}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: RPG Stats Sheet */}
          {activeTab === "stats" && (
            <div className="bg-[#111f30] p-3 border-2 border-black space-y-2 font-pixel text-[9px]">
              <div className="flex justify-between items-center text-yellow-300 border-b border-slate-700 pb-1">
                <span>CLASS: {PORTFOLIO_DATA.about.stats.classType}</span>
                <span>LV. {PORTFOLIO_DATA.about.stats.level}</span>
              </div>

              {/* HP Bar */}
              <div>
                <div className="flex justify-between text-[8px] text-red-400 mb-0.5">
                  <span>HP (HEALTH & FOCUS)</span>
                  <span>{PORTFOLIO_DATA.about.stats.hp}</span>
                </div>
                <div className="w-full h-3 bg-black border border-slate-600 p-0.5">
                  <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-full" />
                </div>
              </div>

              {/* MP Bar */}
              <div>
                <div className="flex justify-between text-[8px] text-cyan-400 mb-0.5">
                  <span>MP (CREATIVITY & LOGIC)</span>
                  <span>{PORTFOLIO_DATA.about.stats.mp}</span>
                </div>
                <div className="w-full h-3 bg-black border border-slate-600 p-0.5">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-full" />
                </div>
              </div>

              {/* EXP Bar */}
              <div>
                <div className="flex justify-between text-[8px] text-green-400 mb-0.5">
                  <span>EXP (ACADEMIC PROGRESS / GPA)</span>
                  <span>{PORTFOLIO_DATA.about.stats.exp}</span>
                </div>
                <div className="w-full h-3 bg-black border border-slate-600 p-0.5">
                  <div className="h-full bg-gradient-to-r from-green-600 to-emerald-400 w-[92%]" />
                </div>
              </div>

              <div className="pt-1 text-[8px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <span>Special: {PORTFOLIO_DATA.about.stats.specialMove}</span>
              </div>
            </div>
          )}

          {/* Tab 3: Skills Inventory */}
          {activeTab === "skills" && (
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {PORTFOLIO_DATA.about.skillCategories.map((cat, idx) => (
                <div key={idx} className="bg-[#111f30] p-2 border border-black">
                  <div className="font-pixel text-[8px] text-yellow-400 mb-1 flex items-center gap-1">
                    <span>{cat.icon}</span>
                    <span>{cat.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-[#1e3a5f] text-slate-100 font-pixel text-[7px] px-1.5 py-0.5 border border-black"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
