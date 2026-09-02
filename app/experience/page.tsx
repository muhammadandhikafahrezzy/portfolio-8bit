"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/components/SoundManager";
import { Calendar, MapPin, ArrowRight, Sparkles, Building2, Eye } from "lucide-react";

export default function ExperiencePage() {
  const [activeDoc, setActiveDoc] = useState<{ url: string; type: "image" | "pdf"; title: string } | null>(null);

  const handleOpenDoc = (url: string, type: "image" | "pdf", title: string) => {
    soundManager.playWindowOpen();
    setActiveDoc({ url, type, title });
  };

  return (
    <div className="py-4 sm:py-6 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#16a34a] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 border border-black inline-block flex-shrink-0" />
            <h1 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              STAGE 03: CAREER_ADVENTURE_CHRONOLOGY.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#15803d] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#15803d] text-white flex items-center justify-center border border-black">
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
          {/* Intro Box */}
          <div className="bg-[#0e2235] p-3 sm:p-4 border-2 border-black space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
              <h2 className="font-pixel text-[9px] sm:text-xs md:text-sm text-yellow-400">
                PETA PETUALANGAN KARIER KRONOLOGIS (2020 ➔ 2026)
              </h2>
            </div>
            <p className="font-vt323 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed">
              Perjalanan profesional dari magang awal 2020 hingga kelulusan studi S1 Sistem Informasi UNESA pada Juli 2026 lengkap dengan bukti sertifikat pengalaman.
            </p>
          </div>

          {/* Timeline Stages */}
          <div className="space-y-4 sm:space-y-6">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <div
                key={exp.id}
                onMouseEnter={() => soundManager.playHover()}
                className="bg-[#111f30] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] p-3 sm:p-5 md:p-6 space-y-3 sm:space-y-4 hover:border-yellow-400 transition-colors"
              >
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-700 pb-2.5 sm:pb-3">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <span className="font-pixel text-[8px] sm:text-[9px] bg-[#1e3a5f] text-yellow-300 px-2 py-0.5 sm:py-1 border border-black font-bold flex-shrink-0">
                      STAGE 0{idx + 1} ({exp.yearRange})
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-pixel text-xs sm:text-sm md:text-base text-yellow-400 leading-snug">
                        {exp.role}
                      </h3>
                      <p className="font-pixel text-[8px] sm:text-[9px] text-cyan-300 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{exp.company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 font-pixel text-[7px] sm:text-[8px] text-slate-300">
                    <span className="flex items-center gap-1 bg-[#162a42] px-1.5 sm:px-2 py-0.5 sm:py-1 border border-black">
                      <Calendar className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-[#162a42] px-1.5 sm:px-2 py-0.5 sm:py-1 border border-black">
                      <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                      <span className="truncate max-w-[140px] sm:max-w-none">{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h4 className="font-pixel text-[8px] sm:text-[9px] text-green-400 mb-1.5 sm:mb-2">
                    TANGGUNG JAWAB & PENCAPAIAN (QUEST OBJECTIVES):
                  </h4>
                  <ul className="space-y-1.5 font-vt323 text-base sm:text-lg text-slate-200">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5 bg-[#0a1622] p-2 border border-slate-800 leading-snug">
                        <span className="text-yellow-400 font-pixel text-[7px] sm:text-[8px] mt-1 flex-shrink-0">▶</span>
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Attached Certificate Button */}
                {exp.certificateFile && (
                  <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                    <span className="font-pixel text-[7px] sm:text-[8px] text-slate-400">
                      BUKTI DOKUMEN RESMI TERSEDIA
                    </span>
                    <button
                      onClick={() =>
                        handleOpenDoc(
                          exp.certificateFile!,
                          exp.certificateType || "pdf",
                          `Dokumen ${exp.company}`
                        )
                      }
                      className="px-2.5 sm:px-3 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-pixel text-[7px] sm:text-[8px] border border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5 font-bold cursor-pointer transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>LIHAT BUKTI SERTIFIKAT / DOKUMEN</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 border-t-2 border-slate-700">
            <Link
              href="/projects"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] text-center"
            >
              ◀ KEMBALI KE PROYEK
            </Link>

            <Link
              href="/certificates"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#d97706] hover:bg-[#b45309] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center justify-center gap-1.5 text-center"
            >
              <span>LIHAT TROPHY ROOM SERTIFIKAT</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* Document / Certificate Modal Viewer */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] max-w-4xl w-full h-[85vh] flex flex-col">
            <div className="bg-[#0284c7] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black gap-2">
              <span className="font-pixel text-[8px] sm:text-xs text-white truncate max-w-[80%]">{activeDoc.title}</span>
              <button
                onClick={() => {
                  soundManager.playWindowClose();
                  setActiveDoc(null);
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 bg-[#991b1b] hover:bg-[#ef4444] text-white flex items-center justify-center border border-black font-pixel text-[10px] sm:text-xs cursor-pointer flex-shrink-0"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 bg-slate-900 p-1 sm:p-2 flex items-center justify-center overflow-auto">
              {activeDoc.type === "image" ? (
                <div className="relative w-full h-full max-h-[75vh]">
                  <Image
                    src={activeDoc.url}
                    alt={activeDoc.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <iframe
                  src={activeDoc.url}
                  className="w-full h-full border border-black"
                  title={activeDoc.title}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
