"use client";

import { useRef } from "react";
import VariableProximity from "./variable-proximity";

const CONTACT_EMAIL = "naveensinghdivyasingh@gmail.com";
const GITHUB_URL = "https://github.com/nsdivyasingh";
const LINKEDIN_URL = "https://linkedin.com/in/nsdivyasingh";

export function Footer() {
  const year = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <footer className="bg-[#111111] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          <p>AI Engineering &amp; Full-Stack Development</p>
          <p>LLMs, Automation, Cloud Systems</p>
          <p>Research &amp; Applied AI</p>
        </div>
        <div className="flex flex-col gap-1 md:items-center">
          <p>2+ Years Building</p>
          <a
            href="#projects"
            className="underline hover:text-white transition-colors mt-1 underline-offset-4 decoration-1"
          >
            View Work
          </a>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <p>Worldwide Available</p>
          <p>{year}</p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden relative"
      >
        <h2 className="text-[18vw] md:text-[16vw] leading-none font-bold tracking-tighter lowercase select-none text-[#f4f4f4] w-full text-center">
          <VariableProximity
            label="divya singh"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={240}
            falloff="linear"
          />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <a
            href="#contact"
            className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold"
          >
            Contact
          </a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            © {year} NS Divya Singh | Built with Next.js
          </p>
        </div>
        <div className="flex flex-col gap-1 md:items-center">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline hover:text-white transition-colors underline-offset-4 decoration-1 lowercase"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <p className="mb-1 text-white/40">Connect</p>
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#d4d4d4] hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#d4d4d4] hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
