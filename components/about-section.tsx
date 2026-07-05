"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/count-up";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "20+", label: "Projects" },
  { value: "5+", label: "Research Publications" },
  { value: "10+", label: "Hackathons" },
  { value: "2+", label: "Years Building" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgWord = bgWordRef.current;
    if (!section || !bgWord) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgWord,
        { x: -100 },
        {
          x: 100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-warmOffWhite"
    >
      <span
        ref={bgWordRef}
        aria-hidden
        className="pointer-events-none absolute left-[20px] top-[6%] select-none font-extrabold uppercase leading-none tracking-[-0.05em] text-[#9D0409] will-change-transform"
        style={{ fontSize: "250px", opacity: 0.15}}
      >
        ABOUT
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-16 py-24">
        {/* Heading + copy */}
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentRed">
              01
            </p>
            <h2 className="mt-3 text-[42px] font-extrabold leading-[1.05] tracking-[-0.04em] text-textPrimary">
              About Me
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <p className="text-[18px] leading-[1.7] text-textSecondary">
              I&apos;m an AI Engineer and Researcher passionate about building
              intelligent systems, publishing impactful research, and turning
              ideas into real-world products.
            </p>
            <p className="text-[18px] leading-[1.7] text-textSecondary">
              My work spans AI/ML, full-stack development, research,
              hackathons, and startup projects.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl border border-lightBeige bg-cardWhite px-8 py-10 shadow-sm hover:border-red-400 hover:shadow-[0_15px_30px_rgba(255,42,42,0.06)] transition-all duration-500 cursor-default"
            >
              <p className="text-[40px] font-extrabold leading-none tracking-[-0.04em] text-accentRed">
                <CountUp
                  to={parseInt(stat.value)}
                  suffix={stat.value.replace(/[0-9]/g, "")}
                />
              </p>
              <p className="mt-3 text-[15px] font-medium leading-snug text-textSecondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
