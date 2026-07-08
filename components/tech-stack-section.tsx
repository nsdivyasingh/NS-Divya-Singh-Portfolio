"use client";

import { motion, type Variants } from "framer-motion";
import { ParticleCard } from "./magic-bento";

const techStack = [
  {
    category: "Languages & Frontend",
    skills: [
      "Python",
      "JavaScript",
      "Java",
      "HTML5",
      "CSS3",
      "React",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    category: "Backend & Databases",
    skills: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Supabase",
    ],
  },
  {
    category: "AI & Machine Learning",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Gemini API",
      "Prompt Engineering",
      "RAG",
      "Conversational AI",
      "Qdrant Vector DB",
    ],
  },
  {
    category: "Cloud, DevOps & Automation",
    skills: [
      "Google Cloud",
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "n8n",
      "REST APIs",
      "API Integration",
      "Automation Pipelines",
      "Workflow Automation",
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const pillVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 10 } },
};

function StackCard({ category, skills }: { category: string; skills: string[] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="magic-bento-card--border-glow group relative flex h-full flex-col bg-white border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-500"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--glow-x", `${((e.clientX - r.left) / r.width) * 100}%`);
        e.currentTarget.style.setProperty("--glow-y", `${((e.clientY - r.top) / r.height) * 100}%`);
        e.currentTarget.style.setProperty("--glow-intensity", "1");
      }}
      onMouseLeave={(e) => e.currentTarget.style.setProperty("--glow-intensity", "0")}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-red-500/5 transition-all duration-500 pointer-events-none" />
      <ParticleCard className="relative z-10 flex h-full flex-col" particleCount={4}>
        <h3 className="text-sm font-semibold text-black mb-4 tracking-tight">
          {category}
        </h3>
        <div className="flex flex-wrap gap-2 content-start">
          {skills.map((skill) => (
            <motion.button
              key={skill}
              variants={pillVariants}
              initial="initial"
              whileHover="hover"
              suppressHydrationWarning
              className="px-3 py-1.5 text-xs font-medium text-black bg-black/[0.03] hover:bg-red-500/10 border border-black/5 hover:border-red-500/20 rounded-full transition-all duration-300 cursor-default select-none hover:text-red-500"
            >
              {skill}
            </motion.button>
          ))}
        </div>
      </ParticleCard>
    </motion.div>
  );
}

export function TechStackSection() {
  return (
    <section
      id="skills"
      className="relative w-full bg-white py-16 md:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(0,0,0,.05)_25%,rgba(0,0,0,.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,.05)_75%,rgba(0,0,0,.05)_76%,transparent_77%,transparent),linear-gradient(0deg,transparent_24%,rgba(0,0,0,.05)_25%,rgba(0,0,0,.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,.05)_75%,rgba(0,0,0,.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-12"
        >
          <div className="mb-3">
            <span className="inline-block text-xs font-semibold text-black/50 uppercase tracking-widest px-3 py-1.5 bg-black/[0.02] border border-black/5 rounded-full">
              Technical Stack
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-2 tracking-tight">
            Technologies I Work With
          </h2>
          <p className="text-sm text-black/60 font-normal">
            Full-stack expertise across modern development, AI, and cloud
            infrastructure.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 [grid-auto-rows:1fr]"
        >
          {techStack.map((entry) => (
            <StackCard key={entry.category} category={entry.category} skills={entry.skills} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
