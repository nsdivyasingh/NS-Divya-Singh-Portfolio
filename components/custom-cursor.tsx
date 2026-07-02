"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Ring trails with spring — dot follows instantly
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.4 });

  useEffect(() => {
    // Only activate on pointer devices — safe to call window here (client only)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setReady(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    // Detect interactive elements for the expanded hover state
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [mouseX, mouseY]);

  if (!ready) return null;

  return (
    <>
      {/* Dot — snaps to cursor instantly, shrinks on hover (ring takes focus) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#ff2a2a]"
        style={{
          width: 7,
          height: 7,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />

      {/* Ring — spring-lagged, expands + fills slightly on hover */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-[#ff2a2a]"
        style={{
          width: 36,
          height: 36,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicking ? 0.85 : hovering ? 1.5 : 1,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? "rgba(255,42,42,0.9)" : "rgba(255,42,42,0.45)",
          backgroundColor: hovering ? "rgba(255,42,42,0.08)" : "rgba(255,42,42,0)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </>
  );
}
