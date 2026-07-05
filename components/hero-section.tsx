"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-primaryRed">
      {/* Background Image */}
      <Image
        src="/images/hero/hero.jpg"
        alt="Divya Singh Hero"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/85 via-[#B11226]/45 to-transparent" />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] items-start px-16 pt-40"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
          delay: 0.15,
        }}
      >
        <div className="max-w-[720px]">
          {/* Heading */}
          <h1 className="text-[52px] font-extrabold leading-[1.02] tracking-[-0.05em] text-white">
            <span className="block">
              Hi, I&apos;m
            </span>

            <span className="mt-3 block text-[68px] leading-[0.95]">
              NS Divya Singh
            </span>
          </h1>

        {/* Roles */}
          <p className="mt-8 text-[22px] font-bold tracking-tight text-white/95">
            AI Engineer <span className="mx-2 text-white/70">•</span>
            Researcher <span className="mx-2 text-white/70">•</span>
            Builder
          </p>

          {/* Description */}
          <p className="mt-7 max-w-[700px] text-[18px] leading-[1.6] text-white/90">
            Building intelligent systems, conducting impactful
            research, and transforming innovative ideas into
            products that create real-world value.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button
              asChild
              className="h-12 rounded-full px-6 text-sm font-semibold"
            >
              <a href="#projects">Explore Projects</a>
            </Button>

            <Button
              asChild
              size="default"
              variant="outline"
              className="h-12 rounded-full border-white/50 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white hover:text-black"
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}