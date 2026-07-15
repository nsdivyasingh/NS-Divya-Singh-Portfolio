"use client";

import { motion } from "framer-motion";
import { ParticleCard } from "./magic-bento";

const achievements = [
  {
    tag: "Best Paper Award",
    date: "Dec 2025",
    title: "IC-AISMART 2025",
    subtitle: "International Conference on Agrovoltaics Innovations & Smart Farming",
    description:
      "FOSYS recognised as Best Paper at IC-AISMART 2025, an international conference on smart farming, renewable energy, machine learning, and embedded technologies.",
    icon: "🏆",
  },
  {
    tag: "Gov. Funded",
    date: "May 2026",
    title: "KSCST State Funding",
    subtitle: "Karnataka State Council for Science & Technology",
    description:
      "FOSYS was evaluated, selected, and funded by KSCST. The same project was subsequently chosen for state-level project presentation, a dual recognition from the Government of Karnataka.",
    icon: "🏛️",
  },
  {
    tag: "Published",
    date: "Jun 2025",
    title: "Fake News Detection",
    subtitle: "JETIR, Journal of Emerging Technologies and Innovative Research",
    description:
      "Published 'Fake News Detection: An AI-Based Approach' in JETIR (June 2025), achieving 92%+ accuracy using machine learning and NLP techniques.",
    icon: "📄",
  },
  {
    tag: "Published",
    date: "Dec 2025",
    title: "FOSYS Research Paper",
    subtitle: "Hinweis Research, IC-AISMART 2025",
    description:
      "Published research on FOSYS, an AI-powered workflow automation platform for SCRUM teams, in Hinweis Research at IC-AISMART 2025. The same paper won the Best Paper Award at the conference.",
    icon: "📄",
  },
  {
    tag: "1st Prize",
    date: "Aug 2024",
    title: "Code-6-Craze Hackathon",
    subtitle: "AMC Engineering College, Bengaluru",
    description:
      "Won 1st place at Code-6-Craze, a 6-hour hackathon at AMC Engineering College, as Team HACK-BUDDIES. The win led directly to a stipend-based internship at VisionAstraa Startup Academy.",
    icon: "🥇",
  },
  {
    tag: "Winner",
    date: "Nov 2025",
    title: "InferWorks AI/ML Hackathon",
    subtitle: "AMC Engineering College, Bengaluru",
    description:
      "Won the InferWorks AI/ML Hackathon focused on real-world AI assistants, automation, and practical ML applications. Invited to join InferWorks as a team member with a stipend-based internship.",
    icon: "⚡",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="bg-warmOffWhite py-24 px-6 md:px-12 relative overflow-hidden font-sans border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 relative max-w-2xl"
        >
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Awards &amp; Recognition
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
            Achievements
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
            Awards, publications, and milestones across research, competition, and industry.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {achievements.map((a) => (
            <motion.div
              key={a.title + a.date}
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
              {/* Rivet */}
              <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] absolute top-3 border border-gray-300 z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full opacity-10" />
              </div>

              <ParticleCard
                className="w-full h-full rounded-[1.4rem] mt-6 p-6 md:p-8 flex flex-col justify-between min-h-[240px] bg-[#f4f4f4] group-hover:bg-red-50/10 transition-colors duration-700"
                particleCount={5}
              >
                <div>
                  <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#ff2a2a]/95 px-2.5 py-1 rounded bg-[#ff2a2a]/5 border border-[#ff2a2a]/10">
                      {a.tag}
                    </span>
                    <span className="text-xs font-mono text-gray-400 font-bold">
                      {a.date}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-xl leading-none mt-0.5 shrink-0">{a.icon}</span>
                    <h3 className="text-lg md:text-xl font-black text-gray-900 tracking-tight group-hover:text-[#ff2a2a] transition-colors duration-300 leading-snug">
                      {a.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 text-sm font-semibold italic mb-3">
                    {a.subtitle}
                  </p>

                  <p className="text-gray-500 text-[13px] leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </ParticleCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
