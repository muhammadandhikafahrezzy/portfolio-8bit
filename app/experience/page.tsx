"use client";

import React from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/components/SoundManager";
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowRight, Sparkles, Building2 } from "lucide-react";

export default function ExperiencePage() {
  return (
    <div className="py-6 px-3 md:px-6 max-w-7xl mx-auto w-full space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#16a34a] px-3 py-2 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 border border-black inline-block" />
            <h1 className="font-pixel text-[11px] md:text-sm text-white tracking-wider font-bold">
              STAGE 03: CAREER_ADVENTURE_MILESTONES.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[10px]">
            <span className="w-5 h-5 bg-[#15803d] text-white flex items-center justify-center border-2 border-black">
              _
            </span>
            <span className="w-5 h-5 bg-[#15803d] text-white flex items-center justify-center border-2 border-black">
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
          {/* Intro Box */}
          <div className="bg-[#0e2235] p-4 border-2 border-black space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <h2 className="font-pixel text-xs md:text-sm text-yellow-400">
                PETA PETUALANGAN KARIER & PENGALAMAN INDUSTRI
              </h2>
            </div>
            <p className="font-vt323 text-base md:text-lg text-slate-300">
              Riwayat pengalaman praktis dalam mengelola data operasional bisnis, pengujian sistem perangkat lunak, dan pengembangan solusi data-driven.
            </p>
          </div>

          {/* Timeline Stages */}
          <div className="space-y-6">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <div
                key={exp.id}
                onMouseEnter={() => soundManager.playHover()}
                className="bg-[#111f30] border-4 border-black shadow-[6px_6px_0px_#000] p-4 md:p-6 space-y-4 hover:border-yellow-400 transition-colors"
              >
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-700 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-pixel text-[10px] bg-[#1e3a5f] text-yellow-300 px-2.5 py-1 border-2 border-black font-bold">
                      STAGE 0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-pixel text-sm md:text-base text-yellow-400">
                        {exp.role}
                      </h3>
                      <p className="font-pixel text-[9px] text-cyan-300 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 font-pixel text-[8px] text-slate-300">
                    <span className="flex items-center gap-1 bg-[#162a42] px-2 py-1 border border-black">
                      <Calendar className="w-3 h-3 text-green-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-[#162a42] px-2 py-1 border border-black">
                      <MapPin className="w-3 h-3 text-red-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Key Responsibilities & Data Impact */}
                <div>
                  <h4 className="font-pixel text-[9px] text-green-400 mb-2">
                    TANGGUNG JAWAB & DAMPAK BISNIS (QUEST OBJECTIVES):
                  </h4>
                  <ul className="space-y-2 font-vt323 text-base md:text-lg text-slate-200">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 bg-[#0a1622] p-2 border border-slate-800">
                        <span className="text-yellow-400 font-pixel text-[9px] mt-1">▶</span>
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-slate-700">
            <Link
              href="/projects"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              ◀ KEMBALI KE PROYEK
            </Link>

            <Link
              href="/certificates"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2.5 bg-[#d97706] hover:bg-[#b45309] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center gap-1.5"
            >
              <span>LIHAT TROPHY ROOM SERTIFIKAT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
