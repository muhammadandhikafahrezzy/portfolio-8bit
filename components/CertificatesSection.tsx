"use client";

import React, { useState } from "react";
import { soundManager } from "./SoundManager";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Award, FileText, Calendar, ExternalLink, X } from "lucide-react";

export const CertificatesSection: React.FC = () => {
  const [activePdf, setActivePdf] = useState<string | null>(null);

  const handleOpenPdf = (pdfUrl?: string) => {
    if (!pdfUrl) return;
    soundManager.playWindowOpen();
    setActivePdf(pdfUrl);
  };

  return (
    <section id="certificates" className="py-6 px-3 md:px-6 max-w-7xl mx-auto w-full">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[6px_6px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#b45309] px-3 py-2 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-300 border border-black inline-block" />
            <h2 className="font-pixel text-[11px] md:text-sm text-white tracking-wider font-bold">
              SERTIFIKAT & PENGHARGAAN (TROPHY ROOM)
            </h2>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[10px]">
            <span className="w-4 h-4 bg-[#92400e] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 bg-[#92400e] text-white flex items-center justify-center border border-black">
              □
            </span>
            <span className="w-4 h-4 bg-[#991b1b] text-white flex items-center justify-center border border-black">
              ✕
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-6 bg-[#0a1622] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PORTFOLIO_DATA.certificates.map((cert) => (
              <div
                key={cert.id}
                onMouseEnter={() => soundManager.playHover()}
                className="bg-[#111f30] border-2 border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000] hover:border-yellow-400 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🏆</span>
                    <span className="bg-[#1e3a5f] text-yellow-300 font-pixel text-[8px] px-2 py-0.5 border border-black font-bold">
                      VERIFIED CREDENTIAL
                    </span>
                  </div>

                  <h3 className="font-pixel text-xs md:text-sm text-yellow-400 mb-1 leading-snug">
                    {cert.title}
                  </h3>

                  <p className="font-pixel text-[9px] text-cyan-300 mb-1 flex items-center gap-1">
                    <Award className="w-3 h-3 text-cyan-400" />
                    <span>{cert.issuer}</span>
                  </p>

                  <p className="font-pixel text-[8px] text-slate-400 mb-3 flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5 text-green-400" />
                    <span>{cert.date}</span>
                  </p>

                  <p className="font-vt323 text-base text-slate-300 mb-4 border-t border-slate-700 pt-2 leading-snug">
                    {cert.description}
                  </p>
                </div>

                {cert.pdfFile && (
                  <button
                    onClick={() => handleOpenPdf(cert.pdfFile)}
                    className="w-full flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-pixel text-[8px] py-2 border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 cursor-pointer font-bold transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>PREVIEW DOKUMEN SERTIFIKAT (PDF)</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Modal Viewer */}
      {activePdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border-4 border-black shadow-[8px_8px_0px_#000] max-w-4xl w-full h-[85vh] flex flex-col">
            <div className="bg-[#b45309] px-3 py-2 flex items-center justify-between border-b-4 border-black">
              <span className="font-pixel text-xs text-white">SERTIFIKAT_VIEWER.PDF</span>
              <button
                onClick={() => {
                  soundManager.playWindowClose();
                  setActivePdf(null);
                }}
                className="w-6 h-6 bg-[#991b1b] hover:bg-[#ef4444] text-white flex items-center justify-center border-2 border-black font-pixel text-xs"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 bg-slate-900 p-2">
              <iframe
                src={activePdf}
                className="w-full h-full border-2 border-black"
                title="Certificate PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
