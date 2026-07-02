"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isLight = scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isLight
            ? "bg-white/95 backdrop-blur-md border-b border-black/[0.06] shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10 h-16">
          {/* Logo */}
          <a
            href="#"
            className={`text-[15px] font-extrabold tracking-tight transition-colors duration-300 ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            NS Divya Singh
            <span className="text-[#ff2a2a]">.</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative text-sm font-semibold transition-colors duration-300 group ${
                    isLight
                      ? isActive ? "text-black" : "text-black/50 hover:text-black"
                      : isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#ff2a2a] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className={`hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              isLight
                ? "bg-[#ff2a2a] text-white hover:bg-red-700"
                : "border border-white/40 text-white hover:bg-white hover:text-black"
            }`}
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          >
            <span
              className={`block h-[2px] w-6 rounded-full transition-all duration-300 origin-center ${
                isLight ? "bg-black" : "bg-white"
              } ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                isLight ? "bg-black" : "bg-white"
              } ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block h-[2px] w-6 rounded-full transition-all duration-300 origin-center ${
                isLight ? "bg-black" : "bg-white"
              } ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-black/5 shadow-lg md:hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              {links.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-semibold transition-colors duration-200 ${
                      isActive ? "text-[#ff2a2a]" : "text-black/60 hover:text-black"
                    }`}
                  >
                    {label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold bg-[#ff2a2a] text-white hover:bg-red-700 transition-colors"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
