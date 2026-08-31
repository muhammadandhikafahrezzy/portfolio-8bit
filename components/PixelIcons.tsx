import React from "react";

// Pixel Art SVGs with crispEdges for authentic 8-bit styling

export const PixelCoin: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ shapeRendering: "crispEdges" }}>
    <rect x="4" y="1" width="8" height="2" fill="#FACC15" />
    <rect x="2" y="3" width="12" height="2" fill="#FACC15" />
    <rect x="1" y="5" width="14" height="6" fill="#FACC15" />
    <rect x="2" y="11" width="12" height="2" fill="#FACC15" />
    <rect x="4" y="13" width="8" height="2" fill="#FACC15" />
    {/* Inner shadow & highlight */}
    <rect x="4" y="3" width="8" height="10" fill="#EAB308" />
    <rect x="5" y="4" width="2" height="8" fill="#FEF08A" />
    <rect x="9" y="4" width="2" height="8" fill="#CA8A04" />
    {/* Border */}
    <rect x="4" y="0" width="8" height="1" fill="#854D0E" />
    <rect x="4" y="15" width="8" height="1" fill="#854D0E" />
    <rect x="0" y="5" width="1" height="6" fill="#854D0E" />
    <rect x="15" y="5" width="1" height="6" fill="#854D0E" />
  </svg>
);

export const PixelKnight: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ shapeRendering: "crispEdges" }}>
    {/* Helmet / Hair */}
    <rect x="8" y="2" width="8" height="3" fill="#854D0E" />
    <rect x="7" y="4" width="10" height="3" fill="#A16207" />
    {/* Face */}
    <rect x="7" y="7" width="9" height="4" fill="#FED7AA" />
    <rect x="8" y="8" width="2" height="2" fill="#1E293B" />
    <rect x="13" y="8" width="2" height="2" fill="#1E293B" />
    {/* Body / Tunic */}
    <rect x="7" y="11" width="10" height="6" fill="#16A34A" />
    <rect x="9" y="14" width="6" height="2" fill="#854D0E" />
    <rect x="11" y="14" width="2" height="2" fill="#FACC15" />
    {/* Shield (Left) */}
    <rect x="3" y="10" width="4" height="6" fill="#0284C7" />
    <rect x="4" y="11" width="2" height="4" fill="#38BDF8" />
    <rect x="3" y="16" width="4" height="2" fill="#0369A1" />
    {/* Sword (Right) */}
    <rect x="17" y="7" width="2" height="7" fill="#E2E8F0" />
    <rect x="16" y="14" width="4" height="2" fill="#94A3B8" />
    <rect x="17" y="16" width="2" height="3" fill="#854D0E" />
    {/* Legs / Boots */}
    <rect x="8" y="17" width="3" height="4" fill="#065F46" />
    <rect x="13" y="17" width="3" height="4" fill="#065F46" />
    <rect x="7" y="21" width="4" height="2" fill="#78350F" />
    <rect x="13" y="21" width="4" height="2" fill="#78350F" />
  </svg>
);

export const PixelSlime: React.FC<{ className?: string; color?: "green" | "blue" }> = ({
  className = "w-8 h-8",
  color = "green",
}) => {
  const mainColor = color === "green" ? "#22C55E" : "#06B6D4";
  const lightColor = color === "green" ? "#86EFAC" : "#67E8F9";
  const darkColor = color === "green" ? "#15803D" : "#0E7490";

  return (
    <svg viewBox="0 0 16 16" className={className} style={{ shapeRendering: "crispEdges" }}>
      <rect x="5" y="3" width="6" height="2" fill={mainColor} />
      <rect x="3" y="5" width="10" height="2" fill={mainColor} />
      <rect x="2" y="7" width="12" height="5" fill={mainColor} />
      <rect x="1" y="10" width="14" height="4" fill={mainColor} />
      <rect x="2" y="14" width="12" height="2" fill={darkColor} />
      {/* Eyes */}
      <rect x="4" y="8" width="2" height="2" fill="#FFFFFF" />
      <rect x="5" y="8" width="1" height="2" fill="#0F172A" />
      <rect x="10" y="8" width="2" height="2" fill="#FFFFFF" />
      <rect x="11" y="8" width="1" height="2" fill="#0F172A" />
      {/* Shine highlight */}
      <rect x="4" y="5" width="2" height="2" fill={lightColor} />
    </svg>
  );
};

export const PixelBat: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ shapeRendering: "crispEdges" }}>
    {/* Wings */}
    <rect x="1" y="4" width="3" height="3" fill="#6366F1" />
    <rect x="2" y="7" width="3" height="3" fill="#4F46E5" />
    <rect x="12" y="4" width="3" height="3" fill="#6366F1" />
    <rect x="11" y="7" width="3" height="3" fill="#4F46E5" />
    {/* Body */}
    <rect x="6" y="5" width="4" height="6" fill="#312E81" />
    <rect x="5" y="3" width="2" height="3" fill="#4338CA" />
    <rect x="9" y="3" width="2" height="3" fill="#4338CA" />
    {/* Eyes */}
    <rect x="6" y="7" width="1" height="1" fill="#EF4444" />
    <rect x="9" y="7" width="1" height="1" fill="#EF4444" />
  </svg>
);

