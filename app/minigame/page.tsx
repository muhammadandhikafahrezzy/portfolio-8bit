"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { soundManager } from "@/components/SoundManager";
import confetti from "canvas-confetti";
import {
  Trophy,
  RotateCcw,
  Play,
  Heart,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  Shield,
  Zap,
} from "lucide-react";

// DATA LABYRINTH MAZE (19 cols x 21 rows)
// 0: Empty path
// 1: Neon Maze Wall
// 2: Golden Data Bit (+10)
// 3: Power Insight Crystal (+50)
// 4: Snake Gate
// 5: Snake Nest Inside
// 6: Warp Tunnel
const MAZE_TEMPLATE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
  [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 4, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [6, 0, 0, 0, 2, 0, 0, 1, 5, 5, 5, 1, 0, 0, 2, 0, 0, 0, 6],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 3, 2, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1, 2, 3, 1],
  [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const COLS = 19;
const ROWS = 21;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | "NONE";

interface SnakeEnemy {
  id: string;
  name: string;
  species: string;
  color: string;
  headColor: string;
  x: number;
  y: number;
  dir: Direction;
  speed: number;
  mode: "chase" | "frightened" | "eaten";
  nest: boolean;
  spawnX: number;
  spawnY: number;
  wiggle: number;
}

export default function AndhikaSnakeLabyrinthPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover" | "victory">("idle");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(12500);
  const [lives, setLives] = useState<number>(3);
  const [powerTimer, setPowerTimer] = useState<number>(0);
  const [bitsLeft, setBitsLeft] = useState<number>(0);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);

  // Load High Score
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("andhika_snake_high_score");
      if (saved) setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Web Audio Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const chompToggle = useRef<boolean>(false);

  const initAudio = () => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) audioCtxRef.current = new AudioCtx();
    }
  };

  const playTone = (freq: number, type: OscillatorType, duration: number, vol = 0.08) => {
    if (audioMuted) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  };

  const playCollectBitSound = () => {
    chompToggle.current = !chompToggle.current;
    playTone(chompToggle.current ? 440 : 580, "triangle", 0.07, 0.06);
  };

  const playPowerCrystalSound = () => {
    playTone(659, "square", 0.15, 0.09);
    setTimeout(() => playTone(880, "square", 0.2, 0.09), 90);
    setTimeout(() => playTone(1174, "square", 0.25, 0.1), 180);
  };

  const playDefeatSnakeSound = () => {
    playTone(900, "sine", 0.2, 0.12);
    setTimeout(() => playTone(1200, "sine", 0.25, 0.12), 80);
  };

  const playHurtSound = () => {
    [480, 380, 280, 180, 90].forEach((f, i) => {
      setTimeout(() => playTone(f, "sawtooth", 0.1, 0.12), i * 70);
    });
  };

  // Game Engine Ref
  const engineRef = useRef({
    grid: MAZE_TEMPLATE.map((row) => [...row]),
    player: {
      x: 9,
      y: 16,
      dir: "NONE" as Direction,
      nextDir: "NONE" as Direction,
      facing: "RIGHT" as "LEFT" | "RIGHT" | "UP" | "DOWN",
      animStep: 0,
      speed: 0.092,
    },
    snakes: [
      {
        id: "red_viper",
        name: "VIPER",
        species: "NULL_POINTER",
        color: "#dc2626",
        headColor: "#ef4444",
        x: 9.5,
        y: 8,
        dir: "LEFT" as Direction,
        speed: 0.076,
        mode: "chase" as const,
        nest: false,
        spawnX: 9.5,
        spawnY: 8,
        wiggle: 0,
      },
      {
        id: "pink_cobra",
        name: "COBRA",
        species: "MEMORY_LEAK",
        color: "#db2777",
        headColor: "#f472b6",
        x: 8.5,
        y: 10,
        dir: "UP" as Direction,
        speed: 0.07,
        mode: "chase" as const,
        nest: true,
        spawnX: 8.5,
        spawnY: 10,
        wiggle: 0.5,
      },
      {
        id: "cyan_python",
        name: "PYTHON",
        species: "SYNTAX_BUG",
        color: "#0284c7",
        headColor: "#38bdf8",
        x: 9.5,
        y: 10,
        dir: "UP" as Direction,
        speed: 0.068,
        mode: "chase" as const,
        nest: true,
        spawnX: 9.5,
        spawnY: 10,
        wiggle: 1.0,
      },
      {
        id: "orange_mamba",
        name: "MAMBA",
        species: "DIRTY_DATA",
        color: "#ea580c",
        headColor: "#fb923c",
        x: 10.5,
        y: 10,
        dir: "UP" as Direction,
        speed: 0.065,
        mode: "chase" as const,
        nest: true,
        spawnX: 10.5,
        spawnY: 10,
        wiggle: 1.5,
      },
    ] as SnakeEnemy[],
    powerTime: 0,
    snakesDefeatedCombo: 0,
    frameCount: 0,
  });

  const countBits = (grid: number[][]) => {
    let count = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c] === 2 || grid[r][c] === 3) count++;
      }
    }
    return count;
  };

  // Start / Restart Game
  const startGame = useCallback(() => {
    initAudio();
    soundManager.playLevelUp();
    const newGrid = MAZE_TEMPLATE.map((row) => [...row]);
    const total = countBits(newGrid);

    engineRef.current.grid = newGrid;
    engineRef.current.player = {
      x: 9,
      y: 16,
      dir: "NONE",
      nextDir: "NONE",
      facing: "RIGHT",
      animStep: 0,
      speed: 0.092,
    };
    engineRef.current.snakes.forEach((s) => {
      s.x = s.spawnX;
      s.y = s.spawnY;
      s.mode = "chase";
      s.nest = s.id !== "red_viper";
      s.dir = s.id === "red_viper" ? "LEFT" : "UP";
    });
    engineRef.current.powerTime = 0;
    engineRef.current.snakesDefeatedCombo = 0;

    setScore(0);
    setLives(3);
    setBitsLeft(total);
    setGameState("playing");
  }, []);

  const setNextDirection = (dir: Direction) => {
    engineRef.current.player.nextDir = dir;
    if (gameState === "idle") startGame();
  };

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          setNextDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          setNextDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          setNextDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          setNextDirection("RIGHT");
          break;
        case " ":
          if (gameState !== "playing") startGame();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, startGame]);

  // Touch Swipe for Mobile
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartPos.current.x;
    const dy = touch.clientY - touchStartPos.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) > 20) {
      if (absX > absY) {
        setNextDirection(dx > 0 ? "RIGHT" : "LEFT");
      } else {
        setNextDirection(dy > 0 ? "DOWN" : "UP");
      }
    }
    touchStartPos.current = null;
  };

  // Wall collisions
  const isWall = (x: number, y: number, allowGate = false) => {
    const col = Math.floor(x);
    const row = Math.floor(y);
    if (row < 0 || row >= ROWS) return true;
    if (col < 0 || col >= COLS) return false; // Tunnel
    const cell = engineRef.current.grid[row][col];
    if (cell === 1) return true;
    if (cell === 4 && !allowGate) return true;
    return false;
  };

  const canMove = (x: number, y: number, dir: Direction, allowGate = false) => {
    const offset = 0.45;
    let targetX = x;
    let targetY = y;

    if (dir === "UP") targetY -= offset;
    if (dir === "DOWN") targetY += offset;
    if (dir === "LEFT") targetX -= offset;
    if (dir === "RIGHT") targetX += offset;

    return !isWall(targetX, targetY, allowGate);
  };

  // Main Game Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    let animId: number;

    const gameLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const engine = engineRef.current;
      const player = engine.player;
      const snakes = engine.snakes;
      const grid = engine.grid;
      engine.frameCount++;

      // --- 1. UPDATE PLAYER (ANDHIKA KNIGHT) ---
      const isAlignedX = Math.abs(player.x - Math.round(player.x)) < 0.15;
      const isAlignedY = Math.abs(player.y - Math.round(player.y)) < 0.15;

      if (player.nextDir !== "NONE" && isAlignedX && isAlignedY) {
        if (canMove(Math.round(player.x), Math.round(player.y), player.nextDir)) {
          player.x = Math.round(player.x);
          player.y = Math.round(player.y);
          player.dir = player.nextDir;
          player.facing = player.nextDir as "LEFT" | "RIGHT" | "UP" | "DOWN";
          player.nextDir = "NONE";
        }
      }

      // Move player
      if (canMove(player.x, player.y, player.dir)) {
        if (player.dir === "UP") player.y -= player.speed;
        if (player.dir === "DOWN") player.y += player.speed;
        if (player.dir === "LEFT") player.x -= player.speed;
        if (player.dir === "RIGHT") player.x += player.speed;
        player.animStep = (player.animStep + 0.2) % 4;
      }

      // Tunnel Wrap
      if (player.x < -0.5) player.x = COLS - 0.5;
      if (player.x > COLS - 0.5) player.x = -0.5;

      // Collect Data Bits & Insight Crystals
      const pCol = Math.round(player.x);
      const pRow = Math.round(player.y);

      if (pRow >= 0 && pRow < ROWS && pCol >= 0 && pCol < COLS) {
        const cell = grid[pRow][pCol];
        if (cell === 2) {
          grid[pRow][pCol] = 0;
          setScore((prev) => {
            const next = prev + 10;
            if (next > highScore) {
              setHighScore(next);
              if (typeof window !== "undefined")
                localStorage.setItem("andhika_snake_high_score", next.toString());
            }
            return next;
          });
          playCollectBitSound();
          setBitsLeft((prev) => {
            const next = prev - 1;
            if (next <= 0) {
              setGameState("victory");
              confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
              soundManager.playVictory();
            }
            return next;
          });
        } else if (cell === 3) {
          grid[pRow][pCol] = 0;
          setScore((prev) => prev + 50);
          playPowerCrystalSound();
          engine.powerTime = 420; // ~7 seconds
          engine.snakesDefeatedCombo = 0;
          snakes.forEach((s) => {
            if (s.mode !== "eaten") s.mode = "frightened";
          });
          setBitsLeft((prev) => prev - 1);
        }
      }

      // Power Timer
      if (engine.powerTime > 0) {
        engine.powerTime--;
        setPowerTimer(engine.powerTime);
        if (engine.powerTime === 0) {
          snakes.forEach((s) => {
            if (s.mode === "frightened") s.mode = "chase";
          });
        }
      }

      // --- 2. UPDATE SNAKES (ULER MONSTERS) ---
      const possibleDirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
      const oppositeDir: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
        NONE: "NONE",
      };

      snakes.forEach((s) => {
        s.wiggle += 0.2;

        if (s.nest) {
          s.y -= 0.03;
          if (s.y <= 8.5) {
            s.nest = false;
            s.y = 8;
            s.dir = "LEFT";
          }
          return;
        }

        if (s.mode === "eaten") {
          const dx = s.spawnX - s.x;
          const dy = s.spawnY - s.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.5) {
            s.mode = "chase";
            s.x = s.spawnX;
            s.y = s.spawnY;
          } else {
            s.x += (dx / dist) * 0.12;
            s.y += (dy / dist) * 0.12;
          }
          return;
        }

        const sAlignedX = Math.abs(s.x - Math.round(s.x)) < 0.12;
        const sAlignedY = Math.abs(s.y - Math.round(s.y)) < 0.12;

        if (sAlignedX && sAlignedY) {
          s.x = Math.round(s.x);
          s.y = Math.round(s.y);

          const validDirs = possibleDirs.filter(
            (d) => d !== oppositeDir[s.dir] && canMove(s.x, s.y, d, false)
          );

          if (validDirs.length > 0) {
            if (s.mode === "frightened") {
              s.dir = validDirs[Math.floor(Math.random() * validDirs.length)];
            } else {
              let targetX = player.x;
              let targetY = player.y;

              if (s.id === "pink_cobra") {
                if (player.dir === "UP") targetY -= 3;
                if (player.dir === "DOWN") targetY += 3;
                if (player.dir === "LEFT") targetX -= 3;
                if (player.dir === "RIGHT") targetX += 3;
              } else if (s.id === "orange_mamba") {
                const dist = Math.hypot(s.x - player.x, s.y - player.y);
                if (dist < 4) {
                  targetX = 1;
                  targetY = 19;
                }
              }

              let bestDir = validDirs[0];
              let minDist = Infinity;

              validDirs.forEach((d) => {
                let testX = s.x;
                let testY = s.y;
                if (d === "UP") testY -= 1;
                if (d === "DOWN") testY += 1;
                if (d === "LEFT") testX -= 1;
                if (d === "RIGHT") testX += 1;

                const dist = Math.hypot(testX - targetX, testY - targetY);
                if (dist < minDist) {
                  minDist = dist;
                  bestDir = d;
                }
              });

              s.dir = bestDir;
            }
          } else if (canMove(s.x, s.y, oppositeDir[s.dir])) {
            s.dir = oppositeDir[s.dir];
          }
        }

        const curSpeed = s.mode === "frightened" ? s.speed * 0.55 : s.speed;
        if (s.dir === "UP") s.y -= curSpeed;
        if (s.dir === "DOWN") s.y += curSpeed;
        if (s.dir === "LEFT") s.x -= curSpeed;
        if (s.dir === "RIGHT") s.x += curSpeed;

        if (s.x < -0.5) s.x = COLS - 0.5;
        if (s.x > COLS - 0.5) s.x = -0.5;

        // Collision with player
        const distToPlayer = Math.hypot(s.x - player.x, s.y - player.y);
        if (distToPlayer < 0.65) {
          if (s.mode === "frightened") {
            // Defeat Snake!
            s.mode = "eaten";
            engine.snakesDefeatedCombo++;
            const bonus = 200 * Math.pow(2, engine.snakesDefeatedCombo - 1);
            setScore((prev) => prev + bonus);
            playDefeatSnakeSound();
          } else if (s.mode === "chase") {
            // Player hit by Snake!
            playHurtSound();
            setLives((prev) => {
              const next = prev - 1;
              if (next <= 0) {
                setGameState("gameover");
                soundManager.playDeath();
              } else {
                player.x = 9;
                player.y = 16;
                player.dir = "NONE";
                player.nextDir = "NONE";
                snakes.forEach((snk) => {
                  snk.x = snk.spawnX;
                  snk.y = snk.spawnY;
                  snk.mode = "chase";
                  snk.nest = snk.id !== "red_viper";
                  snk.dir = snk.id === "red_viper" ? "LEFT" : "UP";
                });
              }
              return next;
            });
          }
        }
      });

      // --- 3. RENDER CANVAS (8-BIT PIXEL ART) ---
      ctx.fillStyle = "#0a1120";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cellW = canvas.width / COLS;
      const cellH = canvas.height / ROWS;

      // Draw Maze Walls & Data Bits
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = grid[r][c];
          const px = c * cellW;
          const py = r * cellH;

          if (cell === 1) {
            // Neon Tech Labyrinth Wall
            ctx.fillStyle = "#1e3a8a";
            ctx.fillRect(px, py, cellW, cellH);
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(px + 2, py + 2, cellW - 4, cellH - 4);
          } else if (cell === 4) {
            // Snake Nest Gate
            ctx.fillStyle = "#fb923c";
            ctx.fillRect(px, py + cellH / 2 - 2, cellW, 4);
          } else if (cell === 2) {
            // Golden Data Bit (Square pixel coin)
            ctx.fillStyle = "#facc15";
            ctx.fillRect(px + cellW * 0.35, py + cellH * 0.35, cellW * 0.3, cellH * 0.3);
            ctx.fillStyle = "#fef08a";
            ctx.fillRect(px + cellW * 0.35, py + cellH * 0.35, cellW * 0.1, cellH * 0.1);
          } else if (cell === 3) {
            // Power Insight Crystal (Pulsing Diamond Gem)
            const pulse = (Math.sin(Date.now() / 120) + 1) / 2;
            const size = cellW * (0.35 + pulse * 0.1);
            const cx = px + cellW / 2;
            const cy = py + cellH / 2;

            ctx.fillStyle = pulse > 0.4 ? "#38bdf8" : "#818cf8";
            ctx.beginPath();
            ctx.moveTo(cx, cy - size);
            ctx.lineTo(cx + size, cy);
            ctx.lineTo(cx, cy + size);
            ctx.lineTo(cx - size, cy);
            ctx.closePath();
            ctx.fill();

            // Gem shine
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(cx - 1, cy - size * 0.5, 2, 2);
          }
        }
      }

      // --- 4. DRAW PLAYER: ANDHIKA KNIGHT (GREEN TUNIC) ---
      const pX = (player.x + 0.5) * cellW;
      const pY = (player.y + 0.5) * cellH;
      const pHeroSize = cellW * 0.95;

      ctx.save();
      ctx.translate(pX, pY);

      // Power Crystal Golden Aura
      if (engine.powerTime > 0) {
        ctx.fillStyle = engine.frameCount % 4 < 2 ? "rgba(250, 204, 21, 0.4)" : "rgba(56, 189, 248, 0.4)";
        ctx.beginPath();
        ctx.arc(0, 0, pHeroSize * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      // If moving left, flip sprite
      if (player.facing === "LEFT") {
        ctx.scale(-1, 1);
      }

      const s = pHeroSize / 24; // Scale relative to 24x24 pixel grid

      // 1. Hair / Brown Cap (x: -4..4, y: -10..-7)
      ctx.fillStyle = "#854d0e";
      ctx.fillRect(-4 * s, -11 * s, 8 * s, 3 * s);
      ctx.fillStyle = "#a16207";
      ctx.fillRect(-5 * s, -9 * s, 10 * s, 3 * s);

      // 2. Face & Eyes
      ctx.fillStyle = "#fed7aa";
      ctx.fillRect(-5 * s, -6 * s, 9 * s, 4 * s);
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(-2 * s, -5 * s, 2 * s, 2 * s);
      ctx.fillRect(2 * s, -5 * s, 2 * s, 2 * s);

      // 3. Green Tunic Body
      ctx.fillStyle = "#16a34a";
      ctx.fillRect(-5 * s, -2 * s, 10 * s, 6 * s);

      // 4. Brown Belt with Gold Buckle
      ctx.fillStyle = "#854d0e";
      ctx.fillRect(-5 * s, 1 * s, 10 * s, 2 * s);
      ctx.fillStyle = "#facc15";
      ctx.fillRect(-1 * s, 1 * s, 2 * s, 2 * s);

      // 5. Shield (Left side)
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(-8 * s, -2 * s, 3 * s, 6 * s);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(-7 * s, -1 * s, 2 * s, 4 * s);

      // 6. Sword (Right side)
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(5 * s, -6 * s, 2 * s, 8 * s);
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(4 * s, 2 * s, 4 * s, 2 * s);

      // 7. Boots (Animated step)
      const legOffset = Math.sin(player.animStep * Math.PI) * 2 * s;
      ctx.fillStyle = "#78350f";
      ctx.fillRect(-4 * s, 5 * s + legOffset, 3 * s, 4 * s);
      ctx.fillRect(1 * s, 5 * s - legOffset, 3 * s, 4 * s);

      ctx.restore();

      // --- 5. DRAW SNAKES (ULER 8-BIT) ---
      snakes.forEach((snk) => {
        const sPx = (snk.x + 0.5) * cellW;
        const sPy = (snk.y + 0.5) * cellH;
        const sScale = cellW * 0.44;

        ctx.save();
        ctx.translate(sPx, sPy);

        if (snk.mode === "eaten") {
          // Defeated Snake Spirit (Slithering Eyes)
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-sScale * 0.35, -sScale * 0.2, sScale * 0.3, 0, Math.PI * 2);
          ctx.arc(sScale * 0.35, -sScale * 0.2, sScale * 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#3b82f6";
          ctx.beginPath();
          ctx.arc(-sScale * 0.35, -sScale * 0.2, sScale * 0.15, 0, Math.PI * 2);
          ctx.arc(sScale * 0.35, -sScale * 0.2, sScale * 0.15, 0, Math.PI * 2);
          ctx.fill();
        } else {
          let sBodyCol = snk.color;
          let sHeadCol = snk.headColor;

          if (snk.mode === "frightened") {
            const isFlash = engine.powerTime < 80 && Math.floor(engine.powerTime / 10) % 2 === 0;
            sBodyCol = isFlash ? "#ffffff" : "#1e40af";
            sHeadCol = isFlash ? "#93c5fd" : "#3b82f6";
          }

          // Draw 4 Slithering Snake Segments
          const wiggleAmp = Math.sin(snk.wiggle) * (sScale * 0.35);

          // Tail segment
          ctx.fillStyle = sBodyCol;
          ctx.beginPath();
          ctx.arc(-wiggleAmp * 0.8, sScale * 0.7, sScale * 0.35, 0, Math.PI * 2);
          ctx.fill();

          // Middle body segment
          ctx.fillStyle = sHeadCol;
          ctx.beginPath();
          ctx.arc(wiggleAmp * 0.6, sScale * 0.25, sScale * 0.5, 0, Math.PI * 2);
          ctx.fill();

          // Snake Head (Oval / Rounded rectangle)
          ctx.fillStyle = sBodyCol;
          ctx.beginPath();
          ctx.arc(0, -sScale * 0.2, sScale * 0.75, 0, Math.PI * 2);
          ctx.fill();

          // Snake Scales / Crown Pattern
          ctx.fillStyle = sHeadCol;
          ctx.fillRect(-sScale * 0.3, -sScale * 0.5, sScale * 0.6, sScale * 0.3);

          // Snake Eyes (Angry / Slit pupils or scared dizzy eyes)
          if (snk.mode === "frightened") {
            // Dizzy X eyes
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(-sScale * 0.35, -sScale * 0.25, sScale * 0.25, 0, Math.PI * 2);
            ctx.arc(sScale * 0.35, -sScale * 0.25, sScale * 0.25, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 1.5;
            // X on left
            ctx.beginPath();
            ctx.moveTo(-sScale * 0.45, -sScale * 0.35);
            ctx.lineTo(-sScale * 0.25, -sScale * 0.15);
            ctx.moveTo(-sScale * 0.25, -sScale * 0.35);
            ctx.lineTo(-sScale * 0.45, -sScale * 0.15);
            // X on right
            ctx.moveTo(sScale * 0.25, -sScale * 0.35);
            ctx.lineTo(sScale * 0.45, -sScale * 0.15);
            ctx.moveTo(sScale * 0.45, -sScale * 0.35);
            ctx.lineTo(sScale * 0.25, -sScale * 0.15);
            ctx.stroke();
          } else {
            // Slit Predator Eyes
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(-sScale * 0.35, -sScale * 0.25, sScale * 0.25, 0, Math.PI * 2);
            ctx.arc(sScale * 0.35, -sScale * 0.25, sScale * 0.25, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#000000";
            ctx.fillRect(-sScale * 0.38, -sScale * 0.35, sScale * 0.1, sScale * 0.22);
            ctx.fillRect(sScale * 0.28, -sScale * 0.35, sScale * 0.1, sScale * 0.22);

            // Flicking Red Forked Tongue
            const tongueFlick = Math.sin(snk.wiggle * 1.5) > 0.2;
            if (tongueFlick) {
              ctx.fillStyle = "#ef4444";
              let tx = 0;
              let ty = -sScale * 0.95;
              if (snk.dir === "DOWN") ty = sScale * 0.6;
              if (snk.dir === "LEFT") {
                tx = -sScale * 0.95;
                ty = -sScale * 0.2;
              }
              if (snk.dir === "RIGHT") {
                tx = sScale * 0.95;
                ty = -sScale * 0.2;
              }

              ctx.fillRect(tx - 1.5, ty, 3, 5);
              ctx.fillRect(tx - 3, ty - 2, 2, 2);
              ctx.fillRect(tx + 1, ty - 2, 2, 2);
            }
          }
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore]);

  return (
    <div className="py-3 sm:py-6 px-2 sm:px-4 md:px-6 max-w-5xl mx-auto w-full space-y-4">
      {/* 8-Bit Window Header */}
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000]">
        {/* Title Bar */}
        <div className="bg-[#15803d] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 border border-black inline-block flex-shrink-0 animate-spin" />
            <h1 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              BONUS STAGE: ANDHIKA_DATA_LABYRINTH_VS_SNAKES.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1.5 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              title={audioMuted ? "Unmute SFX" : "Mute SFX"}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-[#166534] hover:bg-[#22c55e] text-white flex items-center justify-center border border-black cursor-pointer"
            >
              {audioMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
            <Link
              href="/"
              onClick={() => soundManager.playWindowClose()}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-[#991b1b] hover:bg-[#ef4444] text-white flex items-center justify-center border border-black cursor-pointer"
            >
              ✕
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-2 sm:p-4 md:p-6 bg-[#0a1622] space-y-3 sm:space-y-4 text-slate-100 flex flex-col items-center">
          {/* Top HUD Status Bar */}
          <div className="w-full grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2 font-pixel text-[7px] sm:text-[8px] md:text-[9px]">
            <div className="bg-[#111f30] p-1.5 sm:p-2 border border-black sm:border-2 text-center">
              <span className="text-slate-400 block truncate">1UP SKOR</span>
              <span className="text-yellow-400 font-bold block truncate">{score}</span>
            </div>
            <div className="bg-[#111f30] p-1.5 sm:p-2 border border-black sm:border-2 text-center">
              <span className="text-slate-400 block truncate">HIGH SCORE</span>
              <span className="text-cyan-400 font-bold block truncate">{highScore}</span>
            </div>
            <div className="bg-[#111f30] p-1.5 sm:p-2 border border-black sm:border-2 text-center">
              <span className="text-slate-400 block truncate">NYAWA</span>
              <div className="flex items-center justify-center gap-1 text-red-500 mt-0.5">
                {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
                  <Heart key={i} className="w-3 h-3 fill-red-500 inline-block" />
                ))}
              </div>
            </div>
            <div className="bg-[#111f30] p-1.5 sm:p-2 border border-black sm:border-2 text-center col-span-1 sm:col-span-1">
              <span className="text-slate-400 block truncate">DATA BITS</span>
              <span className="text-green-400 font-bold block truncate">{bitsLeft}</span>
            </div>
            <div className="bg-[#111f30] p-1.5 sm:p-2 border border-black sm:border-2 text-center col-span-2 sm:col-span-1">
              <span className="text-slate-400 block truncate">POWER CRYSTAL</span>
              <span
                className={`font-bold block truncate ${
                  powerTimer > 0 ? "text-cyan-300 animate-pulse" : "text-slate-500"
                }`}
              >
                {powerTimer > 0 ? `AKTIF (${Math.ceil(powerTimer / 60)}s)` : "READY"}
              </span>
            </div>
          </div>

          {/* Arcade Canvas Area */}
          <div
            className="relative bg-black border-4 border-[#15803d] shadow-[0_0_15px_rgba(34,197,94,0.4)] p-1 sm:p-2 rounded-sm max-w-full overflow-hidden touch-none select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <canvas
              ref={canvasRef}
              width={380}
              height={420}
              className="w-full max-w-[380px] h-auto aspect-[19/21] block mx-auto bg-black"
            />

            {/* Start / Idle Screen Overlay */}
            {gameState === "idle" && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-center space-y-3 animate-in fade-in">
                <span className="font-pixel text-yellow-400 text-sm sm:text-base md:text-lg tracking-wider text-shadow-pixel">
                  DATA KNIGHT VS ULER BUGS 🗡️🐍
                </span>
                <p className="font-vt323 text-base sm:text-lg text-slate-200 max-w-xs leading-snug">
                  Bantu Andhika mengumpulkan seluruh Data Bits di labirin dan hindari kejaran 4 Uler Bug!
                </p>

                {/* Snake Monsters Lineup */}
                <div className="flex items-center justify-center gap-2.5 py-1 font-pixel text-[7px] text-slate-300">
                  <div className="flex flex-col items-center">
                    <span className="w-3.5 h-3.5 bg-red-500 rounded-full inline-block mb-0.5" />
                    <span>VIPER</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-3.5 h-3.5 bg-pink-500 rounded-full inline-block mb-0.5" />
                    <span>COBRA</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-3.5 h-3.5 bg-cyan-400 rounded-full inline-block mb-0.5" />
                    <span>PYTHON</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-3.5 h-3.5 bg-orange-500 rounded-full inline-block mb-0.5" />
                    <span>MAMBA</span>
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="px-5 py-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-pixel text-[9px] sm:text-xs border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] font-bold active:translate-y-0.5 cursor-pointer flex items-center gap-1.5 animate-pulse"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>START GAME [SPACE]</span>
                </button>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameState === "gameover" && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center space-y-3 animate-in fade-in">
                <span className="font-pixel text-red-500 text-lg sm:text-2xl tracking-wider">
                  GAME OVER
                </span>
                <p className="font-pixel text-[8px] sm:text-[9px] text-slate-300">
                  SKOR AKHIR: <span className="text-yellow-400">{score}</span>
                </p>
                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-[#facc15] hover:bg-[#eab308] text-black font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>MAIN LAGI [TRY AGAIN]</span>
                </button>
              </div>
            )}

            {/* Victory / Stage Clear Overlay */}
            {gameState === "victory" && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center space-y-3 animate-in fade-in">
                <span className="font-pixel text-green-400 text-lg sm:text-2xl tracking-wider">
                  STAGE CLEAR! 🎉
                </span>
                <p className="font-vt323 text-lg text-slate-200">
                  Hebat! Seluruh Data Bits telah dibersihkan dari sarang Uler Bug!
                </p>
                <p className="font-pixel text-[8px] sm:text-[9px] text-yellow-300">
                  TOTAL SKOR: {score}
                </p>
                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>MAIN LEVEL BERIKUTNYA</span>
                </button>
              </div>
            )}
          </div>

          {/* Virtual Mobile D-Pad Controls */}
          <div className="w-full max-w-sm flex flex-col items-center pt-2 pb-1 space-y-2">
            <span className="font-pixel text-[7px] sm:text-[8px] text-slate-400 block text-center">
              KONTROL D-PAD (TOUCH / ARROW KEYS / WASD / SWIPE)
            </span>

            <div className="grid grid-cols-3 gap-1.5 w-44">
              <div />
              <button
                onClick={() => setNextDirection("UP")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-green-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ▲
              </button>
              <div />

              <button
                onClick={() => setNextDirection("LEFT")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-green-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ◀
              </button>
              <button
                onClick={() => setNextDirection("DOWN")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-green-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ▼
              </button>
              <button
                onClick={() => setNextDirection("RIGHT")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-green-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Game Lore & Instructions */}
          <div className="w-full bg-[#111f30] p-3 sm:p-4 border-2 border-black text-[7px] sm:text-[8px] font-pixel text-slate-300 space-y-1.5 text-justify sm:text-left">
            <h4 className="text-yellow-400 font-bold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span>ATURAN PETUALANGAN DATA KNIGHT VS ULER:</span>
            </h4>
            <p>• <strong className="text-yellow-300">Data Bit (Kuning Emas):</strong> +10 Poin per koin analitik.</p>
            <p>• <strong className="text-cyan-300">Power Insight Crystal (Berlian Biru):</strong> +50 Poin & membekukan Uler menjadi Scared Blue. Sentuh uler untuk bonus combo +200, +400, +800 poin!</p>
            <p>• <strong className="text-green-400">Tunnel Warp:</strong> Manfaatkan lorong kiri/kanan untuk teleportasi instan menghindari kepungan uler.</p>
          </div>

          {/* Bottom Actions */}
          <div className="w-full pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-t-2 border-slate-700">
            <Link
              href="/certificates"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 bg-[#475569] hover:bg-[#64748b] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] text-center"
            >
              ◀ KEMBALI KE SERTIFIKAT
            </Link>

            <Link
              href="/contact"
              onClick={() => soundManager.playClick()}
              className="px-3 sm:px-4 py-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold flex items-center justify-center gap-1.5 text-center"
            >
              <span>LANJUT KE KOTAK SURAT</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
