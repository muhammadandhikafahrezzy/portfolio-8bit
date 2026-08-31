"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { soundManager } from "@/components/SoundManager";
import { ProjectModal } from "@/components/ProjectModal";
import { PixelDatabase, PixelChart, PixelComputer, PixelGamepad } from "@/components/PixelIcons";
import { Database, BarChart3, Wrench, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export default function ProjectsPage() {
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
        return <PixelDatabase className="w-12 h-12" />;
      case "chart":
        return <PixelChart className="w-12 h-12" />;
      case "monitor":
        return <PixelComputer className="w-12 h-12" />;
      case "gamepad":
        return <PixelGamepad className="w-12 h-12" />;
      default:
        return <PixelDatabase className="w-12 h-12" />;
    }
  };

  return (
    <div className="py-6 px-3 md:px-6 max-w-7xl mx-auto w-full space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#ea580c] px-3 py-2 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 border border-black inline-block" />
            <h1 className="font-pixel text-[11px] md:text-sm text-white tracking-wider font-bold">
              STAGE 02: DATA_QUEST_LOG_AND_CASE_STUDIES.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[10px]">
            <span className="w-5 h-5 bg-[#c2410c] text-white flex items-center justify-center border-2 border-black">
              _
            </span>
            <span className="w-5 h-5 bg-[#c2410c] text-white flex items-center justify-center border-2 border-black">
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
          {/* Header Description */}
          <div className="bg-[#0e2235] p-4 border-2 border-black space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <h2 className="font-pixel text-xs md:text-sm text-yellow-400">
                KATALOG STUDI KASUS & PROYEK ANALISIS DATA
              </h2>
            </div>
            <p className="font-vt323 text-base md:text-lg text-slate-300">
              Setiap quest di bawah ini merepresentasikan studi kasus nyata dalam memecahkan masalah bisnis menggunakan query SQL, pemodelan data, analisis Python, dan dashboarding interaktif Tableau/Looker Studio.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-pixel text-[9px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-2 border-2 border-black active:translate-y-0.5 transition-all ${
                  selectedCategory === cat
                    ? "bg-[#facc15] text-black font-bold shadow-[2px_2px_0px_#000]"
                    : "bg-[#1e3a5f] text-slate-200 hover:bg-[#2563eb]"
                }`}
              >
                {cat === "ALL" ? "SEMUA QUEST" : cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Projects Cards List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => soundManager.playHover()}
                className="bg-[#111f30] border-4 border-black shadow-[6px_6px_0px_#000] p-4 flex flex-col justify-between group hover:border-yellow-400 transition-all transform hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-[#eab308] text-black font-pixel text-[8px] px-2 py-0.5 border border-black font-bold">
                      {project.category}
                    </span>
                    <div className="p-2 bg-[#0a1622] border-2 border-black">
                      {getIcon(project.icon)}
                    </div>
                  </div>

                  <h3 className="font-pixel text-xs md:text-sm text-yellow-400 group-hover:text-yellow-300 mb-1 leading-snug">
                    {project.title}
                  </h3>

                  <p className="font-vt323 text-base text-cyan-300 mb-3 leading-tight">
                    {project.subtitle}
                  </p>

                  <p className="font-vt323 text-base text-slate-300 mb-4 line-clamp-3 leading-snug border-t border-slate-700 pt-2">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-4">
                    <span className="font-pixel text-[8px] text-green-400 block">
                      KEY DELIVERABLES:
                    </span>
                    {project.highlights.slice(0, 2).map((hl, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-1.5 font-pixel text-[7px] text-slate-300 bg-[#162a42] p-1.5 border border-black"
                      >
                        <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tools Pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tools.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-[#1e3a5f] text-yellow-300 font-pixel text-[7px] px-1.5 py-0.5 border border-black"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Direct Project Links */}
                  {(project.demoUrl || project.githubUrl || project.certificateUrl) && (
                    <div className="mb-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playLevelUp();
                          }}
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-pixel text-[7px] border border-black shadow-[2px_2px_0px_#000] font-bold transition-all mb-1"
                        >
                          <span>🔗 {project.demoLabel || "BUKA LINK PROJEK"}</span>
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
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-pixel text-[7px] border border-black shadow-[2px_2px_0px_#000] font-bold transition-all mb-1"
                        >
                          <span>📱 {project.secondaryLabel || "BUKA LINK KEDUA"}</span>
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
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#334155] hover:bg-[#475569] text-white font-pixel text-[7px] border border-black shadow-[2px_2px_0px_#000] font-bold transition-all mb-1"
                        >
                          <span>💻 LIHAT REPO GITHUB</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Open Modal Button */}
                <button
                  onClick={() => handleOpenProject(project)}
                  className="w-full py-2.5 bg-[#ea580c] hover:bg-[#f97316] text-white font-pixel text-[8px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>BUKA DETAIL STUDI KASUS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-slate-700">
            <Link
              href="/about"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              ◀ LIHAT PROFIL & STATS
            </Link>

            <Link
              href="/experience"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center gap-1.5"
            >
              <span>LANJUT KE PENGALAMAN KARIER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quest Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
