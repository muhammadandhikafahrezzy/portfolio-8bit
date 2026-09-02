"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { soundManager } from "@/components/SoundManager";
import confetti from "canvas-confetti";
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Play,
  Flame,
  Shield,
  Heart,
  Skull,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface Block {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  type: "ground" | "brick" | "qblock" | "pipe" | "spike" | "moving" | "castle" | "pole";
  hit?: boolean;
  bouncing?: number;
  hasCoin?: boolean;
  minX?: number;
  maxX?: number;
  vx?: number;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  type: "slime" | "piranha" | "bat";
  vx: number;
  vy: number;
  alive: boolean;
  originY?: number;
  animTimer?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface Coin {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

export default function MinigamePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover" | "victory">("idle");
  const [difficulty, setDifficulty] = useState<"standard" | "kaizo">("standard");
  const [score, setScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [deaths, setDeaths] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(300);

  // Controller states
  const keys = useRef<{ left: boolean; right: boolean; jump: boolean; run: boolean }>({
    left: false,
    right: false,
    jump: false,
    run: false,
  });

  // Game Engine State
  const engineState = useRef({
    player: {
      x: 60,
      y: 300,
      w: 22,
      h: 30,
      vx: 0,
      vy: 0,
      grounded: false,
      facing: "right" as "left" | "right",
      isJumping: false,
      invulnerable: 0,
      deadAnim: false,
      deadTimer: 0,
    },
    cameraX: 0,
    blocks: [] as Block[],
    enemies: [] as Enemy[],
    coins: [] as Coin[],
    particles: [] as Particle[],
    flagpole: { x: 3050, y: 120, h: 260, flagY: 130, reached: false },
    castle: { x: 3120, y: 240, w: 120, h: 140 },
    animFrame: 0,
    score: 0,
    coinCount: 0,
    lives: 3,
    deaths: 0,
    timeLeft: 300,
    timerCount: 0,
  });

  const buildLevel = () => {
    const blocks: Block[] = [];
    const enemies: Enemy[] = [];
    const levelCoins: Coin[] = [];

    const addGround = (startX: number, width: number, y = 380, h = 70) => {
      blocks.push({
        id: blocks.length + 1,
        x: startX,
        y,
        w: width,
        h,
        type: "ground",
      });
    };

    // --- Section 1: Intro (0 - 800px) ---
    addGround(0, 480);
    blocks.push({ id: 101, x: 180, y: 260, w: 32, h: 32, type: "qblock", hasCoin: true });
    blocks.push({ id: 102, x: 212, y: 260, w: 32, h: 32, type: "brick" });
    blocks.push({ id: 103, x: 244, y: 260, w: 32, h: 32, type: "qblock", hasCoin: true });
    blocks.push({ id: 104, x: 212, y: 160, w: 32, h: 32, type: "qblock", hasCoin: true });

    blocks.push({ id: 105, x: 360, y: 300, w: 48, h: 80, type: "pipe" });
    enemies.push({ id: 201, x: 384, y: 270, w: 24, h: 30, type: "piranha", vx: 0, vy: 0, alive: true, originY: 300 });
    enemies.push({ id: 202, x: 280, y: 350, w: 26, h: 24, type: "slime", vx: -1.2, vy: 0, alive: true });

    // PIT 1: 480 to 580
    addGround(580, 400);
    blocks.push({
      id: 106,
      x: 490,
      y: 320,
      w: 64,
      h: 16,
      type: "moving",
      minX: 470,
      maxX: 590,
      vx: 1.5,
    });

    blocks.push({ id: 107, x: 680, y: 364, w: 40, h: 16, type: "spike" });
    enemies.push({ id: 203, x: 800, y: 350, w: 26, h: 24, type: "slime", vx: -1.4, vy: 0, alive: true });
    enemies.push({ id: 204, x: 920, y: 350, w: 26, h: 24, type: "slime", vx: -1.4, vy: 0, alive: true });

    // --- Section 2: Flying Bats & Double Pipes (980 - 1800px) ---
    addGround(1100, 500);
    blocks.push({ id: 108, x: 1140, y: 250, w: 32, h: 32, type: "brick" });
    blocks.push({ id: 109, x: 1172, y: 250, w: 32, h: 32, type: "qblock", hasCoin: true });
    blocks.push({ id: 110, x: 1204, y: 250, w: 32, h: 32, type: "brick" });
    blocks.push({ id: 111, x: 1236, y: 250, w: 32, h: 32, type: "brick" });

    enemies.push({ id: 205, x: 1350, y: 180, w: 28, h: 24, type: "bat", vx: -1.8, vy: 0, alive: true, originY: 180 });
    blocks.push({ id: 112, x: 1420, y: 270, w: 48, h: 110, type: "pipe" });
    enemies.push({ id: 206, x: 1444, y: 240, w: 24, h: 30, type: "piranha", vx: 0, vy: 0, alive: true, originY: 270 });

    // PIT 3: 1600 to 1780
    blocks.push({
      id: 113,
      x: 1620,
      y: 330,
      w: 56,
      h: 16,
      type: "moving",
      minX: 1610,
      maxX: 1750,
      vx: 2.0,
    });

    // --- Section 3: Kaizo Gauntlet (1780 - 2700px) ---
    addGround(1780, 550);
    blocks.push({ id: 114, x: 1900, y: 364, w: 48, h: 16, type: "spike" });
    blocks.push({ id: 115, x: 2100, y: 364, w: 48, h: 16, type: "spike" });

    blocks.push({ id: 116, x: 1960, y: 240, w: 80, h: 20, type: "ground" });
    levelCoins.push({ id: 301, x: 1980, y: 200, collected: false });
    levelCoins.push({ id: 302, x: 2020, y: 200, collected: false });

    enemies.push({ id: 207, x: 2150, y: 160, w: 28, h: 24, type: "bat", vx: -2.2, vy: 0, alive: true, originY: 160 });
    enemies.push({ id: 208, x: 2280, y: 350, w: 26, h: 24, type: "slime", vx: -1.8, vy: 0, alive: true });

    // PIT 4: 2330 to 2480
    blocks.push({ id: 117, x: 2370, y: 310, w: 44, h: 16, type: "moving", minX: 2350, maxX: 2460, vx: 2.2 });

    // --- Section 4: Final Staircase & Castle (2480 - 3300px) ---
    addGround(2480, 820);
    for (let step = 0; step < 7; step++) {
      for (let hStep = 0; hStep <= step; hStep++) {
        blocks.push({
          id: 500 + step * 10 + hStep,
          x: 2700 + step * 32,
          y: 380 - (hStep + 1) * 32,
          w: 32,
          h: 32,
          type: "brick",
        });
      }
    }
    blocks.push({ id: 600, x: 3040, y: 348, w: 32, h: 32, type: "brick" });

    [120, 200, 280, 620, 750, 1160, 1220, 1500, 2550, 2620, 2800].forEach((cx, idx) => {
      levelCoins.push({ id: 400 + idx, x: cx, y: 320, collected: false });
    });

    return { blocks, enemies, coins: levelCoins };
  };

  const startNewGame = (customDiff?: "standard" | "kaizo") => {
    const activeDiff = customDiff || difficulty;
    const { blocks, enemies, coins: levelCoins } = buildLevel();

    engineState.current = {
      player: {
        x: 60,
        y: 300,
        w: 22,
        h: 30,
        vx: 0,
        vy: 0,
        grounded: false,
        facing: "right",
        isJumping: false,
        invulnerable: 0,
        deadAnim: false,
        deadTimer: 0,
      },
      cameraX: 0,
      blocks,
      enemies,
      coins: levelCoins,
      particles: [],
      flagpole: { x: 3050, y: 120, h: 260, flagY: 130, reached: false },
      castle: { x: 3120, y: 240, w: 120, h: 140 },
      animFrame: 0,
      score: 0,
      coinCount: 0,
      lives: activeDiff === "kaizo" ? 1 : 3,
      deaths: engineState.current.deaths,
      timeLeft: 300,
      timerCount: 0,
    };

    setScore(0);
    setCoins(0);
    setLives(activeDiff === "kaizo" ? 1 : 3);
    setTimeLeft(300);
    setGameState("playing");
    soundManager.playPowerup();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = true;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") {
        if (!keys.current.jump) soundManager.playJump();
        keys.current.jump = true;
      }
      if (e.key === "Shift" || e.key === "j" || e.key === "J") keys.current.run = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = false;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") keys.current.jump = false;
      if (e.key === "Shift" || e.key === "j" || e.key === "J") keys.current.run = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animId: number;

    const gameLoop = () => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;

      const state = engineState.current;
      state.animFrame++;

      if (gameState === "playing") {
        state.timerCount++;
        if (state.timerCount >= 60) {
          state.timerCount = 0;
          state.timeLeft = Math.max(0, state.timeLeft - 1);
          setTimeLeft(state.timeLeft);
          if (state.timeLeft <= 0) {
            handlePlayerDeath();
          }
        }
      }

      // Physics & Logic Updates
      if (gameState === "playing" && !state.player.deadAnim && !state.flagpole.reached) {
        const p = state.player;
        const maxSpeed = keys.current.run ? 5.2 : 3.4;
        const accel = keys.current.run ? 0.45 : 0.35;
        const friction = 0.82;
        const gravity = 0.58;

        if (keys.current.left) {
          p.vx = Math.max(p.vx - accel, -maxSpeed);
          p.facing = "left";
        } else if (keys.current.right) {
          p.vx = Math.min(p.vx + accel, maxSpeed);
          p.facing = "right";
        } else {
          p.vx *= friction;
          if (Math.abs(p.vx) < 0.1) p.vx = 0;
        }

        p.x += p.vx;

        for (const b of state.blocks) {
          if (b.type === "spike") continue;
          if (
            p.x < b.x + b.w &&
            p.x + p.w > b.x &&
            p.y < b.y + b.h &&
            p.y + p.h > b.y
          ) {
            if (p.vx > 0) p.x = b.x - p.w;
            else if (p.vx < 0) p.x = b.x + b.w;
            p.vx = 0;
          }
        }

        if (keys.current.jump && p.grounded && !p.isJumping) {
          p.vy = keys.current.run ? -11.5 : -10.2;
          p.grounded = false;
          p.isJumping = true;
        }
        if (!keys.current.jump && p.vy < -4) {
          p.vy = -4;
        }

        p.vy += gravity;
        p.y += p.vy;
        p.grounded = false;

        for (const b of state.blocks) {
          if (b.type === "spike") {
            if (
              p.x < b.x + b.w - 4 &&
              p.x + p.w > b.x + 4 &&
              p.y < b.y + b.h &&
              p.y + p.h > b.y + 4
            ) {
              handlePlayerDeath();
            }
            continue;
          }

          if (
            p.x < b.x + b.w &&
            p.x + p.w > b.x &&
            p.y < b.y + b.h &&
            p.y + p.h > b.y
          ) {
            if (p.vy > 0 && p.y + p.h - p.vy <= b.y + 10) {
              p.y = b.y - p.h;
              p.vy = 0;
              p.grounded = true;
              p.isJumping = false;

              if (b.type === "moving" && b.vx) {
                p.x += b.vx;
              }
            } else if (p.vy < 0 && p.y - p.vy >= b.y + b.h - 10) {
              p.y = b.y + b.h;
              p.vy = 1;
              soundManager.playBlockBump();

              if (b.type === "qblock" && !b.hit) {
                b.hit = true;
                b.bouncing = 6;
                soundManager.playPowerup();
                state.coinCount += 1;
                state.score += 200;
                setCoins(state.coinCount);
                setScore(state.score);
                state.particles.push({
                  x: b.x + 16,
                  y: b.y - 10,
                  vx: (Math.random() - 0.5) * 2,
                  vy: -4,
                  life: 30,
                  color: "#facc15",
                  size: 4,
                });
              } else if (b.type === "brick") {
                b.bouncing = 4;
              }
            }
          }
        }

        if (p.y > 450) {
          handlePlayerDeath();
        }

        state.cameraX = Math.max(0, p.x - 240);

        for (const b of state.blocks) {
          if (b.type === "moving" && b.vx && b.minX !== undefined && b.maxX !== undefined) {
            b.x += b.vx;
            if (b.x >= b.maxX || b.x <= b.minX) b.vx *= -1;
          }
          if (b.bouncing && b.bouncing > 0) b.bouncing -= 0.5;
        }

        for (const c of state.coins) {
          if (!c.collected && Math.abs(p.x + 10 - c.x) < 18 && Math.abs(p.y + 15 - c.y) < 22) {
            c.collected = true;
            soundManager.playCoin();
            state.coinCount += 1;
            state.score += 100;
            setCoins(state.coinCount);
            setScore(state.score);
          }
        }

        for (const e of state.enemies) {
          if (!e.alive) continue;

          if (e.type === "slime") {
            e.x += e.vx;
            for (const b of state.blocks) {
              if (b.type !== "spike" && e.x < b.x + b.w && e.x + e.w > b.x && e.y < b.y + b.h && e.y + e.h > b.y) {
                e.vx *= -1;
              }
            }
          } else if (e.type === "bat") {
            e.x += e.vx;
            if (e.originY) e.y = e.originY + Math.sin(state.animFrame * 0.08) * 35;
          } else if (e.type === "piranha") {
            if (e.originY) {
              e.animTimer = (e.animTimer || 0) + 0.04;
              e.y = e.originY - Math.abs(Math.sin(e.animTimer)) * 32;
            }
          }

          if (
            p.x < e.x + e.w &&
            p.x + p.w > e.x &&
            p.y < e.y + e.h &&
            p.y + p.h > e.y
          ) {
            if (p.vy > 0 && p.y + p.h - p.vy <= e.y + 8 && e.type !== "piranha") {
              e.alive = false;
              p.vy = -8.5;
              soundManager.playStomp();
              state.score += 300;
              setScore(state.score);
              for (let k = 0; k < 6; k++) {
                state.particles.push({
                  x: e.x + 12,
                  y: e.y + 12,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 3,
                  life: 20,
                  color: "#22c55e",
                  size: 3,
                });
              }
            } else if (p.invulnerable <= 0) {
              handlePlayerDamage();
            }
          }
        }

        if (p.invulnerable > 0) p.invulnerable--;

        const fp = state.flagpole;
        if (!fp.reached && p.x + p.w >= fp.x && p.x <= fp.x + 16 && p.y >= fp.y) {
          fp.reached = true;
          soundManager.playVictory();
          try {
            confetti({ particleCount: 80, spread: 80 });
          } catch {}
          setTimeout(() => setGameState("victory"), 3000);
        }
      }

      if (state.flagpole.reached && state.flagpole.flagY < 330) {
        state.flagpole.flagY += 3;
      }

      if (state.player.deadAnim) {
        state.player.deadTimer++;
        state.player.y += state.player.vy;
        state.player.vy += 0.5;
        if (state.player.deadTimer > 70) {
          if (state.lives > 0) {
            state.player.x = Math.max(60, state.cameraX - 50);
            state.player.y = 200;
            state.player.vx = 0;
            state.player.vy = 0;
            state.player.deadAnim = false;
            state.player.invulnerable = 90;
          } else {
            setGameState("gameover");
          }
        }
      }

      // Canvas Rendering
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      const cam = state.cameraX;

      const skyGrad = ctx.createLinearGradient(0, 0, 0, cvs.height);
      skyGrad.addColorStop(0, "#0c4a6e");
      skyGrad.addColorStop(0.5, "#0284c7");
      skyGrad.addColorStop(1, "#38bdf8");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.fillStyle = "#0369a1";
      ctx.beginPath();
      ctx.moveTo(0 - (cam * 0.2) % 400, 380);
      ctx.lineTo(150 - (cam * 0.2) % 400, 220);
      ctx.lineTo(300 - (cam * 0.2) % 400, 380);
      ctx.lineTo(450 - (cam * 0.2) % 400, 200);
      ctx.lineTo(600 - (cam * 0.2) % 400, 380);
      ctx.lineTo(750 - (cam * 0.2) % 400, 240);
      ctx.lineTo(900 - (cam * 0.2) % 400, 380);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      [100, 450, 800, 1300, 1800, 2300, 2800].forEach((cx, idx) => {
        const cloudX = cx - cam * 0.4;
        if (cloudX > -100 && cloudX < cvs.width + 100) {
          ctx.fillRect(cloudX, 60 + (idx % 3) * 25, 60, 20);
          ctx.fillRect(cloudX + 15, 45 + (idx % 3) * 25, 30, 15);
        }
      });

      for (const b of state.blocks) {
        const bx = b.x - cam;
        const by = b.y - (b.bouncing || 0);

        if (bx + b.w < 0 || bx > cvs.width) continue;

        if (b.type === "ground") {
          ctx.fillStyle = "#22c55e";
          ctx.fillRect(bx, by, b.w, 10);
          ctx.fillStyle = "#15803d";
          ctx.fillRect(bx, by + 10, b.w, 4);
          ctx.fillStyle = "#854d0e";
          ctx.fillRect(bx, by + 14, b.w, b.h - 14);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.strokeRect(bx, by, b.w, b.h);
        } else if (b.type === "brick") {
          ctx.fillStyle = "#b45309";
          ctx.fillRect(bx, by, b.w, b.h);
          ctx.fillStyle = "#d97706";
          ctx.fillRect(bx + 2, by + 2, b.w - 4, b.h - 4);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.strokeRect(bx, by, b.w, b.h);
        } else if (b.type === "qblock") {
          ctx.fillStyle = b.hit ? "#78350f" : "#eab308";
          ctx.fillRect(bx, by, b.w, b.h);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.strokeRect(bx, by, b.w, b.h);
          ctx.fillStyle = b.hit ? "#94a3b8" : "#ffffff";
          ctx.font = "bold 14px 'Press Start 2P', monospace";
          ctx.textAlign = "center";
          ctx.fillText(b.hit ? "•" : "?", bx + 16, by + 22);
        } else if (b.type === "pipe") {
          ctx.fillStyle = "#16a34a";
          ctx.fillRect(bx, by, b.w, b.h);
          ctx.fillStyle = "#4ade80";
          ctx.fillRect(bx + 4, by, 8, b.h);
          ctx.fillStyle = "#15803d";
          ctx.fillRect(bx + b.w - 8, by, 8, b.h);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.strokeRect(bx, by, b.w, b.h);
          ctx.strokeRect(bx - 2, by, b.w + 4, 16);
        } else if (b.type === "spike") {
          ctx.fillStyle = "#cbd5e1";
          for (let s = 0; s < b.w; s += 12) {
            ctx.beginPath();
            ctx.moveTo(bx + s, by + b.h);
            ctx.lineTo(bx + s + 6, by);
            ctx.lineTo(bx + s + 12, by + b.h);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        } else if (b.type === "moving") {
          ctx.fillStyle = "#0284c7";
          ctx.fillRect(bx, by, b.w, b.h);
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(bx + 2, by + 2, b.w - 4, 4);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.strokeRect(bx, by, b.w, b.h);
        }
      }

      for (const c of state.coins) {
        if (c.collected) continue;
        const cx = c.x - cam;
        if (cx > -20 && cx < cvs.width + 20) {
          ctx.fillStyle = "#facc15";
          ctx.beginPath();
          ctx.arc(cx + 8, c.y + 8, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ca8a04";
          ctx.beginPath();
          ctx.arc(cx + 8, c.y + 8, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const fp = state.flagpole;
      const fpx = fp.x - cam;
      if (fpx > -50 && fpx < cvs.width + 50) {
        ctx.fillStyle = "#94a3b8";
        ctx.fillRect(fpx + 6, fp.y, 4, fp.h);
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(fpx + 8, fp.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.moveTo(fpx + 8, fp.flagY);
        ctx.lineTo(fpx - 28, fp.flagY + 14);
        ctx.lineTo(fpx + 8, fp.flagY + 28);
        ctx.closePath();
        ctx.fill();
      }

      const cas = state.castle;
      const casX = cas.x - cam;
      if (casX > -150 && casX < cvs.width + 150) {
        ctx.fillStyle = "#64748b";
        ctx.fillRect(casX, cas.y, cas.w, cas.h);
        ctx.fillStyle = "#475569";
        ctx.fillRect(casX + 40, cas.y + 70, 40, 70);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.strokeRect(casX, cas.y, cas.w, cas.h);
      }

      for (const e of state.enemies) {
        if (!e.alive) continue;
        const ex = e.x - cam;
        if (ex < -40 || ex > cvs.width + 40) continue;

        if (e.type === "slime") {
          ctx.fillStyle = "#22c55e";
          ctx.fillRect(ex, e.y, e.w, e.h);
          ctx.fillStyle = "#15803d";
          ctx.fillRect(ex, e.y + e.h - 4, e.w, 4);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(ex + 4, e.y + 6, 4, 4);
          ctx.fillRect(ex + e.w - 8, e.y + 6, 4, 4);
          ctx.fillStyle = "#000000";
          ctx.fillRect(ex + 6, e.y + 6, 2, 4);
          ctx.fillRect(ex + e.w - 6, e.y + 6, 2, 4);
        } else if (e.type === "piranha") {
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(ex, e.y, e.w, e.h);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(ex + 4, e.y + 6, 4, 4);
          ctx.fillRect(ex + e.w - 8, e.y + 6, 4, 4);
        } else if (e.type === "bat") {
          ctx.fillStyle = "#6366f1";
          ctx.fillRect(ex, e.y, e.w, e.h);
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(ex + 6, e.y + 8, 3, 3);
          ctx.fillRect(ex + e.w - 9, e.y + 8, 3, 3);
        }
      }

      const p = state.player;
      const px = p.x - cam;
      const isBlinking = p.invulnerable > 0 && Math.floor(state.animFrame / 4) % 2 === 0;

      if (!isBlinking) {
        ctx.save();
        ctx.fillStyle = "#a16207";
        ctx.fillRect(px + 4, p.y + 2, 14, 6);
        ctx.fillStyle = "#fed7aa";
        ctx.fillRect(px + 4, p.y + 8, 14, 8);
        ctx.fillStyle = "#000000";
        if (p.facing === "right") {
          ctx.fillRect(px + 12, p.y + 10, 3, 3);
        } else {
          ctx.fillRect(px + 6, p.y + 10, 3, 3);
        }
        ctx.fillStyle = "#16a34a";
        ctx.fillRect(px + 4, p.y + 16, 14, 10);
        ctx.fillStyle = "#0284c7";
        if (p.facing === "right") {
          ctx.fillRect(px, p.y + 16, 4, 8);
        } else {
          ctx.fillRect(px + 18, p.y + 16, 4, 8);
        }
        ctx.fillStyle = "#78350f";
        ctx.fillRect(px + 4, p.y + 26, 5, 4);
        ctx.fillRect(px + 13, p.y + 26, 5, 4);
        ctx.restore();
      }

      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x - cam, pt.y, pt.size, pt.size);
        if (pt.life <= 0) state.particles.splice(i, 1);
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [gameState]);

  const handlePlayerDamage = () => {
    const state = engineState.current;
    state.lives -= 1;
    setLives(state.lives);

    if (state.lives <= 0 || difficulty === "kaizo") {
      handlePlayerDeath();
    } else {
      soundManager.playBeep(220, 0.15);
      state.player.invulnerable = 90;
      state.player.vy = -6;
    }
  };

  const handlePlayerDeath = () => {
    const state = engineState.current;
    if (state.player.deadAnim) return;

    soundManager.playDeath();
    state.deaths += 1;
    setDeaths(state.deaths);
    state.player.deadAnim = true;
    state.player.deadTimer = 0;
    state.player.vy = -11;
  };

  return (
    <div className="py-4 sm:py-6 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
      {/* 8-Bit Window Container */}
      <div className="bg-[#0f172a] border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[8px_8px_0px_#000000]">
        {/* Title Bar */}
        <div className="bg-[#9333ea] px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-black select-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-300 border border-black inline-block flex-shrink-0" />
            <h1 className="font-pixel text-[8px] sm:text-[10px] md:text-xs text-white tracking-wider font-bold truncate">
              ARCADE_STAGE: SUPER_ANDHIKA_BROS_KAIZO.EXE
            </h1>
          </div>
          <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[10px] flex-shrink-0">
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#7e22ce] text-white flex items-center justify-center border border-black">
              _
            </span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#7e22ce] text-white flex items-center justify-center border border-black">
              □
            </span>
            <Link
              href="/"
              onClick={() => soundManager.playWindowClose()}
              className="w-4 h-4 sm:w-5 sm:h-5 bg-[#991b1b] hover:bg-[#ef4444] text-white flex items-center justify-center border border-black cursor-pointer"
            >
              ✕
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-2.5 sm:p-5 md:p-6 bg-[#0a1622] space-y-3 sm:space-y-4 text-slate-100">
          {/* Top Mario Style Status HUD */}
          <div className="bg-[#111f30] p-2 sm:p-3 border-2 sm:border-4 border-black grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 font-pixel text-[7px] sm:text-[8px] md:text-[9px] text-center">
            <div className="text-yellow-400">
              <span className="block text-slate-400 text-[6px] sm:text-[8px]">PLAYER</span>
              <span className="truncate block">ANDHIKA</span>
            </div>
            <div className="text-white">
              <span className="block text-slate-400 text-[6px] sm:text-[8px]">SCORE</span>
              <span>{score.toString().padStart(6, "0")}</span>
            </div>
            <div className="text-yellow-300">
              <span className="block text-slate-400 text-[6px] sm:text-[8px]">COINS</span>
              <span>🪙 x {coins.toString().padStart(2, "0")}</span>
            </div>
            <div className="text-cyan-300">
              <span className="block text-slate-400 text-[6px] sm:text-[8px]">WORLD</span>
              <span>1-1 HARD</span>
            </div>
            <div className="text-red-400">
              <span className="block text-slate-400 text-[6px] sm:text-[8px]">LIVES</span>
              <span>{"❤️".repeat(Math.max(0, lives))}</span>
            </div>
            <div className="text-amber-400">
              <span className="block text-slate-400 text-[6px] sm:text-[8px]">DEATHS</span>
              <span>💀 {deaths}</span>
            </div>
          </div>

          {/* Difficulty & Mode Selector */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 font-pixel text-[7px] sm:text-[8px]">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 hidden xs:inline">MODE:</span>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setDifficulty("standard");
                  startNewGame("standard");
                }}
                className={`px-2 py-1 border border-black sm:border-2 cursor-pointer ${
                  difficulty === "standard"
                    ? "bg-[#0284c7] text-white font-bold shadow-[2px_2px_0px_#000]"
                    : "bg-[#1e293b] text-slate-400 hover:bg-[#334155]"
                }`}
              >
                STANDARD (3 ❤️)
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setDifficulty("kaizo");
                  startNewGame("kaizo");
                }}
                className={`px-2 py-1 border border-black sm:border-2 flex items-center gap-1 cursor-pointer ${
                  difficulty === "kaizo"
                    ? "bg-[#b91c1c] text-white font-bold shadow-[2px_2px_0px_#000]"
                    : "bg-[#1e293b] text-slate-400 hover:bg-[#334155]"
                }`}
              >
                <Flame className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                <span>KAIZO (1-HIT)</span>
              </button>
            </div>

            <span className="text-cyan-300 font-vt323 text-sm sm:text-base hidden md:inline">
              KONTROL: [A][D] Gerak | [W/Spasi] Lompat | [Shift] Sprint
            </span>
          </div>

          {/* 2D Canvas Viewport */}
          <div className="relative border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] overflow-hidden bg-black aspect-[16/9] max-h-[420px] w-full">
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              className="w-full h-full block"
              style={{ imageRendering: "pixelated" }}
            />

            {/* Start Screen Overlay */}
            {gameState === "idle" && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center space-y-2 sm:space-y-4">
                <h2 className="font-pixel text-base sm:text-2xl md:text-3xl text-yellow-400 drop-shadow-[2px_2px_0px_#000]">
                  SUPER ANDHIKA BROS
                </h2>
                <p className="font-pixel text-[8px] sm:text-xs text-red-400">
                  {difficulty === "kaizo" ? "🔥 KAIZO NIGHTMARE EDITION 🔥" : "⚡ HARDCORE PLATFORMER ⚡"}
                </p>
                <p className="font-vt323 text-base sm:text-xl text-slate-200 max-w-lg leading-snug">
                  Taklukkan jurang maut, tanaman pemangsa di pipa, duri jebakan, dan kelelawar untuk mencapai tiang bendera!
                </p>
                <button
                  onClick={() => startNewGame()}
                  className="px-5 sm:px-8 py-2.5 sm:py-3 bg-[#22c55e] hover:bg-[#16a34a] text-black font-pixel text-[9px] sm:text-xs md:text-sm border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] active:translate-y-1 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>START ADVENTURE (1-1)</span>
                </button>
              </div>
            )}

            {/* Game Over Screen Overlay */}
            {gameState === "gameover" && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center space-y-2 sm:space-y-3">
                <h2 className="font-pixel text-xl sm:text-3xl text-red-500">
                  GAME OVER!
                </h2>
                <p className="font-pixel text-[8px] sm:text-xs text-yellow-400">
                  TOTAL DEATHS: {deaths} 💀 | FINAL SCORE: {score}
                </p>
                <p className="font-vt323 text-base sm:text-lg text-slate-300">
                  Setiap kegagalan adalah insight untuk lompatan berikutnya.
                </p>
                <button
                  onClick={() => startNewGame()}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#eab308] hover:bg-[#ca8a04] text-black font-pixel text-[8px] sm:text-xs border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] active:translate-y-1 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>RETRY STAGE 1-1</span>
                </button>
              </div>
            )}

            {/* Victory Screen Overlay */}
            {gameState === "victory" && (
              <div className="absolute inset-0 bg-[#064e3b]/90 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center space-y-2 sm:space-y-4 animate-in fade-in">
                <h2 className="font-pixel text-xl sm:text-3xl text-yellow-300">
                  STAGE CLEAR! 🏆
                </h2>
                <p className="font-pixel text-[8px] sm:text-xs text-green-300">
                  SELAMAT! ANDA BERHASIL MENAKLUKKAN STAGE SULIT KAIZO!
                </p>
                <div className="bg-[#0f172a] p-2 sm:p-3 border-2 border-black font-pixel text-[8px] sm:text-xs space-y-1 text-white">
                  <div>SKOR AKHIR: {score + 5000}</div>
                  <div className="text-yellow-400">KOIN TERKUMPUL: {coins}</div>
                  <div className="text-red-400">TOTAL DEATHS: {deaths}</div>
                </div>
                <button
                  onClick={() => startNewGame()}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#facc15] hover:bg-[#eab308] text-black font-pixel text-[8px] sm:text-xs border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] active:translate-y-1 font-bold cursor-pointer"
                >
                  MAIN ULANG / TINGKATKAN SKOR
                </button>
              </div>
            )}
          </div>

          {/* Virtual Gamepad for Mobile */}
          <div className="bg-[#111f30] p-2 sm:p-3 border-2 sm:border-4 border-black flex items-center justify-between gap-2 sm:gap-4">
            {/* Left D-Pad */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onTouchStart={() => (keys.current.left = true)}
                onTouchEnd={() => (keys.current.left = false)}
                onMouseDown={() => (keys.current.left = true)}
                onMouseUp={() => (keys.current.left = false)}
                className="w-12 h-10 sm:w-16 sm:h-14 bg-[#1e3a5f] active:bg-[#2563eb] text-white font-pixel text-base sm:text-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center select-none cursor-pointer"
              >
                ◀
              </button>
              <button
                onTouchStart={() => (keys.current.right = true)}
                onTouchEnd={() => (keys.current.right = false)}
                onMouseDown={() => (keys.current.right = true)}
                onMouseUp={() => (keys.current.right = false)}
                className="w-12 h-10 sm:w-16 sm:h-14 bg-[#1e3a5f] active:bg-[#2563eb] text-white font-pixel text-base sm:text-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center select-none cursor-pointer"
              >
                ▶
              </button>
            </div>

            {/* Quick Tips */}
            <div className="hidden md:block text-center font-vt323 text-sm text-slate-400">
              💡 Tip: Tahan tombol lompat untuk loncat lebih tinggi. Tahan tombol Run untuk lari kencang!
            </div>

            {/* Action Buttons (A: Jump, B: Run) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onTouchStart={() => (keys.current.run = true)}
                onTouchEnd={() => (keys.current.run = false)}
                onMouseDown={() => (keys.current.run = true)}
                onMouseUp={() => (keys.current.run = false)}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#d97706] active:bg-[#f59e0b] text-black font-pixel text-[8px] sm:text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center select-none cursor-pointer font-bold"
              >
                RUN
              </button>
              <button
                onTouchStart={() => {
                  keys.current.jump = true;
                  soundManager.playJump();
                }}
                onTouchEnd={() => (keys.current.jump = false)}
                onMouseDown={() => {
                  keys.current.jump = true;
                  soundManager.playJump();
                }}
                onMouseUp={() => (keys.current.jump = false)}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#16a34a] active:bg-[#22c55e] text-white font-pixel text-[9px] sm:text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center select-none cursor-pointer font-bold"
              >
                JUMP
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 border-t-2 border-slate-700">
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
              <span>LANJUT KE KONTAK</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
