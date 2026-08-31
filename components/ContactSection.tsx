"use client";

import React, { useState } from "react";
import { soundManager } from "./SoundManager";
import { PixelMailbox } from "./PixelIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Mail, Phone, FileText, Check, Copy } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playCoin();
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="contact" className="h-full flex flex-col">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[4px_4px_0px_#000000] h-full flex flex-col">
        {/* Title Bar */}
        <div className="bg-[#0f766e] px-3 py-1.5 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-400 border border-black inline-block" />
            <h2 className="font-pixel text-[11px] md:text-xs text-white tracking-wider font-bold">
              KONTAK
            </h2>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[9px]">
            <span className="w-4 h-4 bg-[#115e59] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 bg-[#115e59] text-white flex items-center justify-center border border-black">
              □
            </span>
            <span className="w-4 h-4 bg-[#991b1b] text-white flex items-center justify-center border border-black">
              ✕
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3 md:p-4 bg-[#0a1622] flex-1 flex flex-col justify-between space-y-3">
          {/* Top Mailbox & Dialogue Bubble */}
          <div className="flex items-center gap-3">
            <div className="p-1 bg-[#134e4a] border-2 border-black flex items-center justify-center">
              <PixelMailbox className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            {/* Bubble */}
            <div className="relative flex-1 bg-[#e0f2fe] text-black border-4 border-black p-2.5 shadow-[2px_2px_0px_#000]">
              <div className="hidden sm:block absolute -left-3 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-black" />
              <p className="font-pixel text-[9px] md:text-[10px] font-bold text-slate-900 leading-snug">
                {PORTFOLIO_DATA.contact.headline}
              </p>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-pixel text-[8px]">
            {/* WhatsApp */}
            <a
              href={PORTFOLIO_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 bg-[#15803d] hover:bg-[#16a34a] text-white p-2 border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition-transform"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">WHATSAPP CHAT</span>
            </a>

            {/* LinkedIn */}
            <a
              href={PORTFOLIO_DATA.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 bg-[#0369a1] hover:bg-[#0284c7] text-white p-2 border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition-transform"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.63 1.63 1.63 0 0 0 3.25 0 1.62 1.62 0 0 0-1.62-1.63Z" />
              </svg>
              <span className="truncate">LINKEDIN PROFIL</span>
            </a>

            {/* Email Copy */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-between gap-2 bg-[#1e293b] hover:bg-[#334155] text-yellow-300 p-2 border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition-transform cursor-pointer text-left sm:col-span-2"
            >
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                <span className="truncate">{PORTFOLIO_DATA.contact.email}</span>
              </div>
              <span className="flex items-center gap-1 text-[7px] text-cyan-300 flex-shrink-0">
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "TERSALIN!" : "SALIN"}</span>
              </span>
            </button>
          </div>

          {/* Download CV CTA */}
          <div className="pt-1">
            <a
              href={`/${PORTFOLIO_DATA.contact.cvFilename}`}
              download
              onClick={() => soundManager.playLevelUp()}
              className="w-full flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#f59e0b] text-black font-pixel text-[9px] p-2.5 border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 transition-all font-bold"
            >
              <FileText className="w-4 h-4" />
              <span>UNDUH RESUME / CV LENGKAP (.DOCX)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
