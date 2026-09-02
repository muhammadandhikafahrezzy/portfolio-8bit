"use client";

import React, { useState } from "react";
import Image from "next/image";
import { soundManager } from "./SoundManager";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Briefcase, Calendar, MapPin, Eye, Building2 } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<{ url: string; type: "image" | "pdf"; title: string } | null>(null);

  const handleOpenDoc = (url: string, type: "image" | "pdf", title: string) => {
    soundManager.playWindowOpen();
    setActiveDoc({ url, type, title });
  };

  return (
    <section id="experience" className="py-4 sm:py-6 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#4338ca] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 border border-black inline-block flex-shrink-0" />
            <h2 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              PENGALAMAN KRONOLOGIS (2020 ➔ 2026)
            </h2>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#3730a3] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#3730a3] text-white flex items-center justify-center border border-black">
              □
            </span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#991b1b] text-white flex items-center justify-center border border-black">
              ✕
            </span>
          </div>
        </div>

        {/* Content Timeline */}
        <div className="p-3 sm:p-5 md:p-6 bg-[#0a1622] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <div
                key={exp.id}
                onMouseEnter={() => soundManager.playHover()}
                className="bg-[#111f30] border-2 border-black p-3 sm:p-4 flex flex-col justify-between shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] hover:border-yellow-400 transition-colors"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-700 pb-2">
                    <span className="bg-[#1e3a5f] text-yellow-300 font-pixel text-[7px] sm:text-[8px] px-2 py-0.5 border border-black font-bold">
                      STAGE 0{idx + 1} ({exp.yearRange})
                    </span>
                    <div className="flex items-center gap-1 text-[7px] font-pixel text-slate-300">
                      <Calendar className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="pt-0.5">
                    <h3 className="font-pixel text-[11px] sm:text-xs md:text-sm text-yellow-400 leading-snug">
                      {exp.role}
                    </h3>

                    <p className="font-pixel text-[8px] sm:text-[9px] text-cyan-300 flex items-center gap-1 mt-1">
                      <Building2 className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{exp.company}</span>
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-1 font-vt323 text-base text-slate-300 border-t border-slate-700 pt-2 text-justify sm:text-left">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-yellow-400 font-pixel text-[7px] mt-1 flex-shrink-0">▶</span>
                        <span className="text-justify sm:text-left leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Attached Certificate Button */}
                {exp.certificateFile && (
                  <div className="pt-2.5 border-t border-slate-800 mt-2.5">
                    <button
                      onClick={() =>
                        handleOpenDoc(
                          exp.certificateFile!,
                          exp.certificateType || "pdf",
                          `Dokumen ${exp.company}`
                        )
                      }
                      className="w-full py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-pixel text-[7px] sm:text-[8px] border border-black flex items-center justify-center gap-1 font-bold cursor-pointer transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>LIHAT BUKTI DOKUMEN</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Modal */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] max-w-4xl w-full h-[85vh] flex flex-col">
            <div className="bg-[#4338ca] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black gap-2">
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
    </section>
  );
};
