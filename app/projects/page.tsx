"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project, PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/components/SoundManager";
import { PixelDatabase, PixelChart, PixelComputer, PixelGamepad } from "@/components/PixelIcons";
import { ProjectModal } from "@/components/ProjectModal";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";
import { ArrowRight, Sparkles, CheckCircle2, ExternalLink } from "lucide-react";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["ALL", "Data Analysis", "Business Intelligence", "UI/UX & Web"];

  const filteredProjects =
    selectedCategory === "ALL"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  const handleOpenProject = (project: Project) => {
    soundManager.playWindowOpen();
    setActiveProject(project);
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "database":
        return <PixelDatabase className="w-8 h-8 sm:w-10 sm:h-10" />;
      case "chart":
        return <PixelChart className="w-8 h-8 sm:w-10 sm:h-10" />;
      case "monitor":
        return <PixelComputer className="w-8 h-8 sm:w-10 sm:h-10" />;
      case "gamepad":
        return <PixelGamepad className="w-8 h-8 sm:w-10 sm:h-10" />;
      default:
        return <PixelDatabase className="w-8 h-8 sm:w-10 sm:h-10" />;
    }
  };

  return (
    <div className="py-4 sm:py-6 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#ea580c] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-300 border border-black inline-block flex-shrink-0" />
            <h1 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              {t.projects.windowTitle}
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#c2410c] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#c2410c] text-white flex items-center justify-center border border-black">
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
                {t.projects.headerTitle}
              </h2>
            </div>
            <p className="font-vt323 text-base sm:text-lg md:text-xl text-slate-300 text-justify sm:text-left leading-relaxed">
              {t.projects.headerSubtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-pixel text-[7px] sm:text-[8px] md:text-[9px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black active:translate-y-0.5 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#facc15] text-black font-bold shadow-[2px_2px_0px_#000]"
                    : "bg-[#1e3a5f] text-slate-200 hover:bg-[#2563eb]"
                }`}
              >
                {cat === "ALL" ? (language === "id" ? "SEMUA QUEST" : "ALL QUESTS") : cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Projects Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => soundManager.playHover()}
                className="bg-[#111f30] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] p-3 sm:p-4 flex flex-col justify-between group hover:border-yellow-400 transition-all transform hover:-translate-y-1"
              >
                <div className="space-y-2.5">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-[#eab308] text-black font-pixel text-[7px] sm:text-[8px] px-2 py-0.5 border border-black font-bold truncate">
                      {project.category}
                    </span>
                    <div className="p-1.5 bg-[#0a1622] border-2 border-black flex-shrink-0">
                      {getIcon(project.icon)}
                    </div>
                  </div>

                  <h3 className="font-pixel text-[11px] sm:text-xs md:text-sm text-yellow-400 group-hover:text-yellow-300 leading-snug">
                    {language === "en" ? (project.title_en || project.title) : project.title}
                  </h3>

                  <p className="font-vt323 text-base sm:text-lg text-cyan-300 leading-tight">
                    {language === "en" ? (project.subtitle_en || project.subtitle) : project.subtitle}
                  </p>

                  <p className="font-vt323 text-base sm:text-lg text-slate-300 leading-relaxed border-t border-slate-700 pt-2 line-clamp-3 text-justify sm:text-left">
                    {language === "en" ? (project.description_en || project.description) : project.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1">
                    <span className="font-pixel text-[7px] sm:text-[8px] text-green-400 block">
                      {t.projects.deliverablesLabel}
                    </span>
                    {(language === "en" && project.highlights_en ? project.highlights_en : project.highlights).slice(0, 2).map((hl, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-1.5 font-pixel text-[7px] sm:text-[8px] text-slate-300 bg-[#162a42] p-1.5 border border-black"
                      >
                        <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tools Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tools.map((toolName, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-[#1e3a5f] text-yellow-300 font-pixel text-[6px] sm:text-[7px] px-1.5 py-0.5 border border-black"
                      >
                        {toolName}
                      </span>
                    ))}
                  </div>

                  {/* Direct Project Link Buttons */}
                  {(project.demoUrl || project.secondaryUrl || project.githubUrl || project.certificateUrl) && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-700">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playLevelUp();
                          }}
                          className="w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-pixel text-[7px] sm:text-[8px] border border-black shadow-[2px_2px_0px_#000] font-bold transition-all text-center whitespace-normal break-words leading-tight"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span>
                            {language === "en"
                              ? (project.demoLabel_en || project.demoLabel || "OPEN PROJECT LINK")
                              : (project.demoLabel || "BUKA LINK PROJEK")}
                          </span>
                        </a>
                      )}
                      {project.secondaryUrl && (
                        <a
                          href={project.secondaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playLevelUp();
                          }}
                          className="w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-pixel text-[7px] sm:text-[8px] border border-black shadow-[2px_2px_0px_#000] font-bold transition-all text-center whitespace-normal break-words leading-tight"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span>
                            {language === "en"
                              ? (project.secondaryLabel_en || project.secondaryLabel || "OPEN SECONDARY LINK")
                              : (project.secondaryLabel || "BUKA LINK KEDUA")}
                          </span>
                        </a>
                      )}
                      {project.githubUrl && !project.demoUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playLevelUp();
                          }}
                          className="w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-[#334155] hover:bg-[#475569] text-white font-pixel text-[7px] sm:text-[8px] border border-black shadow-[2px_2px_0px_#000] font-bold transition-all text-center whitespace-normal break-words leading-tight"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span>{language === "id" ? "LIHAT REPO GITHUB" : "VIEW GITHUB REPO"}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Open Modal Button */}
                <button
                  onClick={() => handleOpenProject(project)}
                  className="w-full mt-3 py-2 sm:py-2.5 bg-[#ea580c] hover:bg-[#f97316] text-white font-pixel text-[7px] sm:text-[8px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{t.projects.btnDetails}</span>
                  <ArrowRight className="w-3 h-3 flex-shrink-0" />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 border-t-2 border-slate-700">
            <Link
              href="/about"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] text-center"
            >
              ◀ {language === "id" ? "LIHAT PROFIL & STATS" : "CHARACTER PROFILE"}
            </Link>

            <Link
              href="/experience"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center justify-center gap-1.5 text-center"
            >
              <span>{t.projects.btnNext}</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
