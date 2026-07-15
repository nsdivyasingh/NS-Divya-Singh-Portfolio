"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Action {
  label: string;
  href?: string;
  scrollTo?: string;
}

interface Msg {
  id: number;
  from: "bot" | "user";
  text: string;
  chips?: string[];
  actions?: Action[];
}

// ── Bot response tree ──────────────────────────────────────────────────────────
const GREETING: Omit<Msg, "id" | "from"> = {
  text: "Hey! 👋 I'm Divya's portfolio assistant. What would you like to know?",
  chips: ["Who is Divya?", "View projects", "Fun fact 🎮", "Awards & research", "Download resume", "Contact"],
};

const RESPONSES: Record<string, Omit<Msg, "id" | "from">> = {
  "who is divya?": {
    text: "NS Divya Singh is an AI Engineer, Researcher, and Builder with 2+ years of experience. She specialises in LLMs, intelligent systems, and applied AI — turning ideas into products that create real-world impact.",
    chips: ["What tech does she use?", "Hobbies & interests", "Fun fact 🎮", "View projects", "Download resume"],
  },
  "view projects": {
    text: "Divya has built 10+ projects — from FOSYS (Best Paper Award at IC-AISMART 2025) to VoxFlow AI, RevenuePilot AI, and a Multimodal Fake News Detection system with 92%+ accuracy.",
    chips: ["Tell me about FOSYS", "Other projects", "Research publications"],
    actions: [{ label: "See all projects ↓", scrollTo: "projects" }],
  },
  "tell me about fosys": {
    text: "FOSYS is an AI-powered workflow automation platform for SCRUM teams. It automates task management, meeting transcripts, GitHub sync, and engineering workflows — reducing manual coordination by 30%+. It won Best Paper Award at IC-AISMART 2025.",
    chips: ["Other projects", "Research publications", "Contact"],
  },
  "other projects": {
    text: "Beyond FOSYS: VoxFlow AI is a voice-first conversational assistant with LLM + RAG; RevenuePilot AI is a multi-agent business intelligence platform; SpotFix is a civic-tech mobile app for reporting public issues.",
    chips: ["Tell me about FOSYS", "Research publications", "Contact"],
    actions: [{ label: "See all projects ↓", scrollTo: "projects" }],
  },
  "awards & research": {
    text: "Divya has 2 research publications — 'Fake News Detection' in JETIR (June 2025, 92%+ accuracy) and FOSYS which won Best Paper Award at IC-AISMART 2025. She has also competed in 8+ hackathons.",
    chips: ["Tell me about FOSYS", "View projects", "Contact"],
    actions: [{ label: "See research ↓", scrollTo: "research" }],
  },
  "research publications": {
    text: "Two published works: (1) 'Fake News Detection: An AI-based Approach' — JETIR, June 2025. (2) 'FOSYS: AI-Based Workflow Automation' — IC-AISMART 2025, Best Paper Award.",
    chips: ["Tell me about FOSYS", "View projects", "Contact"],
    actions: [{ label: "See research ↓", scrollTo: "research" }],
  },
  "download resume": {
    text: "Here's Divya's resume — it covers her AI/ML projects, research publications, and full skill set.",
    chips: ["View projects", "Contact"],
    actions: [{ label: "Download Resume ↗", href: "/DivyaSingh-AIML.pdf" }],
  },
  "contact": {
    text: "You can reach Divya at naveensinghdivyasingh@gmail.com, or use the contact form on this page. She's worldwide available!",
    chips: ["Download resume", "View projects"],
    actions: [{ label: "Go to contact ↓", scrollTo: "contact" }],
  },
  "what tech does she use?": {
    text: "Divya's core stack: Python, FastAPI, React/Next.js, PostgreSQL, Supabase — plus LLMs (Gemini, GPT-4), vector databases (Qdrant), n8n automation, and cloud systems.",
    chips: ["View projects", "Download resume"],
    actions: [{ label: "See skill stack ↓", scrollTo: "skills" }],
  },
  "hobbies & interests": {
    text: "Outside of building AI systems, Divya writes a personal blog called 'The Better Versions' — reflective essays on life, growth, and clarity. She also loves exploring new AI tools, competing in hackathons, and building fun side projects (yes, the Snake game in this portfolio is one of them 🐍).",
    chips: ["Read the blog", "Fun fact 🎮", "What is she working on?", "View projects"],
  },
  "fun fact 🎮": {
    text: "Divya built two fully playable games directly into this portfolio — a physics-based Ribbon toy and a Snake game with localStorage high scores, confetti explosions, and mobile swipe controls. Scroll down and give them a try! 🎮",
    chips: ["Play Ribbons 🎀", "Play Snake 🐍", "Hobbies & interests", "View projects"],
  },
  "play ribbons 🎀": {
    text: "Head to the Ribbons section — drag your mouse (or finger) to sculpt glowing red ribbons in real time. You can even customise the count, thickness, speed, and trail length.",
    chips: ["Play Snake 🐍", "View projects", "Contact"],
    actions: [{ label: "Go to Ribbons ↓", scrollTo: "ribbons" }],
  },
  "play snake 🐍": {
    text: "The Snake game is just below — arrow keys, D-pad, or swipe to move. Beat the high score of 46 and confetti shoots from both corners of the screen!",
    chips: ["Play Ribbons 🎀", "View projects", "Contact"],
    actions: [{ label: "Go to Snake ↓", scrollTo: "snake" }],
  },
  "read the blog": {
    text: "Divya's blog 'The Better Versions' is a space for reflection, growth, and personal clarity — not a coding blog. The featured series '12 Lessons Before 21' is raw, honest, and worth a read.",
    chips: ["Hobbies & interests", "Who is Divya?", "Contact"],
    actions: [{ label: "Open blog ↗", href: "https://thebetterversions.wordpress.com/" }],
  },
  "what is she working on?": {
    text: "Divya is currently focused on advancing AI-driven automation and agentic workflows — building systems that think and act, not just respond. She's also continuing her research in applied AI.",
    chips: ["View projects", "Awards & research", "Contact"],
  },
};

