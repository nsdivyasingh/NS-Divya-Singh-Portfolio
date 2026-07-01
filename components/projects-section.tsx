"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, type Variants } from "framer-motion";
import { Caveat } from "next/font/google";
import { ChevronLeft, ChevronRight, Github, Lock, ShieldCheck } from "lucide-react";

const caveat = Caveat({ subsets: ["latin"] });

type FeaturedProject = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string | null;
  isPrivate: boolean;
};

const featuredProjects: FeaturedProject[] = [
  {
    title: "FOSYS",
    category: "AI • Workflow Automation • Award",
    description:
      "AI-powered platform that automates task management, meeting transcript analysis, GitHub sync, and engineering workflows. Reduced manual coordination effort by 30%+. Best Paper Award — IC-AISMART 2025.",
    tags: ["FastAPI", "PostgreSQL", "Supabase", "React"],
    href: null,
    isPrivate: true,
  },
  {
    title: "VoxFlow AI",
    category: "Conversational AI • RAG",
    description:
      "Voice-first conversational workflow assistant combining LLM orchestration, vector retrieval, memory systems, and automation pipelines.",
    tags: ["FastAPI", "Gemini API", "Qdrant", "Python"],
    href: "https://github.com/nsdivyasingh/voxflow-ai",
    isPrivate: false,
  },
  {
    title: "RevenuePilot AI",
    category: "Multi-Agent AI • Business Intelligence",
    description:
      "Multi-agent platform that generates revenue analysis, automates consulting workflows, and produces executive-level reports.",
    tags: ["Gemini API", "n8n", "Gmail API", "Google Sheets"],
    href: "https://github.com/nsdivyasingh/revenue-pilot.ai",
    isPrivate: false,
  },
  {
    title: "Fake News Detection System",
    category: "NLP • Multimodal AI • Research",
    description:
      "Multimodal AI pipeline integrating NLP, OCR, speech recognition, and LLM-powered analysis to classify misinformation across text, image, and audio. Published in JETIR2506313 with 92%+ accuracy.",
    tags: ["Python", "TensorFlow", "OCR", "Gemini API"],
    href: "https://github.com/nsdivyasingh/fake-news-detection",
    isPrivate: false,
  },
  {
    title: "SpotFix",
    category: "Mobile • Civic Tech • Full-Stack",
    description:
      "Community-driven platform for reporting and resolving civic problems using geolocation and image uploads, connecting citizens to local authorities.",
    tags: ["Android", "React", "Geolocation API", "Image Upload"],
    href: "https://github.com/nsdivyasingh/resqme",
    isPrivate: false,
  },
  {
    title: "PixelBooth Pro",
    category: "Frontend • Creative Tools",
    description:
      "Browser-based photo booth application with customizable layouts, filters, overlays, and downloadable photo strips.",
    tags: ["React", "CSS3", "Canvas API", "JavaScript"],
    href: "https://github.com/nsdivyasingh/PixelBooth",
    isPrivate: false,
  },
];

type OtherProject = {
  title: string;
  category: string;
  repo: string | null;
  href: string | null;
};

