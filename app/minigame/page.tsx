"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { soundManager } from "@/components/SoundManager";
import { PixelKnight, PixelCoin, PixelSlime, PixelBat } from "@/components/PixelIcons";
import confetti from "canvas-confetti";
import { Gamepad2, Trophy, RotateCcw, ArrowRight, Play, Sparkles } from "lucide-react";

interface GameObject {
  id: number;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  type: "coin" | "dataCrystal" | "bug";
  speed: number;
}

export default function MinigamePage() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [playerX, setPlayerX] = useState<number>(50); // percentage
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [items, setItems] = useState<GameObject[]>([]);
  const nextId = useRef(1);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const itemSpawnerRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setPlayerX((prev) => Math.max(prev - 6, 5));
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setPlayerX((prev) => Math.min(prev + 6, 95));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  // Start game
  const startGame = () => {
    soundManager.playLevelUp();
    setGameState("playing");
    setScore(0);
    setItems([]);
    setPlayerX(50);
  };

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (itemSpawnerRef.current) clearInterval(itemSpawnerRef.current);
      return;
    }

    // Spawn falling items
    itemSpawnerRef.current = setInterval(() => {
      const isBug = Math.random() < 0.25;
      const isCrystal = Math.random() > 0.6;
      const newItem: GameObject = {
        id: nextId.current++,
        x: Math.floor(Math.random() * 85) + 5,
        y: 0,
        type: isBug ? "bug" : isCrystal ? "dataCrystal" : "coin",
        speed: Math.random() * 2 + 2.5,
      };
      setItems((prev) => [...prev, newItem]);
    }, 900);

    // Update positions and collision
    gameLoopRef.current = setInterval(() => {
      setItems((prevItems) => {
        const nextItems: GameObject[] = [];
        for (const item of prevItems) {
          const nextY = item.y + item.speed;

          // Check collision with player at bottom (y around 80-92)
          if (nextY >= 80 && nextY <= 92 && Math.abs(item.x - playerX) < 10) {
            if (item.type === "bug") {
              // Game Over
              soundManager.playBeep(200, 0.3);
              setGameState("gameover");
              return [];
            } else {
              // Collect score
              soundManager.playCoin();
              const pts = item.type === "dataCrystal" ? 250 : 100;
              setScore((s) => {
                const newScore = s + pts;
                if (newScore > highScore) setHighScore(newScore);
                if (newScore > 0 && newScore % 1000 === 0) {
                  try {
                    confetti({ particleCount: 40, spread: 60 });
                  } catch {}
                }
                return newScore;
              });
            }
          } else if (nextY < 100) {
            nextItems.push({ ...item, y: nextY });
          }
        }
        return nextItems;
      });
    }, 50);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (itemSpawnerRef.current) clearInterval(itemSpawnerRef.current);
    };
  }, [gameState, playerX, highScore]);

  return (
    <div className="py-6 px-3 md:px-6 max-w-7xl mx-auto w-full space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-4 border-black shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#9333ea] px-3 py-2 flex items-center justify-between border-b-4 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-300 border border-black inline-block" />
            <h1 className="font-pixel text-[11px] md:text-sm text-white tracking-wider font-bold">
              BONUS STAGE: DATA_COIN_COLLECTOR_ARCADE.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[10px]">
            <span className="w-5 h-5 bg-[#7e22ce] text-white flex items-center justify-center border-2 border-black">
              _
            </span>
            <span className="w-5 h-5 bg-[#7e22ce] text-white flex items-center justify-center border-2 border-black">
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
          {/* Arcade Score Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#111f30] p-4 border-4 border-black">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
              <div>
                <span className="font-pixel text-[8px] text-purple-300 block">MINIGAME 8-BIT</span>
                <span className="font-pixel text-xs text-white">DATA RUNNER</span>
              </div>
            </div>

            <div className="flex items-center gap-4 font-pixel text-xs">
              <div className="bg-[#0a1622] px-3 py-1.5 border-2 border-black text-yellow-400">
                SCORE: {score.toString().padStart(5, "0")}
              </div>
              <div className="bg-[#0a1622] px-3 py-1.5 border-2 border-black text-green-400 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                <span>HIGH: {highScore.toString().padStart(5, "0")}</span>
              </div>
            </div>
          </div>

          {/* Arcade Game Canvas Stage */}
          <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81] border-4 border-black h-[380px] md:h-[440px] overflow-hidden select-none">
            {/* Grid scanline background */}
            <div className="absolute inset-0 retro-grid-bg opacity-40 pointer-events-none" />

            {/* Falling Items */}
            {items.map((item) => (
              <div
                key={item.id}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
              >
                {item.type === "coin" && <PixelCoin className="w-6 h-6 animate-spin" />}
                {item.type === "dataCrystal" && (
                  <div className="w-6 h-6 bg-cyan-400 border-2 border-black rotate-45 flex items-center justify-center font-pixel text-[8px] text-black font-bold">
                    SQL
                  </div>
                )}
                {item.type === "bug" && <PixelSlime className="w-7 h-7" color="blue" />}
              </div>
            ))}

            {/* Playable Character Sprite at Bottom */}
            <div
              style={{ left: `${playerX}%` }}
              className="absolute bottom-6 -translate-x-1/2 transition-all duration-75 flex flex-col items-center"
            >
              <PixelKnight className="w-12 h-12 md:w-14 md:h-14 drop-shadow-[2px_2px_0px_#000]" />
              <div className="w-10 h-2 bg-black/50 rounded-full" />
            </div>

            {/* Platform Floor */}
            <div className="absolute bottom-0 inset-x-0 h-4 bg-[#854d0e] border-t-2 border-black" />

            {/* Start Screen Overlay */}
            {gameState === "idle" && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-4">
                <h2 className="font-pixel text-lg md:text-2xl text-yellow-400">
                  DATA COIN RUNNER
                </h2>
                <p className="font-vt323 text-lg md:text-xl text-slate-200 max-w-md">
                  Kumpulkan Koin Emas (+100 PTS) & Kristal Data SQL (+250 PTS), hindari Glitch Slime Bug!
                </p>
                <div className="font-pixel text-[8px] text-cyan-300">
                  Gunakan tombol panah ◀ ▶ pada keyboard atau tombol layar sentuh.
                </div>
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-black font-pixel text-xs border-4 border-black shadow-[4px_4px_0px_#000] active:translate-y-1 font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>MULAI BERMAIN</span>
                </button>
              </div>
            )}

            {/* Game Over Screen Overlay */}
            {gameState === "gameover" && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-3">
                <h2 className="font-pixel text-2xl text-red-500">GAME OVER!</h2>
                <p className="font-pixel text-xs text-yellow-400">
                  SKOR ANDA: {score} POIN
                </p>
                <p className="font-vt323 text-lg text-slate-300">
                  Bug sistem berhasil dihindari lain kali!
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-[#eab308] hover:bg-[#ca8a04] text-black font-pixel text-xs border-4 border-black shadow-[4px_4px_0px_#000] active:translate-y-1 font-bold flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>MAIN LAGI</span>
                </button>
              </div>
            )}
          </div>

          {/* On-Screen Mobile D-Pad Controls */}
          {gameState === "playing" && (
            <div className="flex justify-center gap-6 pt-2">
              <button
                onClick={() => setPlayerX((prev) => Math.max(prev - 8, 5))}
                className="w-16 h-14 bg-[#1e3a5f] hover:bg-[#2563eb] active:scale-95 text-white font-pixel text-lg border-4 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center cursor-pointer"
              >
                ◀
              </button>
              <button
                onClick={() => setPlayerX((prev) => Math.min(prev + 8, 95))}
                className="w-16 h-14 bg-[#1e3a5f] hover:bg-[#2563eb] active:scale-95 text-white font-pixel text-lg border-4 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center cursor-pointer"
              >
                ▶
              </button>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-slate-700">
            <Link
              href="/certificates"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2.5 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              ◀ KEMBALI KE SERTIFIKAT
            </Link>

            <Link
              href="/contact"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0f766e] text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center gap-1.5"
            >
              <span>LANJUT KE KOTAK SURAT KONTAK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
