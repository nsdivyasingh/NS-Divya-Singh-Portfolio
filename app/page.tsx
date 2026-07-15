import { AboutSection } from "@/components/about-section";
import { PortfolioChat } from "@/components/portfolio-chat";
import { ContactSection } from "@/components/contact-section";
import { CustomCursor } from "@/components/custom-cursor";
import { ExperienceSection } from "@/components/experience-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { IntroWrapper } from "@/components/intro-wrapper";
import { Navbar } from "@/components/navbar";
import { CurvedLoop } from "@/components/curved-loop";
import { ProjectsSection } from "@/components/projects-section";
import { ResearchSection } from "@/components/research-section";
import { BlogSection } from "@/components/blog-section";
import { RibbonsPlayground } from "@/components/ribbons-playground";
import { SnakeGame } from "@/components/snake-game";
import { SmoothScroll } from "@/components/smooth-scroll";
import { TechStackSection } from "@/components/tech-stack-section";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      <IntroWrapper />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ExpertiseSection />
      <TechStackSection />
      <div className="bg-white py-4 border-y border-gray-100">
        <CurvedLoop
          marqueeText="Build what matters ✦ Ship with confidence ✦ Stay curious ✦ Never stop creating ✦ "
          speed={3.5}
          curveAmount={360}
          direction="left"
        />
      </div>
      <ProjectsSection />
      <ResearchSection />
      <BlogSection />
      <RibbonsPlayground />
      <SnakeGame />
      <ContactSection />
      <Footer />
      <PortfolioChat />
    </>
  );
}
