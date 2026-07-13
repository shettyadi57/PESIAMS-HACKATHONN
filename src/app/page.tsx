"use"
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
import CustomCursor from "@/components/CustomCursor";
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
        <div className="relative min-h-screen bg-background text-white selection:bg-accent-cyan selection:text-black">
          {/* Custom Difference blend Cursor */}
          <CustomCursor />

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
