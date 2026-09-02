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

// NEW 100% FULLY CONNECTED HARD DATA DUNGEON LABYRINTH (21 cols x 21 rows)
// 0: Empty path / Player Start
// 1: Emerald Stone Dungeon Wall
// 2: Golden Data Bit (+10)
// 3: Power Insight Crystal (+50)
// 6: Warp Teleport Tunnel
const HARD_DUNGEON_MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [6, 3, 2, 2, 2, 1, 2, 1, 2, 2, 0, 2, 2, 1, 2, 1, 2, 2, 2, 3, 6],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const COLS = 21;
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
  spawnX: number;
  spawnY: number;
  wiggle: number;
}

export default function AndhikaHardDungeonLabyrinthPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover" | "victory">("idle");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(15000);
  const [lives, setLives] = useState<number>(3);
  const [powerTimer, setPowerTimer] = useState<number>(0);
  const [bitsLeft, setBitsLeft] = useState<number>(0);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);

  // High score from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("andhika_hard_dungeon_highscore");
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
      // Fallback
    }
  };

  const playCollectBitSound = () => {
    chompToggle.current = !chompToggle.current;
    playTone(chompToggle.current ? 480 : 620, "triangle", 0.06, 0.06);
  };

  const playPowerCrystalSound = () => {
    playTone(700, "square", 0.12, 0.1);
    setTimeout(() => playTone(950, "square", 0.16, 0.1), 80);
    setTimeout(() => playTone(1300, "square", 0.22, 0.12), 160);
  };

  const playDefeatSnakeSound = () => {
    playTone(950, "sine", 0.18, 0.14);
    setTimeout(() => playTone(1350, "sine", 0.22, 0.14), 70);
  };

  const playHurtSound = () => {
    [520, 420, 320, 220, 110].forEach((f, i) => {
      setTimeout(() => playTone(f, "sawtooth", 0.09, 0.12), i * 65);
    });
  };

  // Game Engine State: 4 Snakes starting from the 4 corners of the maze
  const engineRef = useRef({
    grid: HARD_DUNGEON_MAZE.map((row) => [...row]),
    player: {
      x: 10,
      y: 10,
      dir: "NONE" as Direction,
      nextDir: "NONE" as Direction,
      facing: "RIGHT" as "LEFT" | "RIGHT" | "UP" | "DOWN",
      animStep: 0,
      speed: 0.098,
    },
    snakes: [
      {
        id: "red_viper",
        name: "VIPER",
        species: "DIRECT_HUNTER",
        color: "#dc2626",
        headColor: "#ef4444",
        x: 19,
        y: 1,
        dir: "LEFT" as Direction,
        speed: 0.075,
        mode: "chase" as const,
        spawnX: 19,
        spawnY: 1,
        wiggle: 0,
      },
      {
        id: "pink_cobra",
        name: "COBRA",
        species: "LEAD_INTERCEPTOR",
        color: "#db2777",
        headColor: "#f472b6",
        x: 1,
        y: 1,
        dir: "RIGHT" as Direction,
        speed: 0.073,
        mode: "chase" as const,
        spawnX: 1,
        spawnY: 1,
        wiggle: 0.6,
      },
      {
        id: "cyan_python",
        name: "PYTHON",
        species: "FLANK_PURSUER",
        color: "#0284c7",
        headColor: "#38bdf8",
        x: 1,
        y: 19,
        dir: "UP" as Direction,
        speed: 0.071,
        mode: "chase" as const,
        spawnX: 1,
        spawnY: 19,
        wiggle: 1.2,
      },
      {
        id: "orange_mamba",
        name: "MAMBA",
        species: "SWARM_LURKER",
        color: "#ea580c",
        headColor: "#fb923c",
        x: 19,
        y: 19,
        dir: "UP" as Direction,
        speed: 0.069,
        mode: "chase" as const,
        spawnX: 19,
        spawnY: 19,
        wiggle: 1.8,
      },
    ] as SnakeEnemy[],
    powerTime: 0,
    snakesDefeatedCombo: 0,
    frameCount: 0,
  });

  const isTileWalkable = (c: number, r: number) => {
    if (r < 0 || r >= ROWS) return false;
    if (c < 0 || c >= COLS) return true; // Tunnel wrap-around
    const cell = engineRef.current.grid[r][c];
    return cell !== 1; // 1 is wall, all others are open paths
  };

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
    const newGrid = HARD_DUNGEON_MAZE.map((row) => [...row]);
    const total = countBits(newGrid);

    engineRef.current.grid = newGrid;
    engineRef.current.player = {
      x: 10,
      y: 10,
      dir: "NONE",
      nextDir: "NONE",
      facing: "RIGHT",
      animStep: 0,
      speed: 0.098,
    };
    engineRef.current.snakes.forEach((s) => {
      s.x = s.spawnX;
      s.y = s.spawnY;
      s.mode = "chase";
      s.dir = s.id === "red_viper" ? "LEFT" : s.id === "pink_cobra" ? "RIGHT" : "UP";
    });
    engineRef.current.powerTime = 0;
    engineRef.current.snakesDefeatedCombo = 0;

    setScore(0);
    setLives(3);
    setBitsLeft(total);
    setPowerTimer(0);
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

    if (Math.max(absX, absY) > 18) {
      if (absX > absY) {
        setNextDirection(dx > 0 ? "RIGHT" : "LEFT");
      } else {
        setNextDirection(dy > 0 ? "DOWN" : "UP");
      }
    }
    touchStartPos.current = null;
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

      // --- 1. PLAYER MOVEMENT & CORNERING ASSIST ---
      const roundX = Math.round(player.x);
      const roundY = Math.round(player.y);
      const diffX = player.x - roundX;
      const diffY = player.y - roundY;

      // Handle Direction Turning
      if (player.nextDir !== "NONE" && player.nextDir !== player.dir) {
        const isReverse =
          (player.dir === "LEFT" && player.nextDir === "RIGHT") ||
          (player.dir === "RIGHT" && player.nextDir === "LEFT") ||
          (player.dir === "UP" && player.nextDir === "DOWN") ||
          (player.dir === "DOWN" && player.nextDir === "UP");

        if (isReverse) {
          player.dir = player.nextDir;
          player.facing = player.nextDir as "LEFT" | "RIGHT" | "UP" | "DOWN";
          player.nextDir = "NONE";
        } else if (player.nextDir === "UP" || player.nextDir === "DOWN") {
          const targetR = player.nextDir === "UP" ? roundY - 1 : roundY + 1;
          if (Math.abs(diffX) < 0.45 && isTileWalkable(roundX, targetR)) {
            player.x = roundX;
            player.dir = player.nextDir;
            player.facing = player.nextDir as "LEFT" | "RIGHT" | "UP" | "DOWN";
            player.nextDir = "NONE";
          }
        } else if (player.nextDir === "LEFT" || player.nextDir === "RIGHT") {
          const targetC = player.nextDir === "LEFT" ? roundX - 1 : roundX + 1;
          if (Math.abs(diffY) < 0.45 && isTileWalkable(targetC, roundY)) {
            player.y = roundY;
            player.dir = player.nextDir;
            player.facing = player.nextDir as "LEFT" | "RIGHT" | "UP" | "DOWN";
            player.nextDir = "NONE";
          }
        }
      }

      // Step Player Forward
      const pSpeed = player.speed;
      if (player.dir === "UP") {
        const nextY = player.y - pSpeed;
        if (isTileWalkable(roundX, Math.floor(nextY))) {
          player.y = nextY;
          player.animStep = (player.animStep + 0.25) % 4;
        } else {
          player.y = Math.max(roundY, nextY);
        }
      } else if (player.dir === "DOWN") {
        const nextY = player.y + pSpeed;
        if (isTileWalkable(roundX, Math.ceil(nextY))) {
          player.y = nextY;
          player.animStep = (player.animStep + 0.25) % 4;
        } else {
          player.y = Math.min(roundY, nextY);
        }
      } else if (player.dir === "LEFT") {
        const nextX = player.x - pSpeed;
        if (isTileWalkable(Math.floor(nextX), roundY)) {
          player.x = nextX;
          player.animStep = (player.animStep + 0.25) % 4;
        } else {
          player.x = Math.max(roundX, nextX);
        }
      } else if (player.dir === "RIGHT") {
        const nextX = player.x + pSpeed;
        if (isTileWalkable(Math.ceil(nextX), roundY)) {
          player.x = nextX;
          player.animStep = (player.animStep + 0.25) % 4;
        } else {
          player.x = Math.min(roundX, nextX);
        }
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
                localStorage.setItem("andhika_hard_dungeon_highscore", next.toString());
            }
            return next;
          });
          playCollectBitSound();
          setBitsLeft((prev) => {
            const next = prev - 1;
            if (next <= 0) {
              setGameState("victory");
              confetti({ particleCount: 160, spread: 85, origin: { y: 0.6 } });
              soundManager.playVictory();
            }
            return next;
          });
        } else if (cell === 3) {
          // POWER CRYSTAL COLLECTED!
          grid[pRow][pCol] = 0;
          setScore((prev) => prev + 50);
          playPowerCrystalSound();
          engine.powerTime = 480; // ~8 full seconds of invulnerability & snake defeat!
          engine.snakesDefeatedCombo = 0;
          snakes.forEach((s) => {
            if (s.mode !== "eaten") s.mode = "frightened";
          });
          setBitsLeft((prev) => prev - 1);
        }
      }

      // Power Crystal Countdown
      if (engine.powerTime > 0) {
        engine.powerTime--;
        setPowerTimer(engine.powerTime);
        if (engine.powerTime === 0) {
          snakes.forEach((s) => {
            if (s.mode === "frightened") s.mode = "chase";
          });
        }
      }

      // --- 2. ACTIVE SNAKE CHASE ENGINE & ANTI-COLLISION SEPARATION ---
      const possibleDirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
      const oppositeDir: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
        NONE: "NONE",
      };

      snakes.forEach((s) => {
        s.wiggle += 0.22;

        // Eaten snake returns to corner to revive
        if (s.mode === "eaten") {
          const dx = s.spawnX - s.x;
          const dy = s.spawnY - s.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.6) {
            s.mode = engine.powerTime > 0 ? "frightened" : "chase";
            s.x = s.spawnX;
            s.y = s.spawnY;
          } else {
            s.x += (dx / dist) * 0.14;
            s.y += (dy / dist) * 0.14;
          }
          return;
        }

        const sRoundX = Math.round(s.x);
        const sRoundY = Math.round(s.y);
        const sDiffX = Math.abs(s.x - sRoundX);
        const sDiffY = Math.abs(s.y - sRoundY);

        // Turn decision at intersections
        if (sDiffX < 0.09 && sDiffY < 0.09) {
          s.x = sRoundX;
          s.y = sRoundY;

          // 1. All valid walkable directions
          const walkableDirs = possibleDirs.filter((d) => {
            if (d === oppositeDir[s.dir]) return false;
            let checkC = sRoundX;
            let checkR = sRoundY;
            if (d === "UP") checkR--;
            if (d === "DOWN") checkR++;
            if (d === "LEFT") checkC--;
            if (d === "RIGHT") checkC++;
            return isTileWalkable(checkC, checkR);
          });

          // 2. Anti-Stacking: Don't pick directions that would collide with another active snake
          const nonCollidingDirs = walkableDirs.filter((d) => {
            let checkC = sRoundX;
            let checkR = sRoundY;
            if (d === "UP") checkR--;
            if (d === "DOWN") checkR++;
            if (d === "LEFT") checkC--;
            if (d === "RIGHT") checkC++;

            const hasAnotherSnake = snakes.some((other) => {
              if (other.id === s.id || other.mode === "eaten") return false;
              const distToOther = Math.hypot(other.x - checkC, other.y - checkR);
              return distToOther < 0.95;
            });

            return !hasAnotherSnake;
          });

          const candidates = nonCollidingDirs.length > 0 ? nonCollidingDirs : walkableDirs;

          if (candidates.length > 0) {
            if (s.mode === "frightened" || engine.powerTime > 0) {
              // Frightened: Run away from player!
              let bestEscapeDir = candidates[0];
              let maxDist = -Infinity;

              candidates.forEach((d) => {
                let testC = sRoundX;
                let testR = sRoundY;
                if (d === "UP") testR--;
                if (d === "DOWN") testR++;
                if (d === "LEFT") testC--;
                if (d === "RIGHT") testC++;

                const dist = Math.hypot(testC - player.x, testR - player.y);
                if (dist > maxDist) {
                  maxDist = dist;
                  bestEscapeDir = d;
                }
              });

              s.dir = bestEscapeDir;
            } else {
              // ACTIVE CHASE: ALL 4 SNAKES HUNT TOWARDS THE PLAYER
              let targetX = player.x;
              let targetY = player.y;

              if (s.id === "pink_cobra") {
                // Cobra anticipates 1 tile ahead of player
                if (player.dir === "UP") targetY -= 1;
                if (player.dir === "DOWN") targetY += 1;
                if (player.dir === "LEFT") targetX -= 1;
                if (player.dir === "RIGHT") targetX += 1;
              }

              let bestDir = candidates[0];
              let minDist = Infinity;

              candidates.forEach((d) => {
                let testC = sRoundX;
                let testR = sRoundY;
                if (d === "UP") testR--;
                if (d === "DOWN") testR++;
                if (d === "LEFT") testC--;
                if (d === "RIGHT") testC++;

                const dist = Math.hypot(testC - targetX, testR - targetY);
                if (dist < minDist) {
                  minDist = dist;
                  bestDir = d;
                }
              });

              s.dir = bestDir;
            }
          } else {
            // Dead end reverse
            s.dir = oppositeDir[s.dir];
          }
        }

        // Advance Snake forward
        const curSpeed = (s.mode === "frightened" || engine.powerTime > 0) ? s.speed * 0.52 : s.speed;
        if (s.dir === "UP") s.y -= curSpeed;
        if (s.dir === "DOWN") s.y += curSpeed;
        if (s.dir === "LEFT") s.x -= curSpeed;
        if (s.dir === "RIGHT") s.x += curSpeed;

        if (s.x < -0.5) s.x = COLS - 0.5;
        if (s.x > COLS - 0.5) s.x = -0.5;

        // --- 3. PLAYER & SNAKE COLLISION ---
        const distToPlayer = Math.hypot(s.x - player.x, s.y - player.y);
        if (distToPlayer < 0.75) {
          // IF POWER CRYSTAL ACTIVE OR SNAKE FRIGHTENED: PLAYER ALWAYS DEFEATS THE SNAKE!
          if (engine.powerTime > 0 || s.mode === "frightened") {
            s.mode = "eaten";
            engine.snakesDefeatedCombo++;
            const bonus = 200 * Math.pow(2, Math.min(3, engine.snakesDefeatedCombo - 1));
            setScore((prev) => prev + bonus);
            playDefeatSnakeSound();
          } else if (s.mode === "chase") {
            // PLAYER HIT ONLY WHEN NO POWER CRYSTAL ACTIVE
            playHurtSound();
            setLives((prev) => {
              const next = prev - 1;
              if (next <= 0) {
                setGameState("gameover");
                soundManager.playDeath();
              } else {
                player.x = 10;
                player.y = 10;
                player.dir = "NONE";
                player.nextDir = "NONE";
                snakes.forEach((snk) => {
                  snk.x = snk.spawnX;
                  snk.y = snk.spawnY;
                  snk.mode = "chase";
                  snk.dir = snk.id === "red_viper" ? "LEFT" : snk.id === "pink_cobra" ? "RIGHT" : "UP";
                });
              }
              return next;
            });
          }
        }
      });

      // --- 4. RENDER CANVAS (ANCIENT DATA DUNGEON PIXEL ART) ---
      ctx.fillStyle = "#050b14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cellW = canvas.width / COLS;
      const cellH = canvas.height / ROWS;

      // Draw Dungeon Walls & Collectibles
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = grid[r][c];
          const px = c * cellW;
          const py = r * cellH;

          if (cell === 1) {
            // Ancient Emerald Stone Dungeon Bricks
            ctx.fillStyle = "#064e3b";
            ctx.fillRect(px, py, cellW, cellH);
            ctx.strokeStyle = "#10b981";
            ctx.lineWidth = 1.2;
            ctx.strokeRect(px + 1.5, py + 1.5, cellW - 3, cellH - 3);

            // Brick inner texture
            ctx.fillStyle = "#047857";
            ctx.fillRect(px + 3, py + 3, cellW - 6, 2);
          } else if (cell === 2) {
            // Golden Data Bit
            ctx.fillStyle = "#facc15";
            ctx.fillRect(px + cellW * 0.35, py + cellH * 0.35, cellW * 0.3, cellH * 0.3);
            ctx.fillStyle = "#fef08a";
            ctx.fillRect(px + cellW * 0.35, py + cellH * 0.35, cellW * 0.1, cellH * 0.1);
          } else if (cell === 3) {
            // Power Insight Crystal (Pulsing Diamond Gem)
            const pulse = (Math.sin(Date.now() / 110) + 1) / 2;
            const size = cellW * (0.35 + pulse * 0.12);
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

            // Gem shine sparkle
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(cx - 1, cy - size * 0.5, 2, 2);
          }
        }
      }

      // --- 5. DRAW PLAYER (ANDHIKA KNIGHT IN GREEN) ---
      const pX = (player.x + 0.5) * cellW;
      const pY = (player.y + 0.5) * cellH;
      const pHeroSize = cellW * 0.96;

      ctx.save();
      ctx.translate(pX, pY);

      // Power Crystal Golden Aura
      if (engine.powerTime > 0) {
        ctx.fillStyle =
          engine.frameCount % 4 < 2 ? "rgba(250, 204, 21, 0.45)" : "rgba(56, 189, 248, 0.45)";
        ctx.beginPath();
        ctx.arc(0, 0, pHeroSize * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      if (player.facing === "LEFT") {
        ctx.scale(-1, 1);
      }

      const s = pHeroSize / 24;

      // 1. Hair / Brown Cap
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

      // 4. Belt with Gold Buckle
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

      // 7. Boots (Animated Step)
      const legOffset = Math.sin(player.animStep * Math.PI) * 2 * s;
      ctx.fillStyle = "#78350f";
      ctx.fillRect(-4 * s, 5 * s + legOffset, 3 * s, 4 * s);
      ctx.fillRect(1 * s, 5 * s - legOffset, 3 * s, 4 * s);

      ctx.restore();

      // --- 6. DRAW SNAKES (SLITHERING & NON-OVERLAPPING) ---
      snakes.forEach((snk) => {
        const sPx = (snk.x + 0.5) * cellW;
        const sPy = (snk.y + 0.5) * cellH;
        const sScale = cellW * 0.44;

        ctx.save();
        ctx.translate(sPx, sPy);

        if (snk.mode === "eaten") {
          // Defeated Snake Spirit Eyes
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

          if (snk.mode === "frightened" || engine.powerTime > 0) {
            const isFlash = engine.powerTime < 100 && Math.floor(engine.powerTime / 12) % 2 === 0;
            sBodyCol = isFlash ? "#ffffff" : "#1e40af";
            sHeadCol = isFlash ? "#93c5fd" : "#3b82f6";
          }

          // 4 Slithering Snake Segments
          const wiggleAmp = Math.sin(snk.wiggle) * (sScale * 0.35);

          // Tail
          ctx.fillStyle = sBodyCol;
          ctx.beginPath();
          ctx.arc(-wiggleAmp * 0.8, sScale * 0.7, sScale * 0.35, 0, Math.PI * 2);
          ctx.fill();

          // Middle Body
          ctx.fillStyle = sHeadCol;
          ctx.beginPath();
          ctx.arc(wiggleAmp * 0.6, sScale * 0.25, sScale * 0.5, 0, Math.PI * 2);
          ctx.fill();

          // Snake Head
          ctx.fillStyle = sBodyCol;
          ctx.beginPath();
          ctx.arc(0, -sScale * 0.2, sScale * 0.75, 0, Math.PI * 2);
          ctx.fill();

          // Snake Crown Scales
          ctx.fillStyle = sHeadCol;
          ctx.fillRect(-sScale * 0.3, -sScale * 0.5, sScale * 0.6, sScale * 0.3);

          // Snake Eyes
          if (snk.mode === "frightened" || engine.powerTime > 0) {
            // Dizzy X Eyes
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(-sScale * 0.35, -sScale * 0.25, sScale * 0.25, 0, Math.PI * 2);
            ctx.arc(sScale * 0.35, -sScale * 0.25, sScale * 0.25, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-sScale * 0.45, -sScale * 0.35);
            ctx.lineTo(-sScale * 0.25, -sScale * 0.15);
            ctx.moveTo(-sScale * 0.25, -sScale * 0.35);
            ctx.lineTo(-sScale * 0.45, -sScale * 0.15);
            ctx.moveTo(sScale * 0.25, -sScale * 0.35);
            ctx.lineTo(sScale * 0.45, -sScale * 0.15);
            ctx.moveTo(sScale * 0.45, -sScale * 0.35);
            ctx.lineTo(sScale * 0.25, -sScale * 0.15);
            ctx.stroke();
          } else {
            // Predator Eyes
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
        <div className="bg-[#047857] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 border border-black inline-block flex-shrink-0 animate-spin" />
            <h1 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              BONUS STAGE: DATA_DUNGEON_KNIGHT_VS_ULER.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1.5 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              title={audioMuted ? "Unmute SFX" : "Mute SFX"}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-[#065f46] hover:bg-[#10b981] text-white flex items-center justify-center border border-black cursor-pointer"
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
                  powerTimer > 0 ? "text-cyan-300 animate-pulse font-bold" : "text-slate-500"
                }`}
              >
                {powerTimer > 0 ? `KEBAL (${Math.ceil(powerTimer / 60)}s)` : "READY"}
              </span>
            </div>
          </div>

          {/* Arcade Canvas Area */}
          <div
            className="relative bg-black border-4 border-[#059669] shadow-[0_0_18px_rgba(16,185,129,0.45)] p-1 sm:p-2 rounded-sm max-w-full overflow-hidden touch-none select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              className="w-full max-w-[420px] h-auto aspect-square block mx-auto bg-black"
            />

            {/* Start / Idle Screen Overlay */}
            {gameState === "idle" && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-center space-y-3 animate-in fade-in">
                <span className="font-pixel text-yellow-400 text-sm sm:text-base md:text-lg tracking-wider text-shadow-pixel">
                  DATA DUNGEON LABYRINTH 🗡️🐍
                </span>
                <p className="font-vt323 text-base sm:text-lg text-slate-200 max-w-xs leading-snug">
                  4 Uler Bug aktif memburu posisi Anda! Ambil Power Crystal untuk menjadi kebal & menebas uler!
                </p>

                {/* Snake Bug Lineup */}
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
                  className="px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-black font-pixel text-[9px] sm:text-xs border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] font-bold active:translate-y-0.5 cursor-pointer flex items-center gap-1.5 animate-pulse"
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
                  DUNGEON CONQUERED! 🎉
                </span>
                <p className="font-vt323 text-lg text-slate-200">
                  Luar biasa! Anda berhasil menaklukkan Data Dungeon tersulit!
                </p>
                <p className="font-pixel text-[8px] sm:text-[9px] text-yellow-300">
                  TOTAL SKOR: {score}
                </p>
                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-black font-pixel text-[8px] sm:text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] font-bold active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>MAINKAN LAGI</span>
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
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-emerald-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ▲
              </button>
              <div />

              <button
                onClick={() => setNextDirection("LEFT")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-emerald-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ◀
              </button>
              <button
                onClick={() => setNextDirection("DOWN")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-emerald-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ▼
              </button>
              <button
                onClick={() => setNextDirection("RIGHT")}
                className="h-11 bg-[#1e293b] hover:bg-[#334155] active:bg-emerald-400 active:text-black text-white font-pixel text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer rounded-sm"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Game Lore & Instructions */}
          <div className="w-full bg-[#111f30] p-3 sm:p-4 border-2 border-black text-[7px] sm:text-[8px] font-pixel text-slate-300 space-y-1.5 text-justify sm:text-left">
            <h4 className="text-yellow-400 font-bold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span>PANDUAN TAKTIK DATA DUNGEON:</span>
            </h4>
            <p>• <strong className="text-cyan-300">Power Insight Crystal (Berlian Biru):</strong> Memberikan status <span className="text-yellow-300 font-bold">KEBAL TOTAL (~8 Detik)</span>. Sentuh uler mana pun untuk menebas dan mendapatkan bonus combo <span className="text-green-400 font-bold">+200, +400, +800, +1600 Poin</span>!</p>
            <p>• <strong className="text-emerald-400">Pengejaran Aktif Uler:</strong> Uler aktif bergerak memburu posisi ksatria Anda dan saling menghindari tabrakan sesama uler.</p>
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
