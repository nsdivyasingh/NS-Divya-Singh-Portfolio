"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ParticleCard } from "./magic-bento";

const education = {
  degree: "BE in Artificial Intelligence and Machine Learning",
  institution: "AMC Engineering College",
  location: "Bangalore, Karnataka",
  period: "Dec 2022 – May 2026",
  cgpa: "9 / 10",
  university: "Visvesvaraya Technological University",
};

const experiences = [
  {
    role: "Technology Consultant Intern",
    org: "InferWorks",
    location: "Bangalore",
    period: "Feb 2026 – Present",
    current: true,
    tag: null,
    highlights: [
      "Evaluated and optimized enterprise AI chatbot systems for workflow efficiency, response quality, and business automation use cases",
      "Built and integrated API-driven automation pipelines, contributing to a 30% reduction in reporting turnaround time",
      "Supported deployment and testing of AI-driven reporting, lead generation, and operational automation workflows",
      "Collaborated with cross-functional teams to improve enterprise AI system reliability and automation performance",
    ],
  },
  {
    role: "AI Research & Development Intern",
    org: "Learners Byte",
    location: "Hyderabad",
    period: "Jan 2026 – Apr 2026",
    current: false,
    tag: "VTU Final Year Internship · Bharat Unnati AI Fellowship",
    highlights: [
      "Built RevenuePilot AI — a multi-agent revenue intelligence system automating strategic business analysis and executive reporting",
      "Engineered 6 specialized AI agents (Industry Intelligence, SWOT Analysis, Competitor Benchmarking, Revenue Optimization) on n8n",
      "Integrated Google Gemini API, Google Sheets API, and Gmail automation for end-to-end business intelligence delivery",
      "Designed HTML-to-PDF executive report workflows tested on Starbucks, Nike, Netflix, Uber, and Airbnb case studies",
    ],
  },
  {
    role: "Web Development Intern",
    org: "VisionAstraa Startup Academy",
    location: "Bangalore",
    period: "Aug 2024 – Apr 2025",
    current: false,
    tag: null,
    highlights: [
      "Built and deployed responsive production websites with 95%+ mobile compatibility",
      "Improved frontend performance and optimized page load speeds through UI optimization",
    ],
  },
  {
    role: "Member",
    org: "AMC Math Club",
    location: "AMC Engineering College",
    period: "2022 – Present",
    current: false,
    tag: null,
    highlights: [
      "Active participant in mathematical problem-solving sessions and inter-college competitions",
    ],
  },
];

