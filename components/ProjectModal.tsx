"use client";

import React from "react";
import { Project } from "@/data/portfolioData";
import { soundManager } from "./SoundManager";
import { PixelComputer, PixelGamepad, PixelPaintBrush, PixelDatabase, PixelChart } from "./PixelIcons";
import { X, ExternalLink, CheckCircle, Calendar, User, Wrench } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const renderIcon = () => {
    switch (project.icon) {
      case "chart":
        return <PixelChart className="w-12 h-12" />;
      case "database":
        return <PixelDatabase className="w-12 h-12" />;
      case "monitor":
        return <PixelComputer className="w-12 h-12" />;
      case "gamepad":
        return <PixelGamepad className="w-12 h-12" />;
      default:
        return <PixelDatabase className="w-12 h-12" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0f172a] border-4 border-black shadow-[8px_8px_0px_#000000] max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Window Header */}
        <div className="bg-[#ea580c] px-3 py-2 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-300 border border-black inline-block" />
            <h3 className="font-pixel text-[10px] md:text-xs text-white tracking-wider font-bold">
              QUEST_LOG: {project.id.toUpperCase()}
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playWindowClose();
              onClose();
            }}
            className="w-6 h-6 bg-[#991b1b] hover:bg-[#ef4444] text-white flex items-center justify-center border-2 border-black font-pixel text-xs active:translate-y-0.5"
            title="Tutup Jendela"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 md:p-6 bg-[#0a1622] overflow-y-auto space-y-4 text-slate-100 flex-1">
          {/* Top Info Banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-[#1e293b] p-3 border-2 border-black">
            <div className="p-2 bg-[#0e2235] border-2 border-black flex items-center justify-center">
              {renderIcon()}
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="inline-block bg-[#eab308] text-black font-pixel text-[8px] px-2 py-0.5 border border-black mb-1 font-bold">
                {project.category}
              </span>
              <h2 className="font-pixel text-sm md:text-base text-yellow-300 mb-1">
                {project.title}
              </h2>
              <p className="font-vt323 text-base text-cyan-300">{project.subtitle}</p>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-pixel text-[8px]">
            <div className="bg-[#111f30] p-2 border border-black flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-yellow-400" />
              <span>ROLE: {project.role}</span>
            </div>
            <div className="bg-[#111f30] p-2 border border-black flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-green-400" />
              <span>PERIODE: {project.period}</span>
            </div>
          </div>

          {/* Long Description */}
          <div className="bg-[#111f30] p-3 border-2 border-black space-y-2">
            <h4 className="font-pixel text-[9px] text-yellow-400 flex items-center gap-1.5">
              <span>📜</span>
              <span>DESKRIPSI PETUALANGAN & PROSES:</span>
            </h4>
            <div className="font-vt323 text-base md:text-lg text-slate-300 space-y-1.5 leading-snug">
              {project.longDescription.map((desc, idx) => (
                <p key={idx}>• {desc}</p>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="bg-[#111f30] p-3 border-2 border-black space-y-2">
            <h4 className="font-pixel text-[9px] text-green-400 flex items-center gap-1.5">
              <span>⭐</span>
              <span>PENCAPAIAN UTAMA (KEY HIGHLIGHTS):</span>
            </h4>
            <div className="space-y-1 font-pixel text-[8px] text-slate-200">
              {project.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#162a42] p-1.5 border border-black">
                  <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Inventory */}
          <div>
            <h4 className="font-pixel text-[9px] text-cyan-400 mb-1.5 flex items-center gap-1.5">
              <Wrench className="w-3 h-3 text-cyan-400" />
              <span>TOOLS & INVENTORI:</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((t, idx) => (
                <span
                  key={idx}
                  className="bg-[#1e3a5f] text-yellow-300 font-pixel text-[8px] px-2 py-1 border-2 border-black shadow-[2px_2px_0px_#000]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#0e2235] px-4 py-3 border-t-4 border-black flex items-center justify-end gap-2">
          <button
            onClick={() => {
              soundManager.playWindowClose();
              onClose();
            }}
            className="px-4 py-2 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  );
};
