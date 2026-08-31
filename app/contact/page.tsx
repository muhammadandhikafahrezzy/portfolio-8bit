"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/components/SoundManager";
import { PixelMailbox } from "@/components/PixelIcons";
import { Mail, Phone, FileText, Check, Copy, Send, Sparkles, MapPin, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playCoin();
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundManager.playLevelUp();
    setSent(true);
    try {
      confetti({ particleCount: 50, spread: 70 });
    } catch {}

    // Open mailto fallback as well
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.contact.email}?subject=Kolaborasi Data Analyst - ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(formData.message)}%0A%0ADari:%20${encodeURIComponent(
      formData.name
    )}%20(${encodeURIComponent(formData.email)})`;
    window.open(mailtoUrl, "_blank");

    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <div className="py-6 px-3 md:px-6 max-w-7xl mx-auto w-full space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#0d9488] px-3 py-2 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-400 border border-black inline-block" />
            <h1 className="font-pixel text-[11px] md:text-sm text-white tracking-wider font-bold">
              STAGE 05: COMMAND_CENTER_AND_MAILBOX.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[10px]">
            <span className="w-5 h-5 bg-[#0f766e] text-white flex items-center justify-center border-2 border-black">
              _
            </span>
            <span className="w-5 h-5 bg-[#0f766e] text-white flex items-center justify-center border-2 border-black">
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
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0e2235] p-4 md:p-6 border-4 border-black shadow-[4px_4px_0px_#000]">
            <div className="p-3 bg-[#134e4a] border-2 border-black flex items-center justify-center">
              <PixelMailbox className="w-14 h-14 md:w-16 md:h-16" />
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h2 className="font-pixel text-sm md:text-base text-yellow-400">
                {PORTFOLIO_DATA.contact.headline}
              </h2>
              <p className="font-vt323 text-base md:text-lg text-slate-300 leading-snug">
                {PORTFOLIO_DATA.contact.subheadline}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Direct Communication Channels */}
            <div className="space-y-4">
              <h3 className="font-pixel text-xs text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>SALURAN KOMUNIKASI LANGSUNG:</span>
              </h3>

              <div className="space-y-3 font-pixel text-[9px]">
                {/* WhatsApp */}
                <a
                  href={PORTFOLIO_DATA.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center justify-between p-3.5 bg-[#15803d] hover:bg-[#16a34a] text-white border-4 border-black shadow-[4px_4px_0px_#000] active:translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <span className="block font-bold">WHATSAPP DIRECT CHAT</span>
                      <span className="font-vt323 text-sm text-green-200">{PORTFOLIO_DATA.contact.phone}</span>
                    </div>
                  </div>
                  <span className="text-yellow-300">HUBUNGI ▶</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={PORTFOLIO_DATA.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center justify-between p-3.5 bg-[#0369a1] hover:bg-[#0284c7] text-white border-4 border-black shadow-[4px_4px_0px_#000] active:translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.63 1.63 1.63 0 0 0 3.25 0 1.62 1.62 0 0 0-1.62-1.63Z" />
                    </svg>
                    <div>
                      <span className="block font-bold">LINKEDIN PROFILE</span>
                      <span className="font-vt323 text-sm text-cyan-200">{PORTFOLIO_DATA.contact.linkedin}</span>
                    </div>
                  </div>
                  <span className="text-yellow-300">KUNJUNGI ▶</span>
                </a>

                {/* Email Copy */}
                <div className="flex items-center justify-between p-3.5 bg-[#1e293b] text-yellow-300 border-4 border-black shadow-[4px_4px_0px_#000]">
                  <div className="flex items-center gap-3 truncate">
                    <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div className="truncate">
                      <span className="block text-slate-300 font-bold">EMAIL RESMI</span>
                      <span className="font-vt323 text-sm text-yellow-200 truncate">{PORTFOLIO_DATA.contact.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1 bg-[#0f766e] hover:bg-[#115e59] text-white border border-black flex items-center gap-1 cursor-pointer flex-shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "TERSALIN!" : "SALIN"}</span>
                  </button>
                </div>

                {/* Download CV */}
                <a
                  href="/CV_Muhammad_Andhika_Fahrezzy_ID.docx"
                  download
                  onClick={() => soundManager.playLevelUp()}
                  className="w-full flex items-center justify-center gap-2 p-3.5 bg-[#d97706] hover:bg-[#f59e0b] text-black font-pixel text-[9px] border-4 border-black shadow-[4px_4px_0px_#000] active:translate-y-1 font-bold transition-all block text-center"
                >
                  <FileText className="w-4 h-4" />
                  <span>UNDUH CURRICULUM VITAE (.DOCX)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Retro Terminal Message Form */}
            <div className="bg-[#111f30] p-4 md:p-6 border-4 border-black shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                <span className="w-2.5 h-2.5 bg-green-400" />
                <h3 className="font-pixel text-xs text-yellow-400">
                  TERMINAL_PESAN.BAT
                </h3>
              </div>

              {sent ? (
                <div className="p-6 bg-[#064e3b] border-2 border-black text-center space-y-2 animate-in fade-in">
                  <span className="text-3xl">🚀</span>
                  <h4 className="font-pixel text-xs text-green-300">PESAN BERHASIL DISIAPKAN!</h4>
                  <p className="font-vt323 text-base text-slate-200">
                    Aplikasi email Anda telah dibuka. Terima kasih telah menghubungi!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3 font-pixel text-[8px]">
                  <div>
                    <label className="block text-slate-300 mb-1">NAMA LENGKAP / PERUSAHAAN:</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Tim Rekrutmen Perusahaan..."
                      className="w-full p-2.5 bg-[#0a1622] text-white border-2 border-black font-vt323 text-base focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">EMAIL ANDA:</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full p-2.5 bg-[#0a1622] text-white border-2 border-black font-vt323 text-base focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">PESAN / TAWARAN KERJA:</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan pesan, penawaran posisi Data Analyst, atau ajakan diskusi di sini..."
                      className="w-full p-2.5 bg-[#0a1622] text-white border-2 border-black font-vt323 text-base focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-1 font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>KIRIM PESAN SEKARANG</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 flex items-center justify-between border-t-2 border-slate-700">
            <Link
              href="/"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              ◀ KEMBALI KE HOME
            </Link>

            <span className="font-vt323 text-base text-cyan-300">
              📍 Depok, Jawa Barat / Surabaya, Jawa Timur
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
