"use client";

import { useEffect, useId, useRef } from "react";
import "./curved-loop.css";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  curveAmount?: number;
  direction?: "left" | "right";
  className?: string;
}

export function CurvedLoop({
  marqueeText = "Build what matters ✦ Ship with confidence ✦ Stay curious ✦ Never stop creating ✦ ",
  speed = 3.5,
  curveAmount = 360,
  direction = "left",
  className = "",
}: CurvedLoopProps) {
  const rawId = useId();
  const pathId = `cl-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  const measureRef = useRef<SVGTextPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const pathElRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number>(0);

  const viewH = 40 + (curveAmount / 2) + 40;
  const curvePath = `M-100,40 Q720,${40 + curveAmount} 1540,40`;

  useEffect(() => {
    const pathEl = pathElRef.current;
    const measureEl = measureRef.current;
    const textPathEl = textPathRef.current;
    if (!pathEl || !measureEl || !textPathEl) return;

    let offset = 0;
    const baseVel = speed * (direction === "left" ? -1 : 1);
    let vel = baseVel;

    const startLoop = () => {
      const pathLen = pathEl.getTotalLength();
      const repLen = measureEl.getComputedTextLength();

      if (pathLen > 0 && repLen > 0) {
        // Calculate the number of repetitions needed to fully cover the path
        const repsNeeded = Math.max(10, Math.ceil(pathLen / repLen) + 5);
        textPathEl.textContent = marqueeText.repeat(repsNeeded);

        const speedScale = pathLen / 100;

        const tick = () => {
          vel += (baseVel - vel) * 0.06;
          offset += vel * speedScale * 0.04;
          
          // Seamless wrap: offset goes between 0 and repLen
          const wrappedOffset = ((offset % repLen) + repLen) % repLen;
          
          // Shift left by exactly 3 repetitions to ensure the start is always off-screen/covered
          const finalOffset = wrappedOffset - 3 * repLen;
          
          textPathEl.setAttribute("startOffset", `${finalOffset}`);
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // Wait for fonts so getComputedTextLength() returns accurate values
    document.fonts.ready.then(startLoop).catch(startLoop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, direction, curveAmount, marqueeText]);

  return (
    <div className={`curved-loop-jacket ${className}`}>
      <svg
        className="curved-loop-svg"
        viewBox={`0 0 1440 ${viewH}`}
        style={{ aspectRatio: `1440 / ${viewH}` }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <path ref={pathElRef} id={pathId} d={curvePath} />
        </defs>

        {/* Hidden single-rep: measures how much of the path one repetition occupies */}
        <text style={{ visibility: "hidden" }} aria-hidden="true">
          <textPath ref={measureRef} href={`#${pathId}`} startOffset="0%">
            {marqueeText}
          </textPath>
        </text>

        {/* Visible text — reps will be updated dynamically in useEffect */}
        <text>
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0%">
            {marqueeText.repeat(10)}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
