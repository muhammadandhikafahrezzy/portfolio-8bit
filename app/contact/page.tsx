"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PixelMailbox } from "@/components/PixelIcons";
import { soundManager } from "@/components/SoundManager";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  Send,
  Check,
  Copy,
  Sparkles,
  FileText,
  MessageSquare,
  Clock,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c6689ee6-67da-4b35-9a74-2f5bd1e71e6d",
          from_name: formData.name,
          email: formData.email,
          subject: `[Portofolio Data Analyst] New Message from ${formData.name} (${formData.company || "General Inquiry"})`,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        soundManager.playLevelUp();
        setSubmitted(true);
        try {
          confetti({
            particleCount: 80,
            spread: 75,
            origin: { y: 0.6 },
          });
        } catch {}
      } else {
        setErrorMessage(result.message || (language === "id" ? "Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp." : "Failed to transmit message. Please retry or contact via WhatsApp."));
        soundManager.playDeath();
      }
    } catch (err) {
      setErrorMessage(language === "id" ? "Koneksi gagal. Silakan periksa jaringan internet Anda atau hubungi via WhatsApp/Email langsung." : "Connection error. Please check your network or reach out directly via WhatsApp/Email.");
      soundManager.playDeath();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    soundManager.playCoin();
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-4 sm:py-6 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#0d9488] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-300 border border-black inline-block flex-shrink-0" />
            <h1 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              {t.contact.windowTitle}
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#0f766e] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#0f766e] text-white flex items-center justify-center border border-black">
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
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-[#0e2235] p-3 sm:p-5 border-2 border-black">
            <div className="p-2 sm:p-3 bg-[#134e4a] border-2 border-black flex items-center justify-center flex-shrink-0">
              <PixelMailbox className="w-10 h-10 sm:w-14 sm:h-14" />
            </div>

            <div className="flex-1 space-y-1 sm:space-y-2 text-center sm:text-left min-w-0">
              <h2 className="font-pixel text-xs sm:text-sm md:text-base text-yellow-400 leading-snug">
                {language === "en" ? PORTFOLIO_DATA.contact.headline_en : PORTFOLIO_DATA.contact.headline}
              </h2>
              <p className="font-vt323 text-base sm:text-lg text-slate-300 leading-snug">
                {language === "en" ? PORTFOLIO_DATA.contact.subheadline_en : PORTFOLIO_DATA.contact.subheadline}
              </p>
            </div>
          </div>

          {/* Dual Column Layout: Direct Channels & Message Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
            {/* Left Column: Direct Communication Channels */}
            <div className="space-y-3 font-pixel text-[8px] sm:text-[9px]">
              <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                <h3 className="text-yellow-400 font-bold">{t.contact.directChannelsTitle}</h3>
              </div>

              <div className="space-y-2">
                {/* WhatsApp */}
                <a
                  href={PORTFOLIO_DATA.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center justify-between p-2.5 sm:p-3.5 bg-[#15803d] hover:bg-[#16a34a] text-white border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] active:translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="block font-bold truncate">{t.contact.whatsappLabel}</span>
                      <span className="font-vt323 text-sm sm:text-base text-green-200 block truncate">{PORTFOLIO_DATA.contact.phone}</span>
                    </div>
                  </div>
                  <span className="text-yellow-300 flex-shrink-0 ml-2">CHAT ▶</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={PORTFOLIO_DATA.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center justify-between p-2.5 sm:p-3.5 bg-[#0369a1] hover:bg-[#0284c7] text-white border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] active:translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.63 1.63 1.63 0 0 0 3.25 0 1.62 1.62 0 0 0-1.62-1.63Z" />
                    </svg>
                    <div className="min-w-0">
                      <span className="block font-bold truncate">{t.contact.linkedinLabel}</span>
                      <span className="font-vt323 text-sm sm:text-base text-cyan-200 block truncate">{PORTFOLIO_DATA.contact.linkedin}</span>
                    </div>
                  </div>
                  <span className="text-yellow-300 flex-shrink-0 ml-2">VISIT ▶</span>
                </a>

                {/* GitHub */}
                <a
                  href={PORTFOLIO_DATA.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center justify-between p-2.5 sm:p-3.5 bg-[#334155] hover:bg-[#475569] text-white border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] active:translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                    <div className="min-w-0">
                      <span className="block font-bold truncate">{t.contact.githubLabel}</span>
                      <span className="font-vt323 text-sm sm:text-base text-slate-200 block truncate">{PORTFOLIO_DATA.contact.github}</span>
                    </div>
                  </div>
                  <span className="text-yellow-300 flex-shrink-0 ml-2">VISIT ▶</span>
                </a>

                {/* Email Copy */}
                <div className="flex items-center justify-between p-2.5 sm:p-3.5 bg-[#1e293b] text-yellow-300 border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-slate-300 font-bold truncate">{t.contact.emailLabel}</span>
                      <span className="font-vt323 text-sm sm:text-base text-yellow-200 block truncate">{PORTFOLIO_DATA.contact.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2 sm:px-3 py-1 bg-[#0f766e] hover:bg-[#115e59] text-white border border-black flex items-center gap-1 cursor-pointer flex-shrink-0 ml-2"
                  >
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? t.contact.copiedBtn : t.contact.copyBtn}</span>
                  </button>
                </div>

                {/* Download CV */}
                <a
                  href="/CV_Muhammad_Andhika_Fahrezzy_ID.docx"
                  download
                  onClick={() => soundManager.playLevelUp()}
                  className="w-full flex items-center justify-center gap-2 p-2.5 sm:p-3.5 bg-[#d97706] hover:bg-[#f59e0b] text-black font-pixel text-[8px] sm:text-[9px] border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] active:translate-y-0.5 font-bold transition-all block text-center"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>{t.contact.cvBtn}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Retro Terminal Message Form */}
            <div className="bg-[#111f30] p-3 sm:p-5 md:p-6 border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
                <span className="w-2.5 h-2.5 bg-green-400 flex-shrink-0 animate-pulse" />
                <h3 className="font-pixel text-[9px] sm:text-xs text-yellow-400">
                  {t.contact.formTitle}
                </h3>
              </div>

              {submitted ? (
                <div className="bg-[#064e3b] p-4 sm:p-6 border-2 border-black text-center space-y-3 animate-in fade-in">
                  <span className="text-4xl block animate-bounce">📬</span>
                  <h4 className="font-pixel text-xs sm:text-sm text-yellow-300">
                    {t.contact.successTitle}
                  </h4>
                  <p className="font-vt323 text-base sm:text-lg text-slate-200 leading-snug">
                    {t.contact.successDesc}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", company: "", message: "" });
                    }}
                    className="mt-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-pixel text-[8px] sm:text-[9px] border-2 border-black font-bold cursor-pointer active:translate-y-0.5"
                  >
                    {t.contact.btnNewMessage}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3 font-pixel text-[8px]">
                  {errorMessage && (
                    <div className="p-2.5 bg-red-950 border-2 border-red-500 text-red-200 flex items-center gap-2 text-[7px] sm:text-[8px]">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-300 mb-1">{t.contact.formName}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.contact.formNamePlaceholder}
                      disabled={isSubmitting}
                      className="w-full bg-[#0a1622] text-yellow-300 p-2 border border-black font-vt323 text-base sm:text-lg focus:outline-none focus:border-yellow-400 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">{t.contact.formEmail}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.contact.formEmailPlaceholder}
                      disabled={isSubmitting}
                      className="w-full bg-[#0a1622] text-yellow-300 p-2 border border-black font-vt323 text-base sm:text-lg focus:outline-none focus:border-yellow-400 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">{t.contact.formSubject}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={t.contact.formSubjectPlaceholder}
                      disabled={isSubmitting}
                      className="w-full bg-[#0a1622] text-yellow-300 p-2 border border-black font-vt323 text-base sm:text-lg focus:outline-none focus:border-yellow-400 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">{t.contact.formMessage}</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.contact.formMessagePlaceholder}
                      disabled={isSubmitting}
                      className="w-full bg-[#0a1622] text-yellow-300 p-2 border border-black font-vt323 text-base sm:text-lg focus:outline-none focus:border-yellow-400 resize-none disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 sm:py-3 bg-[#0284c7] hover:bg-[#0369a1] disabled:bg-slate-700 text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{t.contact.formSubmitting}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{t.contact.formSubmit}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 border-t-2 border-slate-700">
            <Link
              href="/minigame"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] text-center"
            >
              {t.contact.btnBackGame}
            </Link>

            <Link
              href="/"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0d9488] hover:bg-[#0f766e] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center justify-center gap-1.5 text-center"
            >
              <span>{t.contact.btnHome}</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
