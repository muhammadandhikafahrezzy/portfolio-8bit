"use client";

import React, { useState } from "react";
import { soundManager } from "./SoundManager";
import { Project, PORTFOLIO_DATA } from "@/data/portfolioData";
import { PixelComputer, PixelGamepad, PixelPaintBrush, PixelDatabase, PixelChart } from "./PixelIcons";
import { ProjectModal } from "./ProjectModal";

export const ProjectsSection: React.FC = () => {
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
        return <PixelDatabase className="w-10 h-10" />;
      case "chart":
        return <PixelChart className="w-10 h-10" />;
      case "monitor":
        return <PixelComputer className="w-10 h-10" />;
      case "gamepad":
        return <PixelGamepad className="w-10 h-10" />;
      default:
        return <PixelDatabase className="w-10 h-10" />;
    }
  };

  return (
    <div id="projects" className="h-full flex flex-col">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[4px_4px_0px_#000000] h-full flex flex-col">
        {/* Title Bar */}
        <div className="bg-[#c2410c] px-3 py-1.5 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-yellow-400 border border-black inline-block" />
            <h2 className="font-pixel text-[11px] md:text-xs text-white tracking-wider font-bold">
              PROYEK
            </h2>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[9px]">
            <span className="w-4 h-4 bg-[#ea580c] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 bg-[#ea580c] text-white flex items-center justify-center border border-black">
              □
            </span>
            <span className="w-4 h-4 bg-[#991b1b] text-white flex items-center justify-center border border-black">
              ✕
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3 md:p-4 bg-[#0a1622] flex-1 flex flex-col justify-between space-y-3">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-pixel text-[8px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-2 py-1 border-2 border-black active:translate-y-0.5 ${
                  selectedCategory === cat
                    ? "bg-[#facc15] text-black font-bold shadow-[2px_2px_0px_#000]"
                    : "bg-[#1e3a5f] text-slate-200 hover:bg-[#2563eb]"
                }`}
              >
                {cat === "ALL" ? "SEMUA" : cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Project Cards Grid matching mockup style */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
            {filteredProjects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project)}
                onMouseEnter={() => soundManager.playHover()}
                className="bg-[#111f30] hover:bg-[#162a42] border-2 border-black shadow-[3px_3px_0px_#000] p-2.5 flex flex-col justify-between cursor-pointer group transition-all transform hover:-translate-y-1"
              >
                {/* Pixel Icon Box */}
                <div className="flex items-center justify-center p-3 bg-[#0a1622] border-2 border-black mb-2 group-hover:border-yellow-400">
                  {getIcon(project.icon)}
                </div>

                {/* Title & Category */}
                <div className="text-center space-y-1 mb-2">
                  <h3 className="font-pixel text-[9px] text-yellow-400 group-hover:text-yellow-300 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="font-vt323 text-xs text-slate-300 line-clamp-2 leading-tight">
                    {project.description}
                  </p>
                </div>

                {/* Action Tag */}
                <div className="text-center pt-1 border-t border-slate-700">
                  <span className="font-pixel text-[7px] text-cyan-300 group-hover:underline">
                    ▶ DETAIL QUEST
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Extra bottom note */}
          <div className="bg-[#111f30] px-2 py-1.5 border border-black flex items-center justify-between font-pixel text-[8px] text-slate-300">
            <span>TOTAL QUEST: {PORTFOLIO_DATA.projects.length} KARYA</span>
            <span className="text-yellow-400">KLIK KARTU UNTUK LIHAT DETAIL</span>
          </div>
        </div>
      </div>

      {/* Quest Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
};