function glowHandlers() {
  function applyGlow(el: HTMLDivElement, clientX: number, clientY: number) {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${((clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--glow-y", `${((clientY - r.top) / r.height) * 100}%`);
    el.style.setProperty("--glow-intensity", "1");
  }
  return {
    onMouseMove(e: React.MouseEvent<HTMLDivElement>) { applyGlow(e.currentTarget, e.clientX, e.clientY); },
    onMouseLeave(e: React.MouseEvent<HTMLDivElement>) { e.currentTarget.style.setProperty("--glow-intensity", "0"); },
    onTouchStart(e: React.TouchEvent<HTMLDivElement>) { const t = e.touches[0]; if (t) applyGlow(e.currentTarget, t.clientX, t.clientY); },
    onTouchMove(e: React.TouchEvent<HTMLDivElement>) { const t = e.touches[0]; if (t) applyGlow(e.currentTarget, t.clientX, t.clientY); },
    onTouchEnd(e: React.TouchEvent<HTMLDivElement>) { e.currentTarget.style.setProperty("--glow-intensity", "0"); },
  };
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll-driven timeline: fills the red line and advances the active dot
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      experiences.length - 1,
      Math.floor(v * experiences.length)
    );
    setActiveIndex(Math.max(0, idx));
  });

  const handlers = glowHandlers();

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-warmOffWhite overflow-hidden"
    >
      {/* Background watermark */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute right-[-40px] top-[4%] text-[clamp(70px,12vw,150px)] font-extrabold uppercase leading-none tracking-[-0.05em] text-[#9D0409] opacity-[0.05] will-change-transform"
      >
        Journey
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentRed mb-2">
            02
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-[1.05] tracking-[-0.04em] text-textPrimary">
            Experience &amp; Education
          </h2>
        </motion.div>

        {/* Two-column grid: Education left, Timeline right */}
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">

          {/* ── Education card ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-textSecondary opacity-50 mb-4">
              Education
            </p>

            {/* Glow wrapper */}
            <div
              className="magic-bento-card--border-glow relative rounded-[2rem] bg-white border border-lightBeige shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden hover:scale-[1.01] active:scale-[1.01] transition-transform duration-300 cursor-default"
              {...handlers}
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full bg-[#ff2a2a]" />

              <ParticleCard className="p-6 sm:p-8 md:p-10" particleCount={5}>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-textPrimary leading-tight">
                      {education.institution}
                    </h3>
                    <p className="text-sm text-textSecondary mt-1 font-medium">
                      {education.location}
                    </p>
                  </div>
                  <span className="shrink-0 mt-0.5 rounded-full bg-[#ff2a2a]/10 px-3 py-1 text-[11px] font-bold text-[#ff2a2a] uppercase tracking-wider">
                    {education.period.split("–")[1].trim()}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-textSecondary opacity-50 mb-1">Degree</p>
                    <p className="text-sm sm:text-base font-bold text-textPrimary leading-snug">{education.degree}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-textSecondary opacity-50 mb-1">University</p>
                    <p className="text-sm font-medium text-textSecondary">{education.university}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-textSecondary opacity-50 mb-1">Duration</p>
                    <p className="text-sm font-medium text-textSecondary">{education.period}</p>
                  </div>
                </div>

                {/* CGPA bar */}
                <div className="mt-8 flex items-center gap-4 rounded-2xl bg-[#f4f4f4] px-5 py-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-textSecondary opacity-50">CGPA</p>
                    <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#ff2a2a] leading-none mt-1">
                      {education.cgpa}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full w-[90%] rounded-full bg-[#ff2a2a]" />
                    </div>
                    <p className="text-[10px] text-textSecondary opacity-40 mt-1 text-right">out of 10</p>
                  </div>
                </div>
              </ParticleCard>
            </div>
          </motion.div>

          {/* ── Experience timeline ── */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-textSecondary opacity-50 mb-6">
              Experience
            </p>

            <div ref={timelineRef} className="relative">
              {/* Gray base line */}
              <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-lightBeige rounded-full" />
              {/* Red fill line — grows with scroll */}
              <motion.div
                className="absolute left-[7px] top-3 w-[2px] rounded-full origin-top"
                style={{
                  scaleY: lineScaleY,
                  height: "calc(100% - 24px)",
                  background: "#ff2a2a",
                  boxShadow: "0 0 8px 1px rgba(255,42,42,0.35)",
                }}
              />

              <div className="space-y-6 sm:space-y-8 pl-7 sm:pl-9">
                {experiences.map((exp, i) => {
                  const isActive = i <= activeIndex;
                  const isFront = i === activeIndex;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                      className="relative"
                    >
                      {/* Dot — transitions red as scroll fills */}
                      <motion.div
                        animate={{
                          backgroundColor: isActive ? "#ff2a2a" : "#ffffff",
                          borderColor: isActive ? "#ff2a2a" : "#d1d5db",
                          boxShadow: isFront
                            ? "0 0 0 5px rgba(255,42,42,0.18), 0 0 12px rgba(255,42,42,0.4)"
                            : "none",
                        }}
                        transition={{ duration: 0.4 }}
                        className="absolute -left-7 sm:-left-9 top-5 w-4 h-4 rounded-full border-2 z-10"
                      />

                      {/* Card: glow wrapper */}
                      <div
                        className="magic-bento-card--border-glow relative rounded-2xl hover:scale-[1.01] active:scale-[1.01] transition-transform duration-300 cursor-default"
                        {...handlers}
                      >
                        <ParticleCard
                          className="rounded-2xl bg-white border border-lightBeige p-5 sm:p-6"
                          particleCount={4}
                        >
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                            <div className="min-w-0">
                              <h3 className="text-sm sm:text-base font-extrabold text-textPrimary tracking-tight leading-snug">
                                {exp.role}
                              </h3>
                              <p className="text-sm font-bold text-[#ff2a2a] mt-0.5">
                                {exp.org}
                                <span className="text-textSecondary font-medium opacity-60">
                                  {" "}· {exp.location}
                                </span>
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <span
                                className={`rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap ${
                                  exp.current
                                    ? "bg-[#ff2a2a] text-white"
                                    : "bg-[#f4f4f4] text-textSecondary"
                                }`}
                              >
                                {exp.period}
                              </span>
                              {exp.current && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-[#ff2a2a] uppercase tracking-wider">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a] animate-pulse" />
                                  Active
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Tag */}
                          {exp.tag && (
                            <p className="text-[11px] font-bold text-[#ff2a2a] bg-[#ff2a2a]/8 rounded-lg px-3 py-1.5 mb-3 inline-block">
                              {exp.tag}
                            </p>
                          )}

                          {/* Highlights */}
                          <ul className="space-y-2">
                            {exp.highlights.map((h, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-textSecondary leading-relaxed">
                                <span className="mt-[6px] w-1.5 h-1.5 shrink-0 rounded-full bg-[#ff2a2a] opacity-60" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </ParticleCard>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