export const PixelDatabase: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ shapeRendering: "crispEdges" }}>
    <rect x="4" y="2" width="16" height="4" fill="#38BDF8" />
    <rect x="4" y="6" width="16" height="2" fill="#0284C7" />
    <rect x="4" y="9" width="16" height="4" fill="#38BDF8" />
    <rect x="4" y="13" width="16" height="2" fill="#0284C7" />
    <rect x="4" y="16" width="16" height="4" fill="#38BDF8" />
    <rect x="4" y="20" width="16" height="2" fill="#0284C7" />
    {/* Lights */}
    <rect x="16" y="3" width="2" height="2" fill="#22C55E" />
    <rect x="16" y="10" width="2" height="2" fill="#22C55E" />
    <rect x="16" y="17" width="2" height="2" fill="#22C55E" />
  </svg>
);

export const PixelChart: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ shapeRendering: "crispEdges" }}>
    {/* Axis */}
    <rect x="3" y="2" width="2" height="19" fill="#94A3B8" />
    <rect x="3" y="19" width="18" height="2" fill="#94A3B8" />
    {/* Bar 1 */}
    <rect x="7" y="12" width="3" height="7" fill="#38BDF8" />
    <rect x="7" y="11" width="3" height="1" fill="#0284C7" />
    {/* Bar 2 */}
    <rect x="12" y="7" width="3" height="12" fill="#FACC15" />
    <rect x="12" y="6" width="3" height="1" fill="#CA8A04" />
    {/* Bar 3 */}
    <rect x="17" y="4" width="3" height="15" fill="#22C55E" />
    <rect x="17" y="3" width="3" height="1" fill="#15803D" />
  </svg>
);

export const PixelComputer: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ shapeRendering: "crispEdges" }}>
    <rect x="3" y="2" width="18" height="13" fill="#0284C7" />
    <rect x="5" y="4" width="14" height="9" fill="#0369A1" />
    <rect x="7" y="6" width="3" height="3" fill="#38BDF8" />
    <rect x="11" y="6" width="6" height="2" fill="#F8FAFC" />
    <rect x="11" y="9" width="4" height="2" fill="#94A3B8" />
    {/* Stand */}
    <rect x="10" y="15" width="4" height="4" fill="#0F172A" />
    <rect x="6" y="19" width="12" height="2" fill="#1E293B" />
  </svg>
);

export const PixelGamepad: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ shapeRendering: "crispEdges" }}>
    <rect x="3" y="6" width="18" height="11" fill="#E2E8F0" />
    <rect x="2" y="8" width="20" height="7" fill="#CBD5E1" />
    {/* D-Pad */}
    <rect x="6" y="9" width="2" height="6" fill="#1E293B" />
    <rect x="4" y="11" width="6" height="2" fill="#1E293B" />
    {/* Buttons */}
    <rect x="16" y="9" width="2" height="2" fill="#EF4444" />
    <rect x="18" y="11" width="2" height="2" fill="#3B82F6" />
    <rect x="14" y="11" width="2" height="2" fill="#EAB308" />
    <rect x="16" y="13" width="2" height="2" fill="#22C55E" />
  </svg>
);

export const PixelPaintBrush: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ shapeRendering: "crispEdges" }}>
    {/* Handle */}
    <rect x="15" y="3" width="5" height="5" fill="#854D0E" />
    <rect x="11" y="7" width="5" height="5" fill="#A16207" />
    {/* Ferrule */}
    <rect x="7" y="11" width="5" height="5" fill="#94A3B8" />
    {/* Bristles / Tip */}
    <rect x="3" y="15" width="5" height="5" fill="#EAB308" />
    <rect x="2" y="18" width="3" height="4" fill="#CA8A04" />
  </svg>
);

export const PixelMailbox: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ shapeRendering: "crispEdges" }}>
    {/* Post */}
    <rect x="10" y="14" width="4" height="10" fill="#78350F" />
    {/* Box Body */}
    <rect x="4" y="6" width="14" height="8" fill="#CBD5E1" />
    <rect x="4" y="4" width="12" height="3" fill="#94A3B8" />
    <rect x="6" y="7" width="10" height="5" fill="#475569" />
    {/* Envelope inside */}
    <rect x="7" y="8" width="8" height="4" fill="#FFFFFF" />
    <rect x="8" y="9" width="6" height="2" fill="#E2E8F0" />
    {/* Red Flag */}
    <rect x="16" y="2" width="4" height="3" fill="#EF4444" />
    <rect x="16" y="4" width="2" height="5" fill="#B91C1C" />
  </svg>
);

export const PixelWarpPipe: React.FC<{ className?: string }> = ({ className = "w-16 h-20" }) => (
  <svg viewBox="0 0 24 32" className={className} style={{ shapeRendering: "crispEdges" }}>
    {/* Pipe Lip */}
    <rect x="1" y="2" width="22" height="8" fill="#16A34A" />
    <rect x="3" y="4" width="4" height="4" fill="#4ADE80" />
    <rect x="17" y="4" width="4" height="4" fill="#15803D" />
    <rect x="0" y="1" width="24" height="1" fill="#000000" />
    <rect x="0" y="10" width="24" height="1" fill="#000000" />
    <rect x="0" y="2" width="1" height="8" fill="#000000" />
    <rect x="23" y="2" width="1" height="8" fill="#000000" />
    {/* Pipe Shaft */}
    <rect x="3" y="11" width="18" height="21" fill="#16A34A" />
    <rect x="5" y="11" width="3" height="21" fill="#4ADE80" />
    <rect x="16" y="11" width="3" height="21" fill="#15803D" />
    <rect x="2" y="11" width="1" height="21" fill="#000000" />
    <rect x="21" y="11" width="1" height="21" fill="#000000" />
  </svg>
);
