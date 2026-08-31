"use client";

import React from "react";
import { soundManager } from "./SoundManager";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-6 px-3 md:px-6 max-w-7xl mx-auto w-full">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[6px_6px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#4338ca] px-3 py-2 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 border border-black inline-block" />
            <h2 className="font-pixel text-[11px] md:text-sm text-white tracking-wider font-bold">
              PENGALAMAN KERJA & RIWAYAT PETUALANGAN (ADVENTURE LOG)
            </h2>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[10px]">
            <span className="w-4 h-4 bg-[#3730a3] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 bg-[#3730a3] text-white flex items-center justify-center border border-black">
              □
            </span>
            <span className="w-4 h-4 bg-[#991b1b] text-white flex items-center justify-center border border-black">
              ✕
            </span>
          </div>
        </div>

        {/* Content Timeline */}
        <div className="p-4 md:p-6 bg-[#0a1622] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <div
                key={exp.id}
                onMouseEnter={() => soundManager.playHover()}
                className="bg-[#111f30] border-2 border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000000] hover:border-yellow-400 transition-colors"
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-[#1e3a5f] text-yellow-300 font-pixel text-[8px] px-2 py-0.5 border border-black font-bold">
                      STAGE 0{idx + 1}
                    </span>
                    <span className="bg-[#15803d] text-white font-pixel text-[7px] px-1.5 py-0.5 border border-black">
                      {exp.badge}
                    </span>
                  </div>

                  <h3 className="font-pixel text-xs md:text-sm text-yellow-400 mb-1 leading-snug">
                    {exp.role}
                  </h3>

                  <p className="font-pixel text-[9px] text-cyan-300 mb-2 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-cyan-400" />
                    <span>{exp.company}</span>
                  </p>

                  <div className="flex flex-wrap gap-2 text-[8px] font-pixel text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5 text-green-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-red-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-1.5 font-vt323 text-base text-slate-300 border-t border-slate-700 pt-2.5">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-yellow-400 font-pixel text-[8px] mt-1">▶</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
