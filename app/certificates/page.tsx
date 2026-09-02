"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_DATA, Certificate } from "@/data/portfolioData";
import { soundManager } from "@/components/SoundManager";
import { Award, Calendar, ArrowRight, Sparkles, Eye, Download } from "lucide-react";

export default function CertificatesPage() {
  const [activeDoc, setActiveDoc] = useState<{ url: string; type: "image" | "pdf"; title: string } | null>(null);

  const handleOpenDoc = (cert: Certificate) => {
    if (!cert.fileUrl) return;
    soundManager.playWindowOpen();
    setActiveDoc({
      url: cert.fileUrl,
      type: cert.fileType || "pdf",
      title: cert.title,
    });
  };

  return (
    <div className="py-4 sm:py-6 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#d97706] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-300 border border-black inline-block flex-shrink-0" />
            <h1 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              STAGE 04: TROPHY_ROOM_AND_CERTIFICATIONS.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#b45309] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#b45309] text-white flex items-center justify-center border border-black">
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
                RUANG PIALA (TROPHY ROOM) & SERTIFIKASI RESMI
              </h2>
            </div>
            <p className="font-vt323 text-base sm:text-lg md:text-xl text-slate-300 text-justify sm:text-left leading-relaxed">
              Koleksi seluruh sertifikasi kompetensi analisis data industri, pelatihan intensif Bitlabs Academy for Business, pengalaman magang industri Koperasi Karyawan PT Astra Honda Motor, serta Surat Penetapan Kelulusan S1 Sistem Informasi UNESA.
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {PORTFOLIO_DATA.certificates.map((cert) => (
              <div
                key={cert.id}
                onMouseEnter={() => soundManager.playHover()}
                className="bg-[#111f30] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] p-3 sm:p-5 md:p-6 flex flex-col justify-between hover:border-yellow-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                    <span className="text-2xl sm:text-3xl">🏆</span>
                    <span className="bg-[#1e3a5f] text-yellow-300 font-pixel text-[7px] sm:text-[8px] px-2 py-0.5 border border-black font-bold">
                      VERIFIED CREDENTIAL
                    </span>
                  </div>

                  <h3 className="font-pixel text-xs sm:text-sm md:text-base text-yellow-400 mb-1 leading-snug">
                    {cert.title}
                  </h3>

                  <p className="font-pixel text-[8px] sm:text-[9px] text-cyan-300 mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{cert.issuer}</span>
                  </p>

                  <p className="font-pixel text-[7px] sm:text-[8px] text-slate-400 mb-3 sm:mb-4 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-green-400 flex-shrink-0" />
                    <span>{cert.date}</span>
                  </p>

                  <p className="font-vt323 text-base sm:text-lg text-slate-300 mb-4 sm:mb-6 border-t border-slate-700 pt-2.5 leading-relaxed text-justify sm:text-left">
                    {cert.description}
                  </p>
                </div>

                {cert.fileUrl && (
                  <div className="space-y-1.5 sm:space-y-2 pt-2">
                    <button
                      onClick={() => handleOpenDoc(cert)}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-pixel text-[7px] sm:text-[8px] py-2 sm:py-2.5 border border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 cursor-pointer font-bold transition-colors text-center"
                    >
                      <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        PREVIEW DOKUMEN ({cert.fileType === "image" ? "GAMBAR/JPG" : "PDF"})
                      </span>
                    </button>
                    <a
                      href={cert.fileUrl}
                      download
                      onClick={() => soundManager.playLevelUp()}
                      className="w-full flex items-center justify-center gap-1 bg-[#1e293b] hover:bg-[#334155] text-slate-200 font-pixel text-[7px] sm:text-[8px] py-1.5 sm:py-2 border border-black text-center block transition-colors"
                    >
                      <Download className="w-3 h-3 flex-shrink-0" />
                      <span>UNDUH BERKAS SERTIFIKAT</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 border-t-2 border-slate-700">
            <Link
              href="/experience"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] text-center"
            >
              ◀ KEMBALI KE PENGALAMAN
            </Link>

            <Link
              href="/minigame"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#15803d] hover:bg-[#166534] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center justify-center gap-1.5 text-center"
            >
              <span>MAINKAN DATA KNIGHT VS ULER 🗡️🐍</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* Document Modal Viewer */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] max-w-4xl w-full h-[85vh] flex flex-col">
            <div className="bg-[#d97706] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black gap-2">
              <span className="font-pixel text-[8px] sm:text-xs text-white truncate max-w-[80%]">
                {activeDoc.title}
              </span>
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