const FALLBACK: Omit<Msg, "id" | "from"> = {
  text: "Hmm, I don't have an answer for that one! Try one of these:",
  chips: ["Who is Divya?", "View projects", "Hobbies & interests", "Fun fact 🎮", "Contact"],
};

let _id = 0;
const mkMsg = (from: Msg["from"], data: Omit<Msg, "id" | "from">): Msg => ({ id: _id++, from, ...data });

// ── Component ──────────────────────────────────────────────────────────────────
export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [thinking, setThinking] = useState(false);
  const [pulse, setPulse] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Pulse the button once after 4s to draw attention
  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Inject greeting on first open
  useEffect(() => {
    if (open && !initialized.current) {
      initialized.current = true;
      setPulse(false);
      setTimeout(() => setMsgs([mkMsg("bot", GREETING)]), 250);
    }
  }, [open]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, thinking]);

  const sendChip = (chip: string) => {
    setMsgs(prev => [...prev, mkMsg("user", { text: chip })]);
    setThinking(true);
    setTimeout(() => {
      const response = RESPONSES[chip.toLowerCase()] ?? FALLBACK;
      setMsgs(prev => [...prev, mkMsg("bot", response)]);
      setThinking(false);
    }, 650);
  };

  const handleAction = (action: Action) => {
    if (action.scrollTo) {
      setOpen(false);
      setTimeout(() => {
        document.getElementById(action.scrollTo!)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else if (action.href) {
      window.open(action.href, "_blank");
    }
  };

  return (
    <>
      {/* Chat card */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="fixed bottom-24 right-4 sm:right-5 z-[10001] w-[calc(100vw-2rem)] sm:w-[370px] flex flex-col rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)] border border-white/10 bg-[#111111]"
            style={{ maxHeight: "min(540px, 78vh)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] bg-[#0d0d0d] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ff2a2a] flex items-center justify-center text-white text-[11px] font-black tracking-tight">
                  NS
                </div>
                <div>
                  <p className="text-white text-[13px] font-bold leading-none">Portfolio Assistant</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-white/30 text-[10px]">Ask me anything about Divya</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 overscroll-contain">
              <AnimatePresence initial={false}>
                {msgs.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col gap-2 ${msg.from === "user" ? "items-end" : "items-start"}`}
                  >
                    {/* Bubble */}
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed font-medium max-w-[88%] ${
                        msg.from === "user"
                          ? "bg-[#ff2a2a] text-white rounded-br-[6px]"
                          : "bg-[#1c1c1c] text-white/85 rounded-bl-[6px]"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Action buttons */}
                    {msg.from === "bot" && msg.actions && (
                      <div className="flex flex-wrap gap-2">
                        {msg.actions.map(action => (
                          <button
                            key={action.label}
                            onClick={() => handleAction(action)}
                            className="px-3.5 py-1.5 rounded-full text-[11px] font-bold border border-[#ff2a2a]/40 text-[#ff2a2a] hover:bg-[#ff2a2a] hover:text-white transition-all duration-150"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Suggestion chips */}
                    {msg.from === "bot" && msg.chips && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.chips.map(chip => (
                          <button
                            key={chip}
                            onClick={() => sendChip(chip)}
                            className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-white/10 text-white/45 hover:border-white/25 hover:text-white/75 active:scale-95 transition-all duration-150"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {thinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start"
                  >
                    <div className="bg-[#1c1c1c] rounded-2xl rounded-bl-[6px] px-4 py-3 flex gap-1.5 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/25"
                          animate={{ opacity: [0.25, 0.9, 0.25] }}
                          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/[0.06] bg-[#0d0d0d] shrink-0">
              <p className="text-white/15 text-[10px] text-center font-mono tracking-widest uppercase">
                tap a suggestion to continue
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div className="fixed bottom-5 right-4 sm:right-5 z-[10002]">
        {/* Pulse ring — fires once to draw attention */}
        {pulse && !open && (
          <span className="absolute inset-0 rounded-full bg-[#ff2a2a] animate-ping opacity-40 pointer-events-none" />
        )}
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full bg-[#ff2a2a] shadow-[0_8px_30px_rgba(255,42,42,0.45)] flex items-center justify-center text-white"
          aria-label={open ? "Close chat" : "Open portfolio chat"}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.svg
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                viewBox="0 0 24 24" fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
