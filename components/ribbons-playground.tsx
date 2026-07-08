"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Ribbons } from "./ribbons";

const RED_PALETTE = ["#ff2a2a", "#ff7070", "#cc1a1a", "#ff4d4d", "#990f0f"];

interface SliderProps {
  label: string;
  liveValue: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onLive: (v: number) => void;
  onCommit: (v: number) => void;
}

function ControlSlider({ label, liveValue, min, max, step, display, onLive, onCommit }: SliderProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-white/50 text-xs font-bold uppercase tracking-widest">{label}</span>
        <span className="text-[#ff2a2a] text-xs font-bold tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        aria-label={label}
        value={liveValue}
        onChange={(e) => onLive(Number(e.target.value))}
        onMouseUp={(e) => onCommit(Number((e.target as HTMLInputElement).value))}
        onTouchEnd={(e) => onCommit(Number((e.target as HTMLInputElement).value))}
        className="w-full h-1 appearance-none rounded-full bg-white/20 cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#ff2a2a]
          [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(255,42,42,0.5)]
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:bg-[#ff2a2a]"
      />
    </div>
  );
}

export function RibbonsPlayground() {
  const [count, setCount] = useState(3);

  // Committed values — trigger Ribbons reinit when changed (on slider release)
  const [thickness, setThickness] = useState(30);
  const [speed, setSpeed] = useState(0.6);
  const [trail, setTrail] = useState(500);

  // Live values — update the label while dragging, don't touch the canvas
  const [liveThickness, setLiveThickness] = useState(30);
  const [liveSpeed, setLiveSpeed] = useState(0.6);
  const [liveTrail, setLiveTrail] = useState(500);

  // Stable reference — only changes when count changes
  const colors = useMemo(() => RED_PALETTE.slice(0, count), [count]);

  // Canvas remounts when any committed value or count changes
  const canvasKey = `${count}-${thickness}-${speed}-${trail}`;

  return (
    <section className="bg-[#0a0a0a] w-full py-20 md:py-28 px-6 relative overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-block border border-white/10 rounded-full px-4 py-1 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-5">
            Just for Fun
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Play with Ribbons
          </h2>
          <p className="text-white/40 text-sm font-medium">
            Move your mouse (or drag on mobile) across the canvas below.
          </p>
        </motion.div>

        {/* Canvas */}
        <motion.div
          key={canvasKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#111]"
          style={{ height: "clamp(300px, 50vh, 520px)" }}
        >
          <Ribbons
            colors={colors}
            baseThickness={thickness}
            speedMultiplier={speed}
            maxAge={trail}
            enableFade={false}
            enableShaderEffect={false}
          />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {/* Ribbon count */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Ribbons</span>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 ${
                    count === n
                      ? "bg-[#ff2a2a] text-white shadow-[0_0_12px_rgba(255,42,42,0.4)]"
                      : "bg-white/10 text-white/40 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <ControlSlider
            label="Thickness"
            liveValue={liveThickness}
            display={String(liveThickness)}
            min={8}
            max={80}
            step={1}
            onLive={setLiveThickness}
            onCommit={(v) => { setThickness(v); setLiveThickness(v); }}
          />

          <ControlSlider
            label="Speed"
            liveValue={liveSpeed}
            display={liveSpeed.toFixed(1)}
            min={0.1}
            max={2.0}
            step={0.1}
            onLive={setLiveSpeed}
            onCommit={(v) => { setSpeed(v); setLiveSpeed(v); }}
          />

          <ControlSlider
            label="Length"
            liveValue={liveTrail}
            display={String(liveTrail)}
            min={80}
            max={1000}
            step={20}
            onLive={setLiveTrail}
            onCommit={(v) => { setTrail(v); setLiveTrail(v); }}
          />
        </motion.div>

        <p className="mt-4 text-white/20 text-xs text-center">
          Drag sliders to preview — release to apply to the canvas.
        </p>
      </div>
    </section>
  );
}
