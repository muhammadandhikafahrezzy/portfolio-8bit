"use client";

import React from "react";
import Link from "next/link";
import { HeroBanner } from "@/components/HeroBanner";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PixelGamepad } from "@/components/PixelIcons";
import { soundManager } from "@/components/SoundManager";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ArrowRight, Sparkles, Database, Award, User, Briefcase, Mail } from "lucide-react";

export default function Home() {
  const worldPortals = [
    {
      href: "/about",
      stage: "STAGE 01",
      title: "PROFIL & STATS",
      desc: "Foto profil asli, biodata, status RPG LV. 23, dan matriks keahlian data.",
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />,
      color: "border-[#0284c7] hover:border-yellow-400 bg-[#0f172a]",
      btnBg: "bg-[#0284c7] hover:bg-[#0369a1]",
    },
    {
      href: "/projects",
      stage: "STAGE 02",
      title: "STUDI KASUS DATA",
      desc: "Studi kasus Data Warehouse AHM, Sales Intelligence Tableau, dan Teknopolis.",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />,
      color: "border-[#ea580c] hover:border-yellow-400 bg-[#0f172a]",
      btnBg: "bg-[#ea580c] hover:bg-[#c2410c]",
    },
    {
      href: "/experience",
      stage: "STAGE 03",
      title: "PETA KARIER",
      desc: "Riwayat pengalaman industri di Kopkar PT Astra Honda Motor & PT Kanaya.",
      icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />,
      color: "border-[#16a34a] hover:border-yellow-400 bg-[#0f172a]",
      btnBg: "bg-[#16a34a] hover:bg-[#15803d]",
    },
    {
      href: "/certificates",
      stage: "STAGE 04",
      title: "TROPHY ROOM",
      desc: "Sertifikat resmi Bitlabs Data Analytics for Business & Kampus Merdeka.",
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />,
      color: "border-[#d97706] hover:border-yellow-400 bg-[#0f172a]",
      btnBg: "bg-[#d97706] hover:bg-[#b45309]",
    },
    {
      href: "/minigame",
      stage: "BONUS STAGE",
      title: "DATA KNIGHT VS ULER 🗡️🐍",
      desc: "Bantu karakter Andhika mengumpulkan data bits di labirin dan taklukkan 4 Uler Bug!",
      icon: <PixelGamepad className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "border-[#15803d] hover:border-yellow-400 bg-[#0f172a]",
      btnBg: "bg-[#15803d] hover:bg-[#166534]",
    },
    {
      href: "/contact",
      stage: "STAGE 05",
      title: "KOTAK SURAT",
      desc: "Hubungi untuk kolaborasi, wawancara kerja, dan unduh CV resmi (.docx).",
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />,
      color: "border-[#0d9488] hover:border-yellow-400 bg-[#0f172a]",
      btnBg: "bg-[#0d9488] hover:bg-[#0f766e]",
    },
  ];

  return (
    <div className="flex flex-col space-y-6 sm:space-y-8 pb-8">
      {/* 1. Hero Platformer Stage Window */}
      <HeroBanner onCoinCollect={() => {}} />

      {/* 2. Executive Data Analyst Quick Highlight & Photo Teaser */}
      <section className="px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-[#0e2235] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] p-3 sm:p-5 md:p-6">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            {/* Authentic Photo */}
            <div className="flex-shrink-0">
              <PhotoFrame
                src="/Gemini_Generated_Image_3mneq83mneq83mne.jpg"
                caption="ANDHIKA_FAHREZZY.PNG"
                className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48"
              />
            </div>

            {/* Quick Pitch */}
            <div className="flex-1 text-center lg:text-left space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-[#1e3a5f] border border-black sm:border-2 px-2 py-0.5 sm:px-2.5 sm:py-1">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 flex-shrink-0" />
                <span className="font-pixel text-[7px] sm:text-[8px] md:text-[9px] text-yellow-300">
                  OPEN TO WORK: JUNIOR DATA ANALYST / BI SPECIALIST
                </span>
              </div>

              <h2 className="font-pixel text-sm sm:text-lg md:text-2xl text-white tracking-wide leading-tight">
                {PORTFOLIO_DATA.about.name}
              </h2>

              <p className="font-vt323 text-base sm:text-lg md:text-xl text-slate-300 text-justify sm:text-left leading-relaxed max-w-3xl">
                Lulusan S1 Sistem Informasi Universitas Negeri Surabaya (IPK 3.69, Selesai Juli 2026) dengan keahlian teknis kuat dalam pengolahan basis data SQL, scripting analitik Python, perancangan dashboard Tableau & Looker Studio, serta pemahaman bisnis operasional dari pengalaman kerja nyata di Koperasi Karyawan PT Astra Honda Motor.
              </p>

              {/* Data Metrics Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-1">
                <div className="bg-[#0a1622] p-1.5 sm:p-2 border border-black sm:border-2 text-center">
                  <span className="font-pixel text-[9px] sm:text-xs text-yellow-400 block truncate">3.69 / 4.0</span>
                  <span className="font-vt323 text-xs sm:text-sm text-slate-300 block truncate">IPK S1 SI UNESA</span>
                </div>
                <div className="bg-[#0a1622] p-1.5 sm:p-2 border border-black sm:border-2 text-center">
                  <span className="font-pixel text-[9px] sm:text-xs text-green-400 block truncate">SQL & PYTHON</span>
                  <span className="font-vt323 text-xs sm:text-sm text-slate-300 block truncate">Core Analytics</span>
                </div>
                <div className="bg-[#0a1622] p-1.5 sm:p-2 border border-black sm:border-2 text-center">
                  <span className="font-pixel text-[9px] sm:text-xs text-cyan-400 block truncate">TABLEAU</span>
                  <span className="font-vt323 text-xs sm:text-sm text-slate-300 block truncate">BI & Visualisasi</span>
                </div>
                <div className="bg-[#0a1622] p-1.5 sm:p-2 border border-black sm:border-2 text-center">
                  <span className="font-pixel text-[9px] sm:text-xs text-red-400 block truncate">AHM KOPKAR</span>
                  <span className="font-vt323 text-xs sm:text-sm text-slate-300 block truncate">Data Warehouse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. World Map / Stage Selection Portals */}
      <section id="world-map" className="px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="mb-3 sm:mb-4 flex items-center justify-between border-b-2 border-slate-700 pb-2">
          <div>
            <span className="font-pixel text-[8px] sm:text-[9px] text-yellow-400 block">PILIH STAGE PETUALANGAN</span>
            <h3 className="font-pixel text-xs sm:text-sm md:text-base text-white">WORLD MAP & MENU HALAMAN</h3>
          </div>
          <span className="font-vt323 text-sm sm:text-base text-cyan-300 hidden sm:inline">
            TOTAL 6 STAGES TERSEDIA ▶
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {worldPortals.map((portal) => (
            <Link
              key={portal.href}
              href={portal.href}
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className={`p-3 sm:p-4 border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all transform hover:-translate-y-1 hover:shadow-[5px_5px_0px_#000] ${portal.color} group`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <span className="font-pixel text-[7px] sm:text-[8px] bg-black text-yellow-300 px-1.5 sm:px-2 py-0.5 border border-slate-700 font-bold">
                    {portal.stage}
                  </span>
                  <div className="p-1 sm:p-1.5 bg-[#0a1622] border border-black group-hover:scale-110 transition-transform">
                    {portal.icon}
                  </div>
                </div>

                <h4 className="font-pixel text-[10px] sm:text-xs md:text-sm text-yellow-400 group-hover:text-yellow-300 mb-1 sm:mb-2 leading-tight">
                  {portal.title}
                </h4>

                <p className="font-vt323 text-sm sm:text-base text-slate-300 mb-3 sm:mb-4 leading-snug text-justify sm:text-left">
                  {portal.desc}
                </p>
              </div>

              <div
                className={`w-full py-1.5 sm:py-2 px-2 sm:px-3 text-center font-pixel text-[7px] sm:text-[8px] text-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1 font-bold ${portal.btnBg}`}
              >
                <span>MASUKI STAGE</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
