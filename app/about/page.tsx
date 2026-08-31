"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PixelKnight, PixelCoin } from "@/components/PixelIcons";
import { soundManager } from "@/components/SoundManager";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import {
  User,
  Award,
  BookOpen,
  MapPin,
  Sparkles,
  Database,
  BarChart3,
  Code2,
  FileText,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"story" | "stats" | "skills" | "gallery">("story");
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
    <div className="py-6 px-3 md:px-6 max-w-7xl mx-auto w-full space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#0284c7] px-3 py-2 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 border border-black inline-block" />
            <h1 className="font-pixel text-[11px] md:text-sm text-white tracking-wider font-bold">
              STAGE 01: CHARACTER_PROFILE_AND_STATS.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[10px]">
            <span className="w-5 h-5 bg-[#0369a1] text-white flex items-center justify-center border-2 border-black">
              _
            </span>
            <span className="w-5 h-5 bg-[#0369a1] text-white flex items-center justify-center border-2 border-black">
              □
            </span>
            <Link
              href="/"
              onClick={() => soundManager.playWindowClose()}
              className="w-5 h-5 bg-[#991b1b] hover:bg-[#ef4444] text-white flex items-center justify-center border-2 border-black"
            >
              ✕
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-8 bg-[#0a1622] space-y-6 text-slate-100">
          {/* Top Hero Card: Authentic Photo & Dialogue Bubble */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 bg-[#0e2235] p-4 md:p-6 border-4 border-black shadow-[4px_4px_0px_#000]">
            {/* Real Photo in Retro Frame */}
            <div className="flex flex-col items-center">
              <PhotoFrame
                src={currentPhoto}
                caption="ANDHIKA_FAHREZZY.PNG"
                className="w-48 h-48 md:w-56 md:h-56"
              />

              {/* Photo Selector Switcher */}
              <div className="flex gap-1.5 mt-3">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentPhoto(p.src);
                    }}
                    title={`Lihat ${p.label}`}
                    className={`w-4 h-4 border border-black transition-transform ${
                      currentPhoto === p.src
                        ? "bg-yellow-400 scale-125 shadow-[1px_1px_0px_#000]"
                        : "bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
              <span className="font-pixel text-[7px] text-slate-400 mt-1">GANTI FOTO PROFIL</span>
            </div>

            {/* RPG Dialogue & Bio Details */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              {/* Retro Speech Bubble */}
              <div className="bg-[#f8fafc] text-black border-4 border-black p-3.5 shadow-[3px_3px_0px_#000000] relative">
                <p className="font-pixel text-[10px] md:text-xs leading-relaxed text-slate-900 uppercase">
                  {PORTFOLIO_DATA.about.dialogue}
                </p>
              </div>

              {/* Identity Details */}
              <div className="space-y-1">
                <h2 className="font-pixel text-lg md:text-2xl text-yellow-400">
                  {PORTFOLIO_DATA.about.name}
                </h2>
                <p className="font-pixel text-xs text-cyan-300">
                  {PORTFOLIO_DATA.about.title}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-pixel text-[9px] text-slate-200">
                <div className="flex items-center gap-2 bg-[#111f30] p-2.5 border-2 border-black">
                  <BookOpen className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="truncate">{PORTFOLIO_DATA.about.degree}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#111f30] p-2.5 border-2 border-black">
                  <Award className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>IPK: 3.69 / 4.00 (Cum Laude Range)</span>
                </div>
                <div className="flex items-center gap-2 bg-[#111f30] p-2.5 border-2 border-black sm:col-span-2">
                  <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Lokasi: Depok, Jawa Barat / Surabaya, Jawa Timur</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-pixel text-[9px] border-b-2 border-slate-700 pb-3">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("story");
              }}
              className={`px-3 py-2 border-2 border-black transition-all ${
                activeTab === "story"
                  ? "bg-yellow-400 text-black font-bold shadow-[2px_2px_0px_#000]"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              📖 CERITA & FILOSOFI
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("stats");
              }}
              className={`px-3 py-2 border-2 border-black transition-all ${
                activeTab === "stats"
                  ? "bg-yellow-400 text-black font-bold shadow-[2px_2px_0px_#000]"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              ⚔️ RPG STATUS SHEET
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("skills");
              }}
              className={`px-3 py-2 border-2 border-black transition-all ${
                activeTab === "skills"
                  ? "bg-yellow-400 text-black font-bold shadow-[2px_2px_0px_#000]"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              📊 MATRIKS KEAHLIAN DATA
            </button>
          </div>

          {/* Tab 1: Cerita & Perjalanan Karier */}
          {activeTab === "story" && (
            <div className="space-y-4">
              <div className="bg-[#111f30] p-4 md:p-6 border-4 border-black space-y-4 font-vt323 text-lg md:text-xl text-slate-200 leading-relaxed">
                <h3 className="font-pixel text-sm text-yellow-400">
                  🎯 Mengapa Data Analytics?
                </h3>
                <p>
                  Sebagai mahasiswa Sistem Informasi di Universitas Negeri Surabaya, saya menyadari bahwa data adalah aset paling berharga dalam era digital modern. Namun, data mentah tidak memiliki arti tanpa analisis mendalam, pembersihan yang presisi, dan visualisasi yang dapat dicerna oleh para pengambil keputusan.
                </p>
                <p>
                  Pengalaman magang saya di <strong className="text-yellow-300">Kopkar PT Astra Honda Motor</strong> memberikan pemahaman langsung mengenai pentingnya keakuratan stok persediaan, pencatatan transaksi anggota, dan bagaimana pelaporan berkala mampu mengoptimalkan efisiensi operasional organisasi.
                </p>
                <p>
                  Keunggulan unik saya terletak pada <strong className="text-cyan-300">perpaduan logika data analitik (SQL, Python, Excel) dengan kepekaan desain antarmuka (UI/UX)</strong>. Hal ini memungkinkan saya merancang dashboard yang tidak hanya akurat secara matematis, tetapi juga sangat intuitif, rapi, dan mudah digunakan oleh jajaran eksekutif maupun tim operasional.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: RPG Status Sheet */}
          {activeTab === "stats" && (
            <div className="bg-[#111f30] p-4 md:p-6 border-4 border-black space-y-4 font-pixel text-[10px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-yellow-300 border-b border-slate-700 pb-3 gap-2">
                <span>CLASS: {PORTFOLIO_DATA.about.stats.classType}</span>
                <span className="bg-[#1e3a5f] px-2 py-1 border border-black">
                  LEVEL {PORTFOLIO_DATA.about.stats.level}
                </span>
              </div>

              {/* HP Bar */}
              <div>
                <div className="flex justify-between text-[9px] text-red-400 mb-1">
                  <span>HP (HEALTH & WORK ETHIC)</span>
                  <span>{PORTFOLIO_DATA.about.stats.hp}</span>
                </div>
                <div className="w-full h-4 bg-black border-2 border-slate-700 p-0.5">
                  <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-full animate-pulse" />
                </div>
              </div>

              {/* MP Bar */}
              <div>
                <div className="flex justify-between text-[9px] text-cyan-400 mb-1">
                  <span>MP (LOGICAL REASONING & SQL MASTERY)</span>
                  <span>{PORTFOLIO_DATA.about.stats.mp}</span>
                </div>
                <div className="w-full h-4 bg-black border-2 border-slate-700 p-0.5">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-full" />
                </div>
              </div>

              {/* EXP Bar */}
              <div>
                <div className="flex justify-between text-[9px] text-green-400 mb-1">
                  <span>EXP (ACADEMIC PERFORMANCE / GPA)</span>
                  <span>{PORTFOLIO_DATA.about.stats.exp}</span>
                </div>
                <div className="w-full h-4 bg-black border-2 border-slate-700 p-0.5">
                  <div className="h-full bg-gradient-to-r from-green-600 to-emerald-400 w-[92%]" />
                </div>
              </div>

              {/* RPG Gear Inventory */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[8px]">
                <div className="bg-[#162a42] p-2.5 border border-black">
                  <span className="text-yellow-400 block mb-1">🗡️ WEAPON:</span>
                  <span>SQL Query & Python Pandas</span>
                </div>
                <div className="bg-[#162a42] p-2.5 border border-black">
                  <span className="text-cyan-400 block mb-1">🛡️ SHIELD:</span>
                  <span>Tableau & Looker Studio</span>
                </div>
                <div className="bg-[#162a42] p-2.5 border border-black">
                  <span className="text-green-400 block mb-1">⚡ SPECIAL MOVE:</span>
                  <span>Data Cleaning & Insight Story</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Matriks Keahlian Data */}
          {activeTab === "skills" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PORTFOLIO_DATA.about.skillCategories.map((cat, idx) => (
                <div key={idx} className="bg-[#111f30] p-4 border-4 border-black shadow-[4px_4px_0px_#000]">
                  <div className="font-pixel text-[10px] text-yellow-400 mb-3 flex items-center gap-2 border-b border-slate-700 pb-2">
                    <span>{cat.icon}</span>
                    <span>{cat.title}</span>
                  </div>

                  <div className="space-y-3 font-pixel text-[8px]">
                    {cat.skills.map((s, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>{s.name}</span>
                          <span className="text-yellow-300">{s.level}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-black border border-slate-700 p-0.5">
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
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-slate-700">
            <Link
              href="/"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              ◀ KEMBALI KE HOME
            </Link>

            <div className="flex gap-2">
              <a
                href="/CV_Muhammad_Andhika_Fahrezzy_ID.docx"
                download
                onClick={() => soundManager.playLevelUp()}
                className="px-4 py-2.5 bg-[#d97706] hover:bg-[#f59e0b] text-black font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>UNDUH CV (.DOCX)</span>
              </a>
              <Link
                href="/projects"
                onClick={() => soundManager.playClick()}
                className="px-4 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center gap-1.5"
              >
                <span>LIHAT PROYEK DATA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
