"use client";

import { useState } from "react";
import { ReactLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import Hero from "@/components/Hero";

import SkillsSection from "@/components/sections/SkillsSection";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import CpStats from "@/components/CpStats";
import Contact from "@/components/Contact";
import Preloader from "@/components/Preloader";
import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div
        style={{ opacity: loading ? 0 : 1 }}
        className="transition-opacity duration-700"
      >
        <ReactLenis
          root
          options={{
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
          }}
        >
          <main
            className={cn(
              "bg-bg",
              "canvas-overlay-mode"
            )}
          >
            <Hero />
            <SkillsSection />
            <SectionWrapper id="experience">
              <Experience />
            </SectionWrapper>
            <SectionWrapper id="projects">
              <Projects />
            </SectionWrapper>
            <SectionWrapper>
              <Achievements />
            </SectionWrapper>
            <SectionWrapper>
              <CpStats />
            </SectionWrapper>
            <SectionWrapper id="contact">
              <Contact />
            </SectionWrapper>
          </main>
        </ReactLenis>
      </div>
    </>
  );
}
