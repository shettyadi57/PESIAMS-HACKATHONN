"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import About from "@/components/About";
import Domains from "@/components/Domains";
import Timeline from "@/components/Timeline";
import Schedule from "@/components/Schedule";
import Prizes from "@/components/Prizes";
import Organizers from "@/components/Organizers";
import Vision from "@/components/Vision";
import FAQ from "@/components/FAQ";
import Venue from "@/components/Venue";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundSystem from "@/components/BackgroundSystem";
import CinematicIntro from "@/components/CinematicIntro";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  // Initialize Lenis Inertial Scroll (only active after intro wraps up)
  useEffect(() => {
    if (showIntro) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [showIntro]);

  return (
    <>
      {/* Cinematic Logo & Line Sweep Entrance */}
      <CinematicIntro onComplete={() => setShowIntro(false)} />

      {/* Main Page Content */}
      {!showIntro && (
        <div className="relative min-h-screen text-white selection:bg-accent-cyan selection:text-black">
          {/* Premium Background System */}
          <BackgroundSystem />

          {/* Liquid Cursor Spotlight Overlay - bleeds over content and highlights text */}
          <div
            className="fixed inset-0 pointer-events-none z-10 mix-blend-screen"
            style={{
              background: `
                radial-gradient(
                  calc(var(--cursor-glow-size, 350px) * 1.35) circle at var(--cursor-vx, -1000px) var(--cursor-vy, -1000px),
                  rgba(6, 182, 212, calc(0.26 * var(--cursor-glow-intensity, 1))) 0%,
                  rgba(139, 92, 246, calc(0.12 * var(--cursor-glow-intensity, 1))) 45%,
                  transparent 100%
                ),
                radial-gradient(
                  calc(var(--cursor-glow-size, 350px) * 0.95) circle at var(--cursor-vxb, -1000px) var(--cursor-vyb, -1000px),
                  rgba(139, 92, 246, calc(0.14 * var(--cursor-glow-intensity, 1))) 0%,
                  rgba(59, 130, 246, calc(0.06 * var(--cursor-glow-intensity, 1))) 50%,
                  transparent 100%
                )
              `,
              filter: "blur(8px)"
            }}
          />

          {/* Clean minimal navigation */}
          <Navbar />

          <main>
            {/* 3D Parallax Building Hero */}
            <Hero />

            {/* Ambition stats bar (Light) */}
            <StatsStrip />

            {/* About BCA Section (Light) */}
            <About />

            {/* 10 Horizontal Domain Tracks (Dark) */}
            <Domains />

            {/* Scroll-drawn Timeline Milestones */}
            <Timeline />

            {/* 24-Hour Agenda Tab panels */}
            <Schedule />

            {/* Overhauled Matte Black Prizes Section */}
            <Prizes />

            {/* Faculty Split Student coordinators (Light) */}
            <Organizers />

            {/* Confident BCA Founders note */}
            <Vision />

            {/* Accordion FAQ (15 items) */}
            <FAQ />

            {/* Interactive Map & Transit directions */}
            <Venue />

            {/* Help desk coordinate hotlines */}
            <Contact />
          </main>

          {/* Socials & Address Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
