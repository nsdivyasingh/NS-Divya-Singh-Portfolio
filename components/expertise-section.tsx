"use client";

import { useRef, useState, type RefObject } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });

const PATH_D =
  "M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200";

const cards = [
  {
    number: "01",
    title: "Frontend Development",
    text: "Crafting responsive and interactive user interfaces using React, JavaScript, Tailwind CSS, and modern frontend technologies to deliver seamless user experiences.",
    className:
      "md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6",
    entrance: "left" as const,
    delay: 0.1,
  },
  {
    number: "02",
    title: "Backend Development",
    text: "Building secure REST APIs, authentication systems, server-side applications, and database integrations with scalable architectures.",
    className:
      "md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6",
    entrance: "right" as const,
    delay: 0.2,
  },
  {
    number: "03",
    title: "AI & Machine Learning",
    text: "Developing intelligent applications using NLP, Generative AI, Computer Vision, LLMs, and data-driven machine learning solutions.",
    className:
      "md:absolute md:top-[700px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-3",
    entrance: "left" as const,
    delay: 0.3,
  },
  {
    number: "04",
    title: "Cloud & Deployment",
    text: "Deploying and managing applications using Docker, GitHub Actions, CI/CD pipelines, cloud platforms, and performance optimization practices.",
    className:
      "md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%] -rotate-1 md:-rotate-3",
    entrance: "right" as const,
    delay: 0.4,
  },
];

function ExpertiseCard({
  number,
  title,
  text,
  className,
  entrance,
  delay,
  pathLength,
  containerRef,
}: {
  number: string;
  title: string;
  text: string;
  className: string;
  entrance: "left" | "right";
  delay: number;
  pathLength: MotionValue<number>;
  containerRef: RefObject<HTMLElement>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (value) => {
    if (!cardRef.current || !containerRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeTop = cardRect.top - containerRect.top;
    const threshold = relativeTop + 50;
    const drawPosition = value * containerRect.height;
    if (drawPosition >= threshold && !active) setActive(true);
    else if (drawPosition < threshold && active) setActive(false);
  });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: entrance === "left" ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={`w-72 sm:w-80 rounded-[2rem] p-2 relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 z-10 ${className} ${
        active
          ? "bg-[#ff2a2a] border-red-400 shadow-[0_20px_50px_rgba(255,42,42,0.4)]"
          : "bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
      }`}
    >
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20" />
      </div>
      <div
        className={`w-full h-full rounded-[1.5rem] mt-8 p-8 flex flex-col min-h-[220px] transition-colors duration-700 ${
          active ? "bg-red-700/50" : "bg-[#f4f4f4]"
        }`}
      >
        <span
          className={`text-xl font-bold mb-2 font-serif italic transition-colors duration-700 ${
            active ? "text-red-200" : "text-gray-400"
          }`}
        >
          {number}
        </span>
        <h3
          className={`text-2xl font-black mb-3 tracking-tight transition-colors duration-700 ${
            active ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed font-medium transition-colors duration-700 ${
            active ? "text-red-100" : "text-gray-500"
          }`}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto relative md:h-[1350px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0"
        >
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            My Expertise
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
            Building Modern Digital Solutions with Code & AI
            <svg
              className="absolute -bottom-10 right-10 w-12 h-12 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-sm font-medium leading-relaxed">
            Combining full-stack development, artificial intelligence, and
            cloud technologies to create scalable and impactful digital
            experiences.
          </p>
        </motion.div>

        <svg
          className="hidden md:block absolute top-0 left-0 w-full h-[1350px] pointer-events-none z-0"
          viewBox="0 0 1000 1350"
          preserveAspectRatio="none"
        >
          <path
            d={PATH_D}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="8 10"
          />
          <mask id="expertise-path-mask">
            <motion.path
              d={PATH_D}
              fill="none"
              stroke="white"
              strokeWidth="20"
              style={{ pathLength }}
            />
          </mask>
          <path
            d={PATH_D}
            fill="none"
            stroke="#ff2a2a"
            strokeWidth="2"
            strokeDasharray="8 10"
            mask="url(#expertise-path-mask)"
            className="drop-shadow-sm"
          />
        </svg>

        <svg
          className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0"
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 2,0 L 2,100"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="4"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
          <mask id="expertise-path-mask-mobile">
            <motion.path
              d="M 2,0 L 2,100"
              fill="none"
              stroke="white"
              strokeWidth="4"
              style={{ pathLength }}
              vectorEffect="non-scaling-stroke"
            />
          </mask>
          <path
            d="M 2,0 L 2,100"
            fill="none"
            stroke="#ff2a2a"
            strokeWidth="4"
            strokeDasharray="4 6"
            mask="url(#expertise-path-mask-mobile)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          {cards.map((card) => (
            <ExpertiseCard
              key={card.number}
              {...card}
              pathLength={pathLength}
              containerRef={sectionRef}
            />
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className={`hidden md:block absolute top-[1250px] left-[60%] text-3xl text-gray-600 rotate-6 ${caveat.className}`}
          >
            Turning ideas into reality!
          </motion.div>
        </div>
      </div>
    </section>
  );
}