const otherProjects: OtherProject[] = [
  {
    title: "Battery RUL Prediction",
    category: "Data Science",
    repo: "github.com/nsdivyasingh/battery-rul-prediction",
    href: "https://github.com/nsdivyasingh/battery-rul-prediction",
  },
  {
    title: "Conversational Finance Chatbot",
    category: "Chatbot",
    repo: "github.com/nsdivyasingh/Conversational-Finance-Chatbot",
    href: "https://github.com/nsdivyasingh/Conversational-Finance-Chatbot",
  },
  {
    title: "Product Lens",
    category: "AI Research",
    repo: "github.com/nsdivyasingh/Product_Lens",
    href: "https://github.com/nsdivyasingh/Product_Lens",
  },
  {
    title: "Maze Solver",
    category: "Algorithms",
    repo: "github.com/nsdivyasingh/maze-solver-project",
    href: "https://github.com/nsdivyasingh/maze-solver-project",
  },
  {
    title: "AI Product Research & Evaluation",
    category: "Research",
    repo: null,
    href: null,
  },
  {
    title: "VisionAstraa Company Website",
    category: "Frontend",
    repo: null,
    href: null,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function FeaturedProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const rotate =
    index % 3 === 0 ? "hover:rotate-1" : index % 3 === 1 ? "hover:-rotate-1" : "hover:rotate-0";

  return (
    <motion.div
      variants={cardVariants}
      className={`group bg-white border border-gray-200 rounded-[2rem] p-1.5 relative flex flex-col items-center hover:scale-[1.02] ${rotate} hover:border-red-400 hover:shadow-[0_20px_50px_rgba(255,42,42,0.12)] transition-all duration-700`}
    >
      <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] absolute top-3 border border-gray-300 z-10 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-gray-800 rounded-full opacity-10" />
      </div>

      <div className="w-full h-full rounded-[1.4rem] mt-6 p-6 flex flex-col justify-between min-h-[310px] bg-[#f4f4f4] group-hover:bg-red-50/20 transition-colors duration-700">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#ff2a2a]/90 block mb-2">
            {project.category}
          </span>
          <h3 className="text-xl font-black text-gray-900 tracking-tight mb-3 group-hover:text-[#ff2a2a] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium mb-4">
            {project.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] md:text-xs font-bold rounded-md bg-white border border-gray-200/60 text-gray-600 shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 border-t border-gray-200/50 pt-4">
            {project.isPrivate ? (
              <span className="text-xs font-black text-gray-400 inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />
                Private Repository
              </span>
            ) : (
              <a
                href={project.href ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-black text-gray-900 hover:text-[#ff2a2a] inline-flex items-center gap-1 transition-colors duration-300"
              >
                Source Code
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const WAVE_PATH =
  "M -50,8 Q 200,16 450,4 Q 700,-4 950,8 Q 1200,16 1450,4 Q 1700,-4 1950,8 Q 2200,16 2450,4 Q 2700,-4 2950,8 Q 3200,16 3450,4 Q 3700,-4 3950,8 Q 4200,16 4450,4 Q 4700,-4 4950,8 Q 5200,16 5450,4 Q 5700,-4 5950,8 L 20000,8";

function OtherRepositoriesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopDistance, setLoopDistance] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setLoopDistance(trackRef.current.scrollWidth / 2);
    };
    measure();
    const timeout = setTimeout(measure, 200);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(timeout);
    };
  }, []);

  const speedRef = useRef(1.0);

  useEffect(() => {
    if (loopDistance === 0 || isManualScrolling) return;
    let frame: number;
    const step = () => {
      // ease the speed toward its target instead of springing position —
      // keeps the wrap-around a true instant reset with zero backward sweep.
      const targetSpeed = isHovering ? 0.25 : 1.0;
      speedRef.current += (targetSpeed - speedRef.current) * 0.06;

      let next = x.get() - speedRef.current;
      if (next <= -loopDistance) next += loopDistance;
      x.set(next);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [loopDistance, isHovering, isManualScrolling, x]);

  const handleNav = (direction: "prev" | "next") => {
    if (loopDistance === 0) return;
    setIsManualScrolling(true);
    let target = x.get() + (direction === "next" ? -380 : 380);
    if (target > 0) target -= loopDistance;
    else if (target <= -loopDistance) target += loopDistance;
    animate(x, target, {
      type: "spring",
      stiffness: 80,
      damping: 18,
      onComplete: () => setTimeout(() => setIsManualScrolling(false), 1500),
    });
  };

  const doubledProjects = [...otherProjects, ...otherProjects];

  return (
    <div className="w-full">
      <div className="mb-10 flex flex-wrap justify-between items-end gap-6">
        <div className="relative max-w-xl">
          <div className="inline-block border border-gray-300 rounded-full px-4 py-1 text-xs font-bold text-gray-600 mb-4 shadow-sm bg-white">
            Repository Index
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight relative inline-block">
            Other Repositories
            <svg
              className="absolute -bottom-2 left-0 w-32 h-2 text-[#ff2a2a]/40"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q50,10 100,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </h3>
        </div>
        <div className="flex gap-3 mb-1">
          <button
            type="button"
            onClick={() => handleNav("prev")}
            aria-label="Scroll left"
            className="p-4 rounded-full border border-gray-300 text-gray-800 bg-white hover:border-[#ff2a2a] hover:bg-[#ff2a2a] hover:text-white hover:scale-105 active:scale-95 shadow-sm transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => handleNav("next")}
            aria-label="Scroll right"
            className="p-4 rounded-full border border-gray-300 text-gray-800 bg-white hover:border-[#ff2a2a] hover:bg-[#ff2a2a] hover:text-white hover:scale-105 active:scale-95 shadow-sm transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        className="relative w-full py-8 overflow-visible cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <svg className="absolute top-[48px] left-0 w-full h-4 pointer-events-none z-0 hidden md:block" fill="none">
          <motion.path
            d={WAVE_PATH}
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="6 8"
            style={{ x }}
          />
        </svg>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-7 w-max pl-2 select-none">
          {doubledProjects.map((project, i) => {
            const index = (i % otherProjects.length) + 1;
            const indexLabel = index < 10 ? `0${index}` : `${index}`;
            return (
              <div
                key={`${project.title}-${i}`}
                title={project.title}
                className="group w-[300px] sm:w-[330px] h-[250px] flex-shrink-0 [perspective:1000px]"
              >
                <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white border border-gray-200 rounded-[2rem] p-1.5 flex flex-col items-center hover:border-red-400 hover:shadow-[0_20px_45px_rgba(255,42,42,0.1)] transition-all duration-500">
                    <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] absolute top-3 border border-gray-300 z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-gray-800 rounded-full opacity-10" />
                    </div>
                    <div className="w-full h-full rounded-[1.4rem] mt-7 p-6 flex flex-col justify-between bg-[#f4f4f4] group-hover:bg-red-50/20 transition-colors duration-700">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#ff2a2a]/90">
                            {project.category}
                          </span>
                          <span className="text-sm font-bold font-serif italic text-gray-400">
                            {indexLabel}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900 tracking-tight mb-1 group-hover:text-[#ff2a2a] transition-colors duration-300 leading-snug line-clamp-2">
                          {project.title}
                        </h4>
                      </div>
                      <div className="border-t border-gray-200/50 pt-3 mt-3">
                        <p className="text-gray-400 text-[10px] font-bold tracking-tight uppercase">
                          Source Repository
                        </p>
                        <p className="text-gray-700 text-sm font-semibold truncate">
                          {project.repo ?? "Not publicly available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-[2rem] p-6 flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.3)]">
                    <div className="flex justify-between items-start">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <ShieldCheck className="w-4 h-4 text-[#ff2a2a]" strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] tracking-widest font-mono text-gray-500 font-bold uppercase">
                        Secured Node
                      </span>
                    </div>
                    <div className="my-auto text-center px-2">
                      <p className="text-[10px] text-gray-400 font-mono mb-1 uppercase tracking-wider">
                        Repository Access
                      </p>
                      <h5 className="text-sm text-white font-medium line-clamp-2 mb-4">
                        {project.title}
                      </h5>
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 bg-[#ff2a2a] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 transition-colors duration-300 shadow-md shadow-red-900/30 select-none"
                        >
                          <span>View on GitHub</span>
                          <Github className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 bg-white/10 text-gray-400 px-4 py-2 rounded-xl text-xs font-bold select-none">
                          <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />
                          <span>No Public Repo</span>
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 border-t border-gray-800 pt-2">
                      <span>SYS ID: #{indexLabel}</span>
                      <span className="text-[#ff2a2a] font-bold">
                        {project.href ? "PUBLIC" : "PRIVATE"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="bg-white py-24 px-6 md:px-12 relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20 relative max-w-2xl"
        >
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Featured Work
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
            Projects That Define My Journey
            <svg
              className="absolute -bottom-4 left-0 w-48 h-3 text-[#ff2a2a]/40"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q50,10 100,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed mt-8">
            A curated portfolio of AI-powered platforms, full-stack systems, and
            award-winning research — built to solve real problems at scale.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        <div className="mt-28">
          <OtherRepositoriesCarousel />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16 relative"
        >
          <div className={`${caveat.className} text-3xl text-gray-500 inline-block transform rotate-1`}>
            More experiments live in the repositories above...
          </div>
        </motion.div>
      </div>
    </section>
  );
}
