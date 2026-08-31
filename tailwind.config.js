/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        vt323: ["var(--font-vt323)", "monospace"],
        silkscreen: ["var(--font-silkscreen)", "monospace"],
      },
      colors: {
        retro: {
          bg: "#09141f",
          dark: "#050b12",
          panel: "#0e2235",
          panelBorder: "#1e3a5f",
          accent: "#38bdf8",
          orange: "#ea580c",
          orangeBorder: "#9a3412",
          gold: "#eab308",
          goldLight: "#fef08a",
          green: "#22c55e",
          greenDark: "#15803d",
          red: "#ef4444",
          redDark: "#991b1b",
          cream: "#fef3c7",
          text: "#f8fafc",
          muted: "#94a3b8",
        },
      },
      boxShadow: {
        pixel: "4px 4px 0px #000000",
        pixelLg: "6px 6px 0px #000000",
        pixelSm: "2px 2px 0px #000000",
        pixelOrange: "4px 4px 0px #7c2d12",
        pixelCyan: "4px 4px 0px #0369a1",
        pixelGold: "4px 4px 0px #854d0e",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        floatSlow: "floatSlow 5s ease-in-out infinite",
        bouncePixel: "bouncePixel 0.6s infinite alternate",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        coinSpin: "coinSpin 1s steps(4) infinite",
        slimeWobble: "slimeWobble 0.8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        bouncePixel: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        slimeWobble: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.15, 0.85)" },
        },
      },
    },
  },
  plugins: [],
};
