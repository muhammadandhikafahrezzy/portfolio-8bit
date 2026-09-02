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
  Zap,
  Volume2,
  VolumeX,
} from "lucide-react";

// PAC-MAN MAZE DEFINITION (19 columns x 21 rows)
// 0: Empty/Walkway (no dot)
// 1: Wall
// 2: Small Data Dot
// 3: Power Pellet (Energizer)
// 4: Ghost Gate/Door
// 5: Ghost House Inside
// 6: Wrap-around Tunnel
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

interface Ghost {
  id: string;
  name: string;
  role: string;
  color: string;
  x: number;
  y: number;
  dir: Direction;
  targetDir: Direction;
  speed: number;
  mode: "chase" | "frightened" | "eaten";
  house: boolean;
  spawnX: number;
  spawnY: number;
}

export default function PacmanArcadePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover" | "victory">("idle");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(10000);
  const [lives, setLives] = useState<number>(3);
  const [level, setLevel] = useState<number>(1);
  const [frightenedTimer, setFrightenedTimer] = useState<number>(0);
  const [dotsLeft, setDotsLeft] = useState<number>(0);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);

  // High score from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pacman_high_score");
      if (saved) setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Web Audio Synth for authentic Pac-Man SFX
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playWaka = useRef<boolean>(false);

  const initAudio = () => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      // Audio fallback silent
    }
  };

  const playChompSound = () => {
    playWaka.current = !playWaka.current;
    playTone(playWaka.current ? 360 : 480, "triangle", 0.08, 0.06);
  };

  const playPowerSound = () => {
    playTone(600, "square", 0.2, 0.1);
    setTimeout(() => playTone(800, "square", 0.2, 0.1), 100);
  };

  const playEatGhostSound = () => {
    playTone(850, "sine", 0.25, 0.15);
  };

  const playDeathSound = () => {
    [400, 350, 300, 250, 200, 150, 100].forEach((freq, idx) => {
      setTimeout(() => playTone(freq, "sawtooth", 0.1, 0.12), idx * 80);
    });
  };

  // Game Engine State
  const engineRef = useRef({
    grid: MAZE_TEMPLATE.map((row) => [...row]),
    pacman: {
      x: 9.5,
      y: 16,
      dir: "NONE" as Direction,
      nextDir: "NONE" as Direction,
      mouthAngle: 0.2,
      mouthSpeed: 0.04,
      speed: 0.09,
    },
    ghosts: [
      {
        id: "blinky",
        name: "BLINKY",
        role: "NULL_POINTER",
        color: "#ef4444",
        x: 9.5,
        y: 8,
        dir: "LEFT" as Direction,
        targetDir: "LEFT" as Direction,
        speed: 0.075,
        mode: "chase" as const,
        house: false,
        spawnX: 9.5,
        spawnY: 8,
      },
      {
        id: "pinky",
        name: "PINKY",
        role: "MEMORY_LEAK",
        color: "#ec4899",
        x: 8.5,
        y: 10,
        dir: "UP" as Direction,
        targetDir: "UP" as Direction,
        speed: 0.07,
        mode: "chase" as const,
        house: true,
        spawnX: 8.5,
        spawnY: 10,
      },
      {
        id: "inky",
        name: "INKY",
        role: "SYNTAX_ERR",
        color: "#06b6d4",
        x: 9.5,
        y: 10,
        dir: "UP" as Direction,
        targetDir: "UP" as Direction,
        speed: 0.068,
        mode: "chase" as const,
        house: true,
        spawnX: 9.5,
        spawnY: 10,
      },
      {
        id: "clyde",
        name: "CLYDE",
        role: "DIRTY_DATA",
        color: "#f97316",
        x: 10.5,
        y: 10,
        dir: "UP" as Direction,
        targetDir: "UP" as Direction,
        speed: 0.065,
        mode: "chase" as const,
        house: true,
        spawnX: 10.5,
        spawnY: 10,
      },
    ] as Ghost[],
    frightenedTime: 0,
    ghostsEatenCombo: 0,
    animFrame: 0,
    lastFrameTime: 0,
  });

  // Calculate total dots
  const countDots = (grid: number[][]) => {
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
    const totalDots = countDots(newGrid);

    engineRef.current.grid = newGrid;
    engineRef.current.pacman = {
      x: 9,
      y: 16,
      dir: "NONE",
      nextDir: "NONE",
      mouthAngle: 0.2,
      mouthSpeed: 0.04,
      speed: 0.09,
    };
    engineRef.current.ghosts.forEach((g) => {
      g.x = g.spawnX;
      g.y = g.spawnY;
      g.mode = "chase";
      g.house = g.id !== "blinky";
      g.dir = g.id === "blinky" ? "LEFT" : "UP";
    });
    engineRef.current.frightenedTime = 0;
    engineRef.current.ghostsEatenCombo = 0;

    setScore(0);
    setLives(3);
    setLevel(1);
    setDotsLeft(totalDots);
    setGameState("playing");
  }, []);

  // Direction Helper
  const setNextDirection = (dir: Direction) => {
    engineRef.current.pacman.nextDir = dir;
    if (gameState === "idle") {
      startGame();
    }
  };

  // Keyboard Event Listeners
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

  // Wall collision check
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

    let animationFrameId: number;

    const gameLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const engine = engineRef.current;
      const pacman = engine.pacman;
      const ghosts = engine.ghosts;
      const grid = engine.grid;

      // --- 1. UPDATE PAC-MAN ---
      // Try turning into next direction if aligned
      const isAlignedX = Math.abs(pacman.x - Math.round(pacman.x)) < 0.15;
      const isAlignedY = Math.abs(pacman.y - Math.round(pacman.y)) < 0.15;

      if (pacman.nextDir !== "NONE" && isAlignedX && isAlignedY) {
        if (canMove(Math.round(pacman.x), Math.round(pacman.y), pacman.nextDir)) {
          pacman.x = Math.round(pacman.x);
          pacman.y = Math.round(pacman.y);
          pacman.dir = pacman.nextDir;
          pacman.nextDir = "NONE";
        }
      }

      // Move in current direction
      if (canMove(pacman.x, pacman.y, pacman.dir)) {
        if (pacman.dir === "UP") pacman.y -= pacman.speed;
        if (pacman.dir === "DOWN") pacman.y += pacman.speed;
        if (pacman.dir === "LEFT") pacman.x -= pacman.speed;
        if (pacman.dir === "RIGHT") pacman.x += pacman.speed;

        // Animate mouth
        pacman.mouthAngle += pacman.mouthSpeed;
        if (pacman.mouthAngle > 0.45 || pacman.mouthAngle < 0.05) {
          pacman.mouthSpeed = -pacman.mouthSpeed;
        }
      }

      // Tunnel Wrap-Around
      if (pacman.x < -0.5) pacman.x = COLS - 0.5;
      if (pacman.x > COLS - 0.5) pacman.x = -0.5;

      // Eat Data Dots & Energizers
      const curCol = Math.round(pacman.x);
      const curRow = Math.round(pacman.y);

      if (curRow >= 0 && curRow < ROWS && curCol >= 0 && curCol < COLS) {
        const cell = grid[curRow][curCol];
        if (cell === 2) {
          // Small Dot
          grid[curRow][curCol] = 0;
          setScore((prev) => {
            const nextScore = prev + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              if (typeof window !== "undefined") localStorage.setItem("pacman_high_score", nextScore.toString());
            }
            return nextScore;
          });
          playChompSound();
          setDotsLeft((prev) => {
            const nextDots = prev - 1;
            if (nextDots <= 0) {
              // Victory Stage Clear!
              setGameState("victory");
              confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
              soundManager.playVictory();
            }
            return nextDots;
          });
        } else if (cell === 3) {
          // Power Pellet (Energizer)
          grid[curRow][curCol] = 0;
          setScore((prev) => prev + 50);
          playPowerSound();
          engine.frightenedTime = 400; // ~7 seconds
          engine.ghostsEatenCombo = 0;
          ghosts.forEach((g) => {
            if (g.mode !== "eaten") g.mode = "frightened";
          });
          setDotsLeft((prev) => prev - 1);
        }
      }

      // Frightened Timer Update
      if (engine.frightenedTime > 0) {
        engine.frightenedTime--;
        setFrightenedTimer(engine.frightenedTime);
        if (engine.frightenedTime === 0) {
          ghosts.forEach((g) => {
            if (g.mode === "frightened") g.mode = "chase";
          });
        }
      }

      // --- 2. UPDATE GHOSTS ---
      const possibleDirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
      const oppositeDir: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
        NONE: "NONE",
      };

      ghosts.forEach((g) => {
        // Ghost House Exit Logic
        if (g.house) {
          g.y -= 0.03;
          if (g.y <= 8.5) {
            g.house = false;
            g.y = 8;
            g.dir = "LEFT";
          }
          return;
        }

        // Return home if eaten
        if (g.mode === "eaten") {
          const dx = g.spawnX - g.x;
          const dy = g.spawnY - g.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.5) {
            g.mode = "chase";
            g.x = g.spawnX;
            g.y = g.spawnY;
          } else {
            g.x += (dx / dist) * 0.12;
            g.y += (dy / dist) * 0.12;
          }
          return;
        }

        // Choose Direction at Intersection
        const gAlignedX = Math.abs(g.x - Math.round(g.x)) < 0.12;
        const gAlignedY = Math.abs(g.y - Math.round(g.y)) < 0.12;

        if (gAlignedX && gAlignedY) {
          g.x = Math.round(g.x);
          g.y = Math.round(g.y);

          const validDirs = possibleDirs.filter(
            (d) => d !== oppositeDir[g.dir] && canMove(g.x, g.y, d, false)
          );

          if (validDirs.length > 0) {
            if (g.mode === "frightened") {
              // Random direction when frightened
              g.dir = validDirs[Math.floor(Math.random() * validDirs.length)];
            } else {
              // Intelligent Chase Target (Blinky chases pacman directly, others slightly wander)
              let targetX = pacman.x;
              let targetY = pacman.y;

              if (g.id === "pinky") {
                if (pacman.dir === "UP") targetY -= 3;
                if (pacman.dir === "DOWN") targetY += 3;
                if (pacman.dir === "LEFT") targetX -= 3;
                if (pacman.dir === "RIGHT") targetX += 3;
              } else if (g.id === "clyde") {
                const dist = Math.hypot(g.x - pacman.x, g.y - pacman.y);
                if (dist < 4) {
                  targetX = 1;
                  targetY = 19;
                }
              }

              // Pick direction with shortest Euclidean distance
              let bestDir = validDirs[0];
              let minDist = Infinity;

              validDirs.forEach((d) => {
                let testX = g.x;
                let testY = g.y;
                if (d === "UP") testY -= 1;
                if (d === "DOWN") testY += 1;
                if (d === "LEFT") testX -= 1;
                if (d === "RIGHT") testX += 1;

                const dDist = Math.hypot(testX - targetX, testY - targetY);
                if (dDist < minDist) {
                  minDist = dDist;
                  bestDir = d;
                }
              });

              g.dir = bestDir;
            }
          } else if (canMove(g.x, g.y, oppositeDir[g.dir])) {
            g.dir = oppositeDir[g.dir];
          }
        }

        // Move Ghost
        const curSpeed = g.mode === "frightened" ? g.speed * 0.6 : g.speed;
        if (g.dir === "UP") g.y -= curSpeed;
        if (g.dir === "DOWN") g.y += curSpeed;
        if (g.dir === "LEFT") g.x -= curSpeed;
        if (g.dir === "RIGHT") g.x += curSpeed;

        // Tunnel Wrap
        if (g.x < -0.5) g.x = COLS - 0.5;
        if (g.x > COLS - 0.5) g.x = -0.5;

        // --- 3. PAC-MAN & GHOST COLLISION ---
        const distToPacman = Math.hypot(g.x - pacman.x, g.y - pacman.y);
        if (distToPacman < 0.65) {
          if (g.mode === "frightened") {
            // Eat Ghost!
            g.mode = "eaten";
            engine.ghostsEatenCombo++;
            const bonus = 200 * Math.pow(2, engine.ghostsEatenCombo - 1);
            setScore((prev) => prev + bonus);
            playEatGhostSound();
          } else if (g.mode === "chase") {
            // Pac-Man Hit by Ghost!
            playDeathSound();
            setLives((prev) => {
              const nextLives = prev - 1;
              if (nextLives <= 0) {
                setGameState("gameover");
                soundManager.playGameOver();
              } else {
                // Respawn Pacman and Ghosts
                pacman.x = 9;
                pacman.y = 16;
                pacman.dir = "NONE";
                pacman.nextDir = "NONE";
                ghosts.forEach((gh) => {
                  gh.x = gh.spawnX;
                  gh.y = gh.spawnY;
                  gh.mode = "chase";
                  gh.house = gh.id !== "blinky";
                  gh.dir = gh.id === "blinky" ? "LEFT" : "UP";
                });
              }
              return nextLives;
            });
          }
        }
      });

      // --- 4. RENDER CANVAS (8-BIT RETRO PAC-MAN) ---
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cellW = canvas.width / COLS;
      const cellH = canvas.height / ROWS;

      // Draw Maze Walls & Pellets
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = grid[r][c];
          const px = c * cellW;
          const py = r * cellH;

          if (cell === 1) {
            // Blue Neon 8-Bit Wall
            ctx.fillStyle = "#1e3a8a";
            ctx.fillRect(px, py, cellW, cellH);
            ctx.strokeStyle = "#3b82f6";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(px + 2, py + 2, cellW - 4, cellH - 4);
          } else if (cell === 4) {
            // Ghost Gate
            ctx.fillStyle = "#f472b6";
            ctx.fillRect(px, py + cellH / 2 - 2, cellW, 4);
          } else if (cell === 2) {
            // Small Data Dot
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(px + cellW / 2, py + cellH / 2, cellW * 0.14, 0, Math.PI * 2);
            ctx.fill();
          } else if (cell === 3) {
            // Power Pellet (Pulsing Big Dot)
            const pulse = (Math.sin(Date.now() / 150) + 1) / 2;
            ctx.fillStyle = pulse > 0.3 ? "#fde047" : "#fbbf24";
            ctx.beginPath();
            ctx.arc(px + cellW / 2, py + cellH / 2, cellW * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw Pac-Man
      const pacPx = (pacman.x + 0.5) * cellW;
      const pacPy = (pacman.y + 0.5) * cellH;
      const pacRadius = cellW * 0.48;

      let rotation = 0;
      if (pacman.dir === "RIGHT") rotation = 0;
      if (pacman.dir === "DOWN") rotation = Math.PI / 2;
      if (pacman.dir === "LEFT") rotation = Math.PI;
      if (pacman.dir === "UP") rotation = (Math.PI * 3) / 2;

      ctx.save();
      ctx.translate(pacPx, pacPy);
      ctx.rotate(rotation);

      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.arc(
        0,
        0,
        pacRadius,
        pacman.mouthAngle * Math.PI,
        (2 - pacman.mouthAngle) * Math.PI
      );
      ctx.lineTo(0, 0);
      ctx.fill();

      // Pacman Eye
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(0, -pacRadius * 0.45, pacRadius * 0.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Draw Ghosts
      ghosts.forEach((g) => {
        const ghPx = (g.x + 0.5) * cellW;
        const ghPy = (g.y + 0.5) * cellH;
        const ghRadius = cellW * 0.46;

        ctx.save();
        ctx.translate(ghPx, ghPy);

        if (g.mode === "eaten") {
          // Just eyes
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-ghRadius * 0.35, -ghRadius * 0.2, ghRadius * 0.28, 0, Math.PI * 2);
          ctx.arc(ghRadius * 0.35, -ghRadius * 0.2, ghRadius * 0.28, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#2563eb";
          ctx.beginPath();
          ctx.arc(-ghRadius * 0.35, -ghRadius * 0.2, ghRadius * 0.14, 0, Math.PI * 2);
          ctx.arc(ghRadius * 0.35, -ghRadius * 0.2, ghRadius * 0.14, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Ghost Body
          let ghostBodyColor = g.color;
          if (g.mode === "frightened") {
            const isFlashing = engine.frightenedTime < 80 && Math.floor(engine.frightenedTime / 10) % 2 === 0;
            ghostBodyColor = isFlashing ? "#ffffff" : "#1d4ed8";
          }

          ctx.fillStyle = ghostBodyColor;
          ctx.beginPath();
          ctx.arc(0, -ghRadius * 0.1, ghRadius, Math.PI, 0, false);
          ctx.lineTo(ghRadius, ghRadius * 0.8);

          // Wavy Skirt
          const waves = 3;
          const waveW = (ghRadius * 2) / waves;
          for (let i = 0; i < waves; i++) {
            const wx = ghRadius - i * waveW;
            ctx.lineTo(wx - waveW / 2, ghRadius * 0.5);
            ctx.lineTo(wx - waveW, ghRadius * 0.8);
          }
          ctx.closePath();
          ctx.fill();

          // Ghost Eyes
          ctx.fillStyle = g.mode === "frightened" ? "#fecdd3" : "#ffffff";
          ctx.beginPath();
          ctx.arc(-ghRadius * 0.35, -ghRadius * 0.2, ghRadius * 0.28, 0, Math.PI * 2);
          ctx.arc(ghRadius * 0.35, -ghRadius * 0.2, ghRadius * 0.28, 0, Math.PI * 2);
          ctx.fill();

          // Pupil looking in direction
          let pupilDx = 0;
          let pupilDy = 0;
          if (g.dir === "LEFT") pupilDx = -ghRadius * 0.12;
          if (g.dir === "RIGHT") pupilDx = ghRadius * 0.12;
          if (g.dir === "UP") pupilDy = -ghRadius * 0.12;
          if (g.dir === "DOWN") pupilDy = ghRadius * 0.12;

          ctx.fillStyle = g.mode === "frightened" ? "#ef4444" : "#1e3a8a";
          ctx.beginPath();
          ctx.arc(-ghRadius * 0.35 + pupilDx, -ghRadius * 0.2 + pupilDy, ghRadius * 0.14, 0, Math.PI * 2);
          ctx.arc(ghRadius * 0.35 + pupilDx, -ghRadius * 0.2 + pupilDy, ghRadius * 0.14, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, highScore]);

  return (
    <div className="py-3 sm:py-6 px-2 sm:px-4 md:px-6 max-w-5xl mx-auto w-full space-y-4">
      {/* 8-Bit Window Header */}
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000]">
        {/* Title Bar */}
        <div className="bg-[#9333ea] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 border border-black inline-block flex-shrink-0 animate-spin" />
            <h1 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              BONUS STAGE: DATA_PACMAN_ARCADE_8BIT.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1.5 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              title={audioMuted ? "Unmute SFX" : "Mute SFX"}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-[#7e22ce] hover:bg-[#a855f7] text-white flex items-center justify-center border border-black cursor-pointer"
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
              <span className="text-slate-400 block truncate">1UP SCORE</span>
              <span className="text-yellow-400 font-bold block truncate">{score}</span>
            </div>
            <div className="bg-[#111f30] p-1.5 sm:p-2 border border-black sm:border-2 text-center">
              <span className="text-slate-400 block truncate">HIGH SCORE</span>
              <span className="text-cyan-400 font-bold block truncate">{highScore}</span>
            </div>
            <div className="bg-[#111f30] p-1.5 sm:p-2 border border-black sm:border-2 text-center">
              <span className="text-slate-400 block truncate">LIVES</span>
              <div className="flex items-center justify-center gap-1 text-red-500 mt-0.5">
                {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
                  <Heart key={i} className="w-3 h-3 fill-red-500 inline-block" />
                ))}
              </div>
            </div>
            <div className="bg-[#111f30] p-1.5 sm:p-2 border border-black sm:border-2 text-center col-span-1 sm:col-span-1">
              <span className="text-slate-400 block truncate">DATA DOTS</span>
              <span className="text-green-400 font-bold block truncate">{dotsLeft}</span>
            </div>
            <div className="bg-[#111f30] p-1.5 sm:p-2 border border-black sm:border-2 text-center col-span-2 sm:col-span-1">
              <span className="text-slate-400 block truncate">ENERGIZER</span>
              <span className={`font-bold block truncate ${frightenedTimer > 0 ? "text-cyan-300 animate-pulse" : "text-slate-500"}`}>
                {frightenedTimer > 0 ? `ACTIVE (${Math.ceil(frightenedTimer / 60)}s)` : "READY"}
              </span>
            </div>
          </div>

          {/* Arcade Cabinet Screen Area */}
          <div
            className="relative bg-black border-4 border-[#1e3a8a] shadow-[0_0_15px_rgba(59,130,246,0.5)] p-1 sm:p-2 rounded-sm max-w-full overflow-hidden touch-none select-none"
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
                <span className="font-pixel text-yellow-400 text-sm sm:text-lg md:text-xl tracking-wider text-shadow-pixel">
                  DATA PAC-MAN 8-BIT
                </span>
                <p className="font-vt323 text-base sm:text-lg text-slate-200 max-w-xs leading-snug">
                  Kumpulkan seluruh Data Pellets dan makan Power Energizer untuk mengalahkan Bug & Error!
                </p>

                {/* Ghost Bug Lineup */}
                <div className="flex items-center gap-3 py-1 font-pixel text-[7px] text-slate-300">
                  <div className="flex flex-col items-center">
                    <span className="w-3.5 h-3.5 bg-red-500 rounded-t-full inline-block mb-0.5" />
                    <span>BLINKY</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-3.5 h-3.5 bg-pink-500 rounded-t-full inline-block mb-0.5" />
                    <span>PINKY</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-3.5 h-3.5 bg-cyan-400 rounded-t-full inline-block mb-0.5" />
                    <span>INKY</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-3.5 h-3.5 bg-orange-500 rounded-t-full inline-block mb-0.5" />
                    <span>CLYDE</span>
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="px-5 py-2.5 bg-[#facc15] hover:bg-[#eab308] text-black font-pixel text-[9px] sm:text-xs border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] font-bold active:translate-y-0.5 cursor-pointer flex items-center gap-1.5 animate-pulse"
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
                  FINAL SCORE: <span className="text-yellow-400">{score}</span>
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
                  Selamat! Seluruh Data Pellets telah berhasil di-cleansing!
                </p>
                <p className="font-pixel text-[8px] sm:text-[9px] text-yellow-300">
                  TOTAL SKOR: {score}
                </p>
                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>MAINKAN LEVEL BERIKUTNYA</span>
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
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-yellow-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ▲
              </button>
              <div />

              <button
                onClick={() => setNextDirection("LEFT")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-yellow-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ◀
              </button>
              <button
                onClick={() => setNextDirection("DOWN")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-yellow-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ▼
              </button>
              <button
                onClick={() => setNextDirection("RIGHT")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-yellow-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Game Rules & Lore Box */}
          <div className="w-full bg-[#111f30] p-3 sm:p-4 border-2 border-black text-[7px] sm:text-[8px] font-pixel text-slate-300 space-y-1.5 text-justify sm:text-left">
            <h4 className="text-yellow-400 font-bold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span>PANDUAN RETRO DATA PAC-MAN ARCADE:</span>
            </h4>
            <p>• <strong className="text-yellow-300">Data Dot (Kuning Kecil):</strong> +10 Poin per koin analitik.</p>
            <p>• <strong className="text-cyan-300">Power Energizer (Besar Berkedip):</strong> +50 Poin & mengubah Ghost menjadi Scared Blue. Makan Ghost untuk bonus +200, +400, +800 poin!</p>
            <p>• <strong className="text-red-400">Tunnel Warp:</strong> Lewati lorong kiri/kanan untuk teleportasi instan menghindari kejaran ghost.</p>
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
