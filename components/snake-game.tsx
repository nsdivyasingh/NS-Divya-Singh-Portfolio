"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ── Constants ──────────────────────────────────────────────────────────────────
const COLS = 20;
const ROWS = 20;
const CHALLENGE_SCORE = 46;

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
interface Pt { x: number; y: number }
type Status = "idle" | "playing" | "over";

const FLIP: Record<Dir, Dir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
const STEP: Record<Dir, Pt> = {
  UP: { x: 0, y: -1 }, DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 }, RIGHT: { x: 1, y: 0 },
};

// Starts at 220ms; speeds up 12ms every 5 points; floors at 80ms
function tickSpeed(score: number) {
  return Math.max(80, 220 - Math.floor(score / 5) * 12);
}

function spawnFood(snake: Pt[]): Pt {
  const free: Pt[] = [];
  for (let x = 0; x < COLS; x++)
    for (let y = 0; y < ROWS; y++)
      if (!snake.some(s => s.x === x && s.y === y)) free.push({ x, y });
  return free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 };
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ── Confetti ──────────────────────────────────────────────────────────────────
const CC = ["#ff2a2a", "#ff7070", "#ffaaaa", "#ffffff", "#ff4444", "#ffcccc", "#cc1a1a", "#ff9999"];

interface CP {
  x: number; y: number;
  vx: number; vy: number;
  color: string; size: number;
  rotation: number; rotSpeed: number;
  alpha: number; alphaDecay: number;
  isRect: boolean;
}

function ConfettiCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: CP[] = [];
    for (let i = 0; i < 90; i++) {
      const fromLeft = i < 45;
      const speed = 9 + Math.random() * 13;
      const spread = (20 + Math.random() * 65) * (Math.PI / 180);
      particles.push({
        x: fromLeft ? 10 + Math.random() * 90 : canvas.width - 10 - Math.random() * 90,
        y: canvas.height + 10,
        vx: fromLeft
          ? Math.sin(spread) * speed * (0.4 + Math.random() * 0.8)
          : -Math.sin(spread) * speed * (0.4 + Math.random() * 0.8),
        vy: -(Math.cos(spread) * speed * (0.7 + Math.random() * 0.5)),
        color: CC[Math.floor(Math.random() * CC.length)],
        size: 5 + Math.random() * 9,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.28,
        alpha: 1,
        alphaDecay: 0.005 + Math.random() * 0.004,
        isRect: Math.random() > 0.38,
      });
    }

    const ctx = canvas.getContext("2d")!;
    let frame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        if (p.alpha <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.27;
        p.vx *= 0.992;
        p.rotation += p.rotSpeed;
        p.alpha -= p.alphaDecay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.isRect) {
          ctx.fillRect(-p.size / 2, -p.size * 0.3, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}

// ── D-pad ──────────────────────────────────────────────────────────────────────
function DPad({ onDir }: { onDir: (d: Dir) => void }) {
  const btn = (label: string, d: Dir) => (
    <button
      key={d}
      type="button"
      onClick={() => onDir(d)}
      style={{ touchAction: "manipulation" }}
      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-xl flex items-center justify-center hover:bg-[#ff2a2a]/20 hover:text-white hover:border-[#ff2a2a]/40 active:scale-90 active:bg-[#ff2a2a]/30 transition-all duration-100 select-none"
    >
      {label}
    </button>
  );
  return (
    <div className="flex flex-col items-center gap-1.5 mt-6">
      {btn("▲", "UP")}
      <div className="flex gap-1.5">
        {btn("◀", "LEFT")}
        <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
          <span className="text-white/10 text-xs font-bold">●</span>
        </div>
        {btn("▶", "RIGHT")}
      </div>
      {btn("▼", "DOWN")}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const G = useRef({
    snake: [{ x: 10, y: 10 }] as Pt[],
    dir: "RIGHT" as Dir,
    nextDir: "RIGHT" as Dir,
    food: { x: 5, y: 5 } as Pt,
    score: 0,
    highScore: CHALLENGE_SCORE,
    status: "idle" as Status,
    timer: null as ReturnType<typeof setTimeout> | null,
  });

  const [uiStatus, setUiStatus] = useState<Status>("idle");
  const [uiScore, setUiScore] = useState(0);
  const [uiHigh, setUiHigh] = useState(CHALLENGE_SCORE);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  // Load persisted high score on mount (localStorage is client-only)
  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem("snakeHighScore") ?? "0") || 0;
      const initial = Math.max(stored, CHALLENGE_SCORE);
      G.current.highScore = initial;
      setUiHigh(initial);
    } catch {}
  }, []);

  // Auto-hide confetti canvas after animation
  useEffect(() => {
    if (!showConfetti) return;
    const t = setTimeout(() => setShowConfetti(false), 5500);
    return () => clearTimeout(t);
  }, [showConfetti]);

  // ── Renderer ──────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { snake, food, dir, status } = G.current;
    const W = canvas.width;
    const H = canvas.height;
    const cw = W / COLS;
    const ch = H / ROWS;

    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 0.5;
    for (let i = 1; i < COLS; i++) {
      ctx.beginPath(); ctx.moveTo(i * cw, 0); ctx.lineTo(i * cw, H); ctx.stroke();
    }
    for (let j = 1; j < ROWS; j++) {
      ctx.beginPath(); ctx.moveTo(0, j * ch); ctx.lineTo(W, j * ch); ctx.stroke();
    }

    const fx = food.x * cw + cw / 2;
    const fy = food.y * ch + ch / 2;
    const fr = Math.min(cw, ch) * 0.36;
    ctx.save();
    ctx.shadowColor = "#ff2a2a";
    ctx.shadowBlur = 16;
    const foodGrad = ctx.createRadialGradient(fx - fr * 0.3, fy - fr * 0.3, fr * 0.05, fx, fy, fr);
    foodGrad.addColorStop(0, "#ff8080");
    foodGrad.addColorStop(1, "#cc1a1a");
    ctx.fillStyle = foodGrad;
    ctx.beginPath();
    ctx.arc(fx, fy, fr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const pad = Math.max(1.5, Math.min(cw, ch) * 0.1);
    const radius = Math.min(cw, ch) * 0.28;
    snake.forEach((seg, i) => {
      const t = snake.length > 1 ? i / (snake.length - 1) : 0;
      const rv = Math.round(255 - t * 55);
      const gv = Math.round(170 - t * 100);
      const bv = Math.round(170 - t * 100);
      ctx.fillStyle = `rgb(${rv},${gv},${bv})`;
      rrect(ctx, seg.x * cw + pad, seg.y * ch + pad, cw - pad * 2, ch - pad * 2, radius);
      ctx.fill();
    });

    if (snake.length > 0) {
      const h = snake[0];
      const hx = h.x * cw + cw / 2;
      const hy = h.y * ch + ch / 2;
      const er = Math.min(cw, ch) * 0.09;
      const eo = Math.min(cw, ch) * 0.21;
      const eyes: [Pt, Pt] =
        dir === "RIGHT" ? [{ x: hx + eo * 0.5, y: hy - eo }, { x: hx + eo * 0.5, y: hy + eo }]
        : dir === "LEFT" ? [{ x: hx - eo * 0.5, y: hy - eo }, { x: hx - eo * 0.5, y: hy + eo }]
        : dir === "UP"   ? [{ x: hx - eo, y: hy - eo * 0.5 }, { x: hx + eo, y: hy - eo * 0.5 }]
                         : [{ x: hx - eo, y: hy + eo * 0.5 }, { x: hx + eo, y: hy + eo * 0.5 }];
      ctx.fillStyle = "#1a0000";
      eyes.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, er, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    if (status === "over") {
      ctx.fillStyle = "rgba(10,0,0,0.65)";
      ctx.fillRect(0, 0, W, H);
    }
  }, []);

  // ── Game loop ──────────────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    const g = G.current;
    if (g.timer) clearTimeout(g.timer);

    const startSnake: Pt[] = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];
    g.snake = startSnake;
    g.dir = "RIGHT";
    g.nextDir = "RIGHT";
    g.food = spawnFood(startSnake);
    g.score = 0;
    g.status = "playing";

    setUiScore(0);
    setUiStatus("playing");
    draw();

    function tick() {
      const g = G.current;
      if (g.status !== "playing") return;

      if (g.nextDir !== FLIP[g.dir]) g.dir = g.nextDir;

      const d = STEP[g.dir];
      const nh: Pt = { x: g.snake[0].x + d.x, y: g.snake[0].y + d.y };

      const hitWall = nh.x < 0 || nh.x >= COLS || nh.y < 0 || nh.y >= ROWS;
      const hitSelf = g.snake.slice(0, -1).some(s => s.x === nh.x && s.y === nh.y);

      if (hitWall || hitSelf) {
        g.status = "over";
        if (g.score > g.highScore) {
          g.highScore = g.score;
          try { localStorage.setItem("snakeHighScore", String(g.score)); } catch {}
          setUiHigh(g.score);
          setConfettiKey(k => k + 1);
          setShowConfetti(true);
        }
        setUiStatus("over");
        draw();
        return;
      }

      const ate = nh.x === g.food.x && nh.y === g.food.y;
      g.snake = [nh, ...g.snake];
      if (ate) {
        g.score++;
        setUiScore(g.score);
        g.food = spawnFood(g.snake);
      } else {
        g.snake.pop();
      }

      draw();
      g.timer = setTimeout(tick, tickSpeed(g.score));
    }

    g.timer = setTimeout(tick, tickSpeed(0));
  }, [draw]);

  // ── Keyboard ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const MAP: Record<string, Dir> = {
      ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
    };
    const onKey = (e: KeyboardEvent) => {
      if (!MAP[e.key]) return;
      e.preventDefault();
      const g = G.current;
      if (g.status !== "playing") startGame();
      else g.nextDir = MAP[e.key];
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [startGame]);

  // ── Swipe on canvas + prevent page scroll while playing ───────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let sx = 0, sy = 0;

    const onTouchStart = (e: TouchEvent) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    // Non-passive so we can call preventDefault() and stop page scrolling during play
    const onTouchMove = (e: TouchEvent) => {
      if (G.current.status === "playing") e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.hypot(dx, dy) < 12) return;
      const g = G.current;
      if (g.status !== "playing") { startGame(); return; }
      g.nextDir = Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 ? "RIGHT" : "LEFT")
        : (dy > 0 ? "DOWN" : "UP");
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [startGame]);

  // ── Canvas resize + initial draw ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const resize = () => {
      const size = Math.min(wrap.clientWidth, 480);
      canvas.width = size;
      canvas.height = size;
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  // ── Cleanup on unmount ─────────────────────────────────────────────────────────
  useEffect(() => {
    return () => { const g = G.current; if (g.timer) clearTimeout(g.timer); };
  }, []);

  const handleDir = useCallback((d: Dir) => {
    const g = G.current;
    if (g.status !== "playing") startGame();
    else g.nextDir = d;
  }, [startGame]);

  return (
    <>
      <ConfettiCanvas key={confettiKey} active={showConfetti} />
      <section id="snake" className="bg-[#0a0a0a] w-full py-20 md:py-28 px-6 relative overflow-hidden border-t border-white/5">
        <div className="max-w-lg mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-block border border-white/10 rounded-full px-4 py-1 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-5">
              Arcade
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2">
              Snake
            </h2>
            <p className="text-white/40 text-sm font-medium">
              Eat the red ball to grow · Hit a wall or yourself and it&apos;s over
            </p>
          </motion.div>

          {/* Score bar */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">
              Score <span className="text-[#ff2a2a] ml-1 tabular-nums">{uiScore}</span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/30">
              Best <span className="text-white/50 ml-1 tabular-nums">{uiHigh}</span>
            </span>
          </div>

          {/* Challenge message */}
          <p className="text-center text-[11px] text-white/20 font-medium mb-3 tracking-wide">
            Somebody scored {uiHigh} — try beating it!
          </p>

          {/* Canvas */}
          <div
            ref={wrapRef}
            className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#111]"
          >
            <canvas ref={canvasRef} className="block w-full" />

            {uiStatus !== "playing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-[2px]">
                {uiStatus === "over" && (
                  <>
                    <p className="text-[#ff2a2a] text-xl font-black uppercase tracking-[0.15em]">
                      Game Over
                    </p>
                    <p className="text-white/40 text-sm tabular-nums">Score: {uiScore}</p>
                  </>
                )}
                <button
                  onClick={startGame}
                  style={{ touchAction: "manipulation" }}
                  className="mt-1 px-8 py-3 rounded-full bg-[#ff2a2a] text-white text-sm font-bold hover:bg-red-600 active:scale-95 transition-all duration-150 shadow-[0_0_24px_rgba(255,42,42,0.4)]"
                >
                  {uiStatus === "idle" ? "Start Game" : "Play Again"}
                </button>
                {uiStatus === "idle" && (
                  <p className="text-white/20 text-xs mt-1">
                    Press any arrow key or tap Start
                  </p>
                )}
              </div>
            )}
          </div>

          {/* D-pad */}
          <DPad onDir={handleDir} />
          <p className="mt-3 text-white/20 text-xs text-center">
            Swipe the canvas · use the D-pad · or press arrow keys
          </p>
        </div>
      </section>
    </>
  );
}
