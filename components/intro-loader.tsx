"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type IntroLoaderProps = {
  onComplete: () => void;
};

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: onComplete,
      });

      tl.fromTo(
        fillRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 2.5 },
      )
        .to({}, { duration: 0.08 })
        .to(rootRef.current, { yPercent: -100, duration: 1, ease: "power3.inOut" });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-primaryRed"
      aria-live="polite"
    >
      <h1 className="relative text-center text-[clamp(1.5rem,10vw,5rem)] font-extrabold uppercase tracking-[0.12em]">
        <span className="text-transparent [text-stroke:2px_rgba(255,255,255,0.38)] [-webkit-text-stroke:2px_rgba(255,255,255,0.38)]">
          NS Divya Singh.
        </span>
        <span
          ref={fillRef}
          className="absolute inset-0 text-white"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          NS Divya Singh.
        </span>
      </h1>
    </div>
  );
}
