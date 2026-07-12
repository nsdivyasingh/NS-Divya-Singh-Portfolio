"use client";

import { motion } from "framer-motion";
import { ParticleCard } from "./magic-bento";

const researchPapers = [
  {
    title: "Fake News Detection: An AI-based Approach",
    category: "Published Research",
    journal: "Journal of Emerging Technologies and Innovative Research (JETIR)",
    date: "Volume 12, Issue 6, June 2025",
    paperId: "JETIR2506313",
    link: "https://www.jetir.org/view?paper=JETIR2506313",
  },
  {
    title: "FOSYS: An AI-Based Workflow Automation System for SCRUM and Software Development Teams",
    category: "Best Paper Award — IC-AISMART ’25",
    journal: "Hinweis Research",
    date: "Presented at IC-AISMART 2025 • Forthcoming",
    paperId: "Forthcoming",
    link: "https://drive.google.com/file/d/1HETn2hL4AYqCEzqSFwYXLooglj7woj-c/view",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ResearchSection() {
  return (
    <section
      id="research"
      className="bg-warmOffWhite py-24 px-6 md:px-12 relative overflow-hidden font-sans border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 relative max-w-2xl"
        >
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Publications &amp; Research
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
            Academic &amp; Applied Research
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
            Investigating NLP algorithms, machine learning pipelines, and multi-agent AI orchestration to address real-world complexity.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
        >
          {researchPapers.map((paper) => (
            <motion.div
              key={paper.title}
              variants={cardVariants}
              className="magic-bento-card--border-glow group bg-white border border-gray-200 rounded-[2rem] p-1.5 relative flex flex-col items-center hover:scale-[1.02] active:scale-[1.02] hover:border-red-400 hover:shadow-[0_20px_50px_rgba(255,42,42,0.08)] transition-all duration-700"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--glow-x", `${((e.clientX - r.left) / r.width) * 100}%`);
                e.currentTarget.style.setProperty("--glow-y", `${((e.clientY - r.top) / r.height) * 100}%`);
                e.currentTarget.style.setProperty("--glow-intensity", "1");
              }}
              onMouseLeave={(e) => e.currentTarget.style.setProperty("--glow-intensity", "0")}
              onTouchStart={(e) => {
                const t = e.touches[0];
                if (!t) return;
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--glow-x", `${((t.clientX - r.left) / r.width) * 100}%`);
                e.currentTarget.style.setProperty("--glow-y", `${((t.clientY - r.top) / r.height) * 100}%`);
                e.currentTarget.style.setProperty("--glow-intensity", "1");
              }}
              onTouchMove={(e) => {
                const t = e.touches[0];
                if (!t) return;
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--glow-x", `${((t.clientX - r.left) / r.width) * 100}%`);
                e.currentTarget.style.setProperty("--glow-y", `${((t.clientY - r.top) / r.height) * 100}%`);
              }}
              onTouchEnd={(e) => e.currentTarget.style.setProperty("--glow-intensity", "0")}
            >
              {/* Rivet design */}
              <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] absolute top-3 border border-gray-300 z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full opacity-10" />
              </div>

              <ParticleCard
                className="w-full h-full rounded-[1.4rem] mt-6 p-6 md:p-8 flex flex-col justify-between min-h-[280px] bg-[#f4f4f4] group-hover:bg-red-50/10 transition-colors duration-700"
                particleCount={5}
              >
                <div>
                  <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#ff2a2a]/95 px-2.5 py-1 rounded bg-[#ff2a2a]/5 border border-[#ff2a2a]/10">
                      {paper.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400 font-bold">
                      ID: {paper.paperId}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight mb-4 group-hover:text-[#ff2a2a] transition-colors duration-300 leading-snug">
                    {paper.title}
                  </h3>
                  
                  <p className="text-gray-700 text-sm font-semibold italic mb-1">
                    {paper.journal}
                  </p>
                  <p className="text-gray-400 text-xs font-medium">
                    {paper.date}
                  </p>
                </div>

                <div className="border-t border-gray-200/50 pt-5 mt-6 flex justify-between items-center w-full">
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-extrabold text-gray-900 hover:text-[#ff2a2a] inline-flex items-center gap-1.5 transition-colors duration-300 group/link"
                  >
                    View Publication
                    <svg
                      className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
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
                </div>
              </ParticleCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
