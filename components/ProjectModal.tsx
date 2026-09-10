"use client";

import React from "react";
import { Project } from "@/data/portfolioData";
import { soundManager } from "./SoundManager";
import { PixelComputer, PixelGamepad, PixelDatabase, PixelChart } from "./PixelIcons";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";
import { ExternalLink, User, Wrench, Sparkles, Eye, Globe } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  if (!project) return null;

  const renderIcon = () => {
    switch (project.icon) {
      case "chart":
        return <PixelChart className="w-8 h-8 sm:w-10 sm:h-10" />;
      case "database":
        return <PixelDatabase className="w-8 h-8 sm:w-10 sm:h-10" />;
      case "monitor":
        return <PixelComputer className="w-8 h-8 sm:w-10 sm:h-10" />;
      case "gamepad":
        return <PixelGamepad className="w-8 h-8 sm:w-10 sm:h-10" />;
      default:
        return <PixelDatabase className="w-8 h-8 sm:w-10 sm:h-10" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[8px_8px_0px_#000000] max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Window Header */}
        <div className="bg-[#ea580c] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-300 border border-black inline-block flex-shrink-0" />
            <h3 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              QUEST_LOG: {project.id.toUpperCase()}
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playWindowClose();
              onClose();
            }}
            className="w-5 h-5 sm:w-6 sm:h-6 bg-[#991b1b] hover:bg-[#ef4444] text-white flex items-center justify-center border border-black font-pixel text-[10px] sm:text-xs active:translate-y-0.5 cursor-pointer flex-shrink-0"
            title={language === "id" ? "Tutup Jendela" : "Close Window"}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-3 sm:p-5 md:p-6 bg-[#0a1622] overflow-y-auto space-y-3 sm:space-y-4 text-slate-100 flex-1">
          {/* Top Info Banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 bg-[#1e293b] p-2.5 sm:p-3.5 border-2 border-black">
            <div className="p-1.5 sm:p-2 bg-[#0e2235] border-2 border-black flex items-center justify-center flex-shrink-0">
              {renderIcon()}
            </div>
            <div className="text-center sm:text-left flex-1 min-w-0">
              <span className="inline-block bg-[#eab308] text-black font-pixel text-[7px] sm:text-[8px] px-2 py-0.5 border border-black mb-1 font-bold">
                {project.category}
              </span>
              <h2 className="font-pixel text-xs sm:text-sm md:text-base text-yellow-300 mb-1 leading-snug">
                {language === "en" ? (project.title_en || project.title) : project.title}
              </h2>
              <p className="font-vt323 text-base sm:text-lg text-cyan-300 leading-tight">
                {language === "en" ? (project.subtitle_en || project.subtitle) : project.subtitle}
              </p>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 font-pixel text-[7px] sm:text-[8px]">
            <div className="bg-[#111f30] p-2 border border-black flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span className="truncate">ROLE: {language === "en" ? (project.role_en || project.role) : project.role}</span>
            </div>
            <div className="bg-[#111f30] p-2 border border-black flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              <span className="truncate">CATEGORY: {project.category}</span>
            </div>
          </div>

          {/* Project Link Action Buttons */}
          {(project.demoUrl || project.secondaryUrl || project.githubUrl || project.certificateUrl) && (
            <div className="bg-[#1e293b] p-2.5 sm:p-3 border-2 border-black space-y-2">
              <h4 className="font-pixel text-[8px] sm:text-[9px] text-yellow-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                <span>{language === "id" ? "LINK KARYA & HASIL PROJEK:" : "PROJECT DELIVERABLES & LIVE LINKS:"}</span>
              </h4>
              <div className="flex flex-col gap-1.5">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playLevelUp()}
                    className="flex items-center justify-between p-2 sm:p-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-pixel text-[7px] sm:text-[8px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 font-bold transition-all"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">
                        {language === "en"
                          ? (project.demoLabel_en || project.demoLabel || "OPEN PROJECT DEMO")
                          : (project.demoLabel || "BUKA LINK PROJEK")}
                      </span>
                    </div>
                    <span className="text-yellow-300 flex-shrink-0 ml-2">{language === "id" ? "KUNJUNGI ▶" : "VISIT ▶"}</span>
                  </a>
                )}

                {project.secondaryUrl && (
                  <a
                    href={project.secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playLevelUp()}
                    className="flex items-center justify-between p-2 sm:p-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-pixel text-[7px] sm:text-[8px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 font-bold transition-all"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">
                        {language === "en"
                          ? (project.secondaryLabel_en || project.secondaryLabel || "OPEN SECONDARY LINK")
                          : (project.secondaryLabel || "BUKA LINK KEDUA")}
                      </span>
                    </div>
                    <span className="text-yellow-300 flex-shrink-0 ml-2">{language === "id" ? "KUNJUNGI ▶" : "VISIT ▶"}</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playLevelUp()}
                    className="flex items-center justify-between p-2 sm:p-2.5 bg-[#334155] hover:bg-[#475569] text-white font-pixel text-[7px] sm:text-[8px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 font-bold transition-all"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">
                        {language === "en"
                          ? "VIEW GITHUB REPOSITORY"
                          : "LIHAT REPOSITORI GITHUB"}
                      </span>
                    </div>
                    <span className="text-yellow-300 flex-shrink-0 ml-2">{language === "id" ? "BUKA REPO ▶" : "VIEW REPO ▶"}</span>
                  </a>
                )}

                {project.certificateUrl && (
                  <a
                    href={project.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playLevelUp()}
                    className="flex items-center justify-between p-2 sm:p-2.5 bg-[#15803d] hover:bg-[#16a34a] text-white font-pixel text-[7px] sm:text-[8px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 font-bold transition-all"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Eye className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">
                        {language === "en"
                          ? (project.demoLabel_en || "VIEW CREDENTIAL")
                          : (project.demoLabel || "LIHAT BUKTI SERTIFIKAT")}
                      </span>
                    </div>
                    <span className="text-yellow-300 flex-shrink-0 ml-2">{language === "id" ? "LIHAT ▶" : "VIEW ▶"}</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Long Description */}
          <div className="bg-[#111f30] p-2.5 sm:p-3.5 border-2 border-black space-y-1.5">
            <h4 className="font-pixel text-[8px] sm:text-[9px] text-yellow-400 flex items-center gap-1.5">
              <span>📜</span>
              <span>{language === "id" ? "DESKRIPSI PROSES & ANALISIS:" : "METHODOLOGY & ANALYTICAL PROCESS:"}</span>
            </h4>
            <div className="font-vt323 text-base sm:text-lg text-slate-300 space-y-1.5 leading-relaxed text-justify sm:text-left">
              {((language === "en" && project.longDescription_en ? project.longDescription_en : project.longDescription) || []).map((desc, idx) => (
                <p key={idx} className="leading-relaxed">• {desc}</p>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="bg-[#111f30] p-2.5 sm:p-3.5 border-2 border-black space-y-1.5">
            <h4 className="font-pixel text-[8px] sm:text-[9px] text-green-400 flex items-center gap-1.5">
              <span>⭐</span>
              <span>{language === "id" ? "HIGHLIGHT PENCAPAIAN:" : "CORE HIGHLIGHTS & OUTCOMES:"}</span>
            </h4>
            <ul className="grid grid-cols-1 gap-1 font-vt323 text-base sm:text-lg text-slate-200">
              {((language === "en" && project.highlights_en ? project.highlights_en : project.highlights) || []).map((hl, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-yellow-400 font-pixel text-[7px] flex-shrink-0 mt-1">▶</span>
                  <span className="text-justify sm:text-left leading-relaxed">{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Inventory */}
          <div className="bg-[#111f30] p-2.5 sm:p-3.5 border-2 border-black space-y-1.5">
            <h4 className="font-pixel text-[8px] sm:text-[9px] text-cyan-400 flex items-center gap-1.5">
              <Wrench className="w-3 h-3 flex-shrink-0" />
              <span>{language === "id" ? "TOOLS & GEAR:" : "TOOLS & TECH STACK:"}</span>
            </h4>
            <div className="flex flex-wrap gap-1">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="bg-[#162a42] text-yellow-300 font-pixel text-[7px] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#1e293b] p-2.5 sm:p-3 border-t-2 sm:border-t-4 border-black flex items-center justify-end">
          <button
            onClick={() => {
              soundManager.playWindowClose();
              onClose();
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 font-bold cursor-pointer"
          >
            {language === "id" ? "TUTUP QUEST LOG [ESC]" : "CLOSE QUEST LOG [ESC]"}
          </button>
        </div>
      </div>
    </div>
  );
};
