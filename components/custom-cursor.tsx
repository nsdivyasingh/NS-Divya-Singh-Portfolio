"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Sections that have dark/red backgrounds → white cursor
const DARK_SECTIONS = new Set(["hero", "contact"]);
// Sections that have light backgrounds → red cursor
const LIGHT_SECTIONS = new Set(["about", "expertise", "skills", "projects", "research", "blog"]);

export function CustomCursor() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [onDarkBg, setOnDarkBg] = useState(true); // hero is first section

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setReady(true);

    let isFirstMove = true;

    // Mouse tracking
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (isFirstMove) {
        ringX.jump(e.clientX);
        ringY.jump(e.clientY);
        isFirstMove = false;
        setVisible(true);
        document.documentElement.classList.add("has-custom-cursor");
      }
    };
    const onEnter = () => {
      setVisible(true);
      document.documentElement.classList.add("has-custom-cursor");
    };
    const onLeave = () => {
      setVisible(false);
      document.documentElement.classList.remove("has-custom-cursor");
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select, label'))
        setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select, label'))
        setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // Section-aware background detection → switch cursor color
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (DARK_SECTIONS.has(id)) setOnDarkBg(true);
          else if (LIGHT_SECTIONS.has(id)) setOnDarkBg(false);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    [...DARK_SECTIONS, ...LIGHT_SECTIONS].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      observer.disconnect();
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [mouseX, mouseY, ringX, ringY]);

  if (!ready) return null;

  const dotColor = onDarkBg ? "#ffffff" : "#ff2a2a";
  const ringColor = onDarkBg ? "rgba(255,255,255,0.65)" : "rgba(255,42,42,0.65)";
  const ringHoverColor = onDarkBg ? "rgba(255,255,255,0.9)" : "rgba(255,42,42,0.9)";
  const ringHoverBg = onDarkBg ? "rgba(255,255,255,0.08)" : "rgba(255,42,42,0.08)";

  return (
    <>
      {/* Dot — snaps instantly, shrinks on hover */}
      <motion.div
        className="fixed top-0 left-0 z-[10010] pointer-events-none rounded-full"
        style={{
          width: 10,
          height: 10,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicking ? 0.4 : hovering ? 0 : 1,
          opacity: visible ? 1 : 0,
          backgroundColor: dotColor,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      {/* Ring — spring-lagged, expands on hover */}
      <motion.div
        className="fixed top-0 left-0 z-[10009] pointer-events-none rounded-full border-2"
        style={{
          width: 40,
          height: 40,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicking ? 0.75 : hovering ? 1.5 : 1,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? ringHoverColor : ringColor,
          backgroundColor: hovering ? ringHoverBg : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
