"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

type Props = {
  to: number;
  suffix?: string;
  duration?: number;
};

export function CountUp({ to, suffix = "", duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const raw = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(raw, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // ease-out expo
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView, to, duration, suffix, raw]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}
