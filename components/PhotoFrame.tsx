import React from "react";
import Image from "next/image";

interface PhotoFrameProps {
  src?: string;
  alt?: string;
  className?: string;
  caption?: string;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src = "/Gemini_Generated_Image_3mneq83mneq83mne.jpg",
  alt = "Muhammad Andhika Fahrezzy - Data Analyst",
  className = "w-48 h-48 md:w-56 md:h-56",
  caption = "ANDHIKA.PNG",
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* 8-Bit Outer Bevel Frame */}
      <div className="bg-[#1e293b] p-2 border-4 border-black shadow-[6px_6px_0px_#000000] relative group">
        {/* Pixel Corner Decorations */}
        <span className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 border border-black z-20" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 border border-black z-20" />
        <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 border border-black z-20" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-yellow-400 border border-black z-20" />

        {/* Photo Container with subtle CRT scanline effect */}
        <div className={`relative overflow-hidden border-2 border-black bg-slate-900 ${className}`}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none opacity-40" />
        </div>

        {/* Frame Label */}
        {caption && (
          <div className="bg-[#0f172a] border-t-2 border-black mt-1.5 py-0.5 px-2 text-center">
            <span className="font-pixel text-[8px] text-yellow-300 tracking-wider">
              {caption}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
