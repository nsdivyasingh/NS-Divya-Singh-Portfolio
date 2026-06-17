"use client";

import { useState } from "react";

import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { IntroLoader } from "@/components/intro-loader";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <SmoothScroll />
      {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}
      <HeroSection />
      <AboutSection />
    </>
  );
}
