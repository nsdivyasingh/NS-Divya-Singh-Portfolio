"use client";

import { useState } from "react";

import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { IntroLoader } from "@/components/intro-loader";
import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";
import { SmoothScroll } from "@/components/smooth-scroll";
import { TechStackSection } from "@/components/tech-stack-section";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <SmoothScroll />
      <Navbar />
      {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
