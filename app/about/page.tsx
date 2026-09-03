"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PhotoFrame } from "@/components/PhotoFrame";
import { soundManager } from "@/components/SoundManager";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";
import {
  Award,
  BookOpen,
  MapPin,
  Sparkles,
  FileText,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<"story" | "stats" | "skills">("story");
  const [currentPhoto, setCurrentPhoto] = useState<string>(
    "/Gemini_Generated_Image_3mneq83mneq83mne.jpg"
  );

  const photos = [
    { src: "/Gemini_Generated_Image_3mneq83mneq83mne.jpg", label: "FORMAL_PORTRAIT.PNG" },
    { src: "/Gemini_Generated_Image_6iw6e86iw6e86iw6.jpg", label: "DATA_WIZARD.PNG" },
    { src: "/Gemini_Generated_Image_oansi6oansi6oans.jpg", label: "ANALYTICS_MODE.PNG" },
    { src: "/Gemini_Generated_Image_ye9j05ye9j05ye9j.jpg", label: "EXECUTIVE_READY.PNG" },
  ];

  return (
    <div className="py-4 sm:py-6 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#0284c7] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 border border-black inline-block flex-shrink-0" />
            <h1 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              {t.about.windowTitle}
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#0369a1] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#0369a1] text-white flex items-center justify-center border border-black">
              □
            </span>
            <Link
              href="/"
              onClick={() => soundManager.playWindowClose()}
              className="w-4 h-4 sm:w-5 sm:h-5 bg-[#991b1b] hover:bg-[#ef4444] text-white flex items-center justify-center border border-black cursor-pointer"
            >
              ✕
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-6 md:p-8 bg-[#0a1622] space-y-4 sm:space-y-6 text-slate-100">
          {/* Top Hero Card: Authentic Photo & Dialogue Bubble */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 bg-[#0e2235] p-3 sm:p-5 md:p-6 border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]">
            {/* Real Photo in Retro Frame */}
            <div className="flex flex-col items-center flex-shrink-0">
              <PhotoFrame
                src={currentPhoto}
                caption="ANDHIKA_FAHREZZY.PNG"
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
              />

              {/* Photo Selector Switcher */}
              <div className="flex gap-1.5 mt-2.5 sm:mt-3">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentPhoto(p.src);
                    }}
                    title={`View ${p.label}`}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 border border-black transition-transform cursor-pointer ${
                      currentPhoto === p.src
                        ? "bg-yellow-400 scale-125 shadow-[1px_1px_0px_#000]"
                        : "bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
              <span className="font-pixel text-[6px] sm:text-[7px] text-slate-400 mt-1">
                {language === "id" ? "PILIH FOTO PROFIL" : "SWITCH AVATAR POSE"}
              </span>
            </div>

            {/* RPG Dialogue & Bio Details */}
            <div className="flex-1 space-y-3 sm:space-y-4 text-center lg:text-left min-w-0 w-full">
              {/* Retro Speech Bubble */}
              <div className="bg-[#f8fafc] text-black border-2 sm:border-4 border-black p-2.5 sm:p-3.5 shadow-[3px_3px_0px_#000000] relative">
                <p className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] leading-relaxed text-slate-900 uppercase text-justify sm:text-left">
                  {language === "en" ? PORTFOLIO_DATA.about.dialogue_en : PORTFOLIO_DATA.about.dialogue}
                </p>
              </div>

              {/* Identity Details */}
              <div className="space-y-0.5 sm:space-y-1">
                <h2 className="font-pixel text-base sm:text-xl md:text-2xl text-yellow-400 leading-tight">
                  {PORTFOLIO_DATA.about.name}
                </h2>
                <p className="font-pixel text-[9px] sm:text-xs text-cyan-300">
                  {language === "en" ? PORTFOLIO_DATA.about.title_en : PORTFOLIO_DATA.about.title}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 font-pixel text-[8px] sm:text-[9px] text-slate-200">
                <div className="flex items-center gap-2 bg-[#111f30] p-2 sm:p-2.5 border border-black sm:border-2">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                  <span className="truncate">
                    {language === "en" ? PORTFOLIO_DATA.about.degree_en : PORTFOLIO_DATA.about.degree}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#111f30] p-2 sm:p-2.5 border border-black sm:border-2">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                  <span className="truncate">
                    {language === "en" ? "3.69 / 4.00 GPA (Graduated Jul 2026)" : "IPK 3.69 / 4.00 (Lulus Jul 2026)"}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#111f30] p-2 sm:p-2.5 border border-black sm:border-2 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
                  <span className="truncate">
                    {language === "en" ? "Depok & Surabaya, Indonesia" : "Depok, Jawa Barat / Surabaya, Jawa Timur"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-pixel text-[8px] sm:text-[9px] border-b-2 border-slate-700 pb-2.5 sm:pb-3">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("story");
              }}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black transition-all cursor-pointer ${
                activeTab === "story"
                  ? "bg-yellow-400 text-black font-bold shadow-[2px_2px_0px_#000]"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              📖 {language === "id" ? "CERITA & FILOSOFI" : "STORY & VISION"}
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("stats");
              }}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black transition-all cursor-pointer ${
                activeTab === "stats"
                  ? "bg-yellow-400 text-black font-bold shadow-[2px_2px_0px_#000]"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              ⚔️ {language === "id" ? "RPG STATUS SHEET" : "RPG STATUS SHEET"}
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("skills");
              }}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black transition-all cursor-pointer ${
                activeTab === "skills"
                  ? "bg-yellow-400 text-black font-bold shadow-[2px_2px_0px_#000]"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              📊 {language === "id" ? "MATRIKS KEAHLIAN" : "SKILLS MATRIX"}
            </button>
          </div>

          {/* Tab 1: Cerita & Perjalanan Karier */}
          {activeTab === "story" && (
            <div className="space-y-4">
              <div className="bg-[#111f30] p-3 sm:p-5 md:p-6 border-2 sm:border-4 border-black space-y-3 font-vt323 text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed text-justify sm:text-left">
                <h3 className="font-pixel text-xs sm:text-sm text-yellow-400 mb-2">
                  🎯 {t.about.mainStoryTitle}
                </h3>
                <p>{t.about.story1}</p>
                <p>{t.about.story2}</p>
                <p>{t.about.story3}</p>
              </div>
            </div>
          )}

          {/* Tab 2: RPG Status Sheet */}
          {activeTab === "stats" && (
            <div className="bg-[#111f30] p-3 sm:p-5 md:p-6 border-2 sm:border-4 border-black space-y-3 sm:space-y-4 font-pixel text-[8px] sm:text-[9px] md:text-[10px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-yellow-300 border-b border-slate-700 pb-2 sm:pb-3 gap-1.5 sm:gap-2">
                <span className="truncate">CLASS: {PORTFOLIO_DATA.about.stats.classType}</span>
                <span className="bg-[#1e3a5f] px-2 py-0.5 sm:py-1 border border-black font-bold">
                  LEVEL {PORTFOLIO_DATA.about.stats.level}
                </span>
              </div>

              {/* HP Bar */}
              <div>
                <div className="flex justify-between text-[7px] sm:text-[8px] md:text-[9px] text-red-400 mb-1">
                  <span>{language === "id" ? "HP (DAYA TAHAN & ETOS KERJA)" : "HP (STAMINA & WORK ETHIC)"}</span>
                  <span>{PORTFOLIO_DATA.about.stats.hp}</span>
                </div>
                <div className="w-full h-3.5 sm:h-4 bg-black border-2 border-slate-700 p-0.5">
                  <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-full animate-pulse" />
                </div>
              </div>

              {/* MP Bar */}
              <div>
                <div className="flex justify-between text-[7px] sm:text-[8px] md:text-[9px] text-cyan-400 mb-1">
                  <span>{language === "id" ? "MP (LOGIKA QUERY & SQL PRECISION)" : "MP (LOGICAL REASONING & SQL PRECISION)"}</span>
                  <span>{PORTFOLIO_DATA.about.stats.mp}</span>
                </div>
                <div className="w-full h-3.5 sm:h-4 bg-black border-2 border-slate-700 p-0.5">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-full" />
                </div>
              </div>

              {/* EXP Bar */}
              <div>
                <div className="flex justify-between text-[7px] sm:text-[8px] md:text-[9px] text-green-400 mb-1">
                  <span>{language === "id" ? "EXP (AKADEMIK / IPK 3.69)" : "EXP (ACADEMIC / 3.69 GPA)"}</span>
                  <span>{language === "en" ? PORTFOLIO_DATA.about.stats.exp_en : PORTFOLIO_DATA.about.stats.exp}</span>
                </div>
                <div className="w-full h-3.5 sm:h-4 bg-black border-2 border-slate-700 p-0.5">
                  <div className="h-full bg-gradient-to-r from-green-600 to-emerald-400 w-[92%]" />
                </div>
              </div>

              {/* RPG Gear Inventory */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[7px] sm:text-[8px]">
                <div className="bg-[#162a42] p-2 sm:p-2.5 border border-black">
                  <span className="text-yellow-400 block mb-0.5 font-bold">🗡️ WEAPON:</span>
                  <span className="text-slate-200">SQL Querying & Python Pandas</span>
                </div>
                <div className="bg-[#162a42] p-2 sm:p-2.5 border border-black">
                  <span className="text-cyan-400 block mb-0.5 font-bold">🛡️ SHIELD:</span>
                  <span className="text-slate-200">Tableau & Looker Studio</span>
                </div>
                <div className="bg-[#162a42] p-2 sm:p-2.5 border border-black">
                  <span className="text-green-400 block mb-0.5 font-bold">⚡ SPECIAL:</span>
                  <span className="text-slate-200">Data Cleaning & Storytelling</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Matriks Keahlian Data */}
          {activeTab === "skills" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {PORTFOLIO_DATA.about.skillCategories.map((cat, idx) => (
                <div key={idx} className="bg-[#111f30] p-3 sm:p-4 border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]">
                  <div className="font-pixel text-[9px] sm:text-[10px] text-yellow-400 mb-2.5 sm:mb-3 flex items-center gap-1.5 border-b border-slate-700 pb-1.5 sm:pb-2">
                    <span>{cat.icon}</span>
                    <span className="truncate">
                      {language === "en" ? (cat.title_en || cat.title) : cat.title}
                    </span>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3 font-pixel text-[7px] sm:text-[8px]">
                    {cat.skills.map((s, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span className="truncate max-w-[75%]">{s.name}</span>
                          <span className="text-yellow-300 font-bold">{s.level}%</span>
                        </div>
                        <div className="w-full h-2 sm:h-2.5 bg-black border border-slate-700 p-0.5">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-yellow-400"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 border-t-2 border-slate-700">
            <Link
              href="/"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] text-center"
            >
              ◀ {language === "id" ? "KEMBALI KE HOME" : "BACK TO HOME"}
            </Link>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="/CV_Muhammad_Andhika_Fahrezzy_ID.docx"
                download
                onClick={() => soundManager.playLevelUp()}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#d97706] hover:bg-[#f59e0b] text-black font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center justify-center gap-1.5 text-center"
              >
                <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{language === "id" ? "UNDUH CV (.DOCX)" : "DOWNLOAD CV (.DOCX)"}</span>
              </a>
              <Link
                href="/projects"
                onClick={() => soundManager.playClick()}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center justify-center gap-1.5 text-center"
              >
                <span>{t.about.btnNext}</span>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
