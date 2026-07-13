"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";

interface Phase {
  num: string;
  date: string;
  title: string;
  desc: string;
}

const phases: Phase[] = [
  {
    num: "01",
    date: "Jul 25, 2026",
    title: "Official Announcement",
    desc: "UTKARSH 1.0 website and portal go live. Notifications and posters dispatched to leading BCA campuses across Karnataka.",
  },
  {
    num: "02",
    date: "Aug 1, 2026",
    title: "Registrations Open",
    desc: "Online portals open for team registration. Builder guides, API resources, and participant handbooks are published.",
  },
  {
    num: "03",
    date: "Aug 25, 2026",
    title: "The Hacking Marathon Begins",
    desc: "Registration closes. Hacking kicks off — teams lock in their problem statements and sprint begins with mentors on deck.",
  },
  {
    num: "04",
    date: "Sep 5, 2026 — 09:00 AM",
    title: "Hackathon Day",
    desc: "The big day arrives at PESIAMS, Shivamogga. Opening ceremony, team check-in, live demos, and expert evaluation rounds.",
  },
  {
    num: "05",
    date: "Sep 5, 2026 — 04:00 PM",
    title: "Award Ceremony",
    desc: "UTKARSH 1.0 champions, runners-up, and special innovation award winners are announced. Certificates & prizes distributed.",
  },
];

// Component for 2D Timeline Card
function TimelineCard2D({ phase, index }: { phase: Phase; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`flex flex-col lg:flex-row items-start lg:items-center justify-between w-full mb-12 lg:mb-20 relative z-10 ${
        isEven ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="hidden lg:block w-5/12" />

      <div className="absolute left-[16px] lg:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-border-glass flex items-center justify-center z-20">
        <motion.div
          initial={{ scale: 0.4, opacity: 0.3 }}
          animate={isInView ? { scale: 1.1, opacity: 1 } : {}}
          className={`w-3.5 h-3.5 rounded-full ${
            isInView ? "bg-gradient-to-r from-accent-violet to-accent-cyan timeline-dot-active" : "bg-zinc-700"
          } transition-all duration-500`}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
        className="w-full lg:w-5/12 pl-12 lg:pl-0"
      >
        <div className="group relative overflow-hidden rounded-2xl glass-panel p-6 md:p-8 hover:bg-card-dark-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent-cyan">
              {phase.date}
            </span>
            <span className="font-display font-black text-2xl text-accent-violet/30 group-hover:text-accent-cyan/60 transition-colors">
              {phase.num}
            </span>
          </div>

          <h3 className="font-display font-black text-xl text-white mb-2 group-hover:text-accent-cyan transition-colors">
            {phase.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-normal">
            {phase.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Component for 3D Road Timeline Card
function TimelineRoadCard3D({
  phase,
  index,
  scrollYProgress,
  isMobile,
}: {
  phase: Phase;
  index: number;
  scrollYProgress: any;
  isMobile: boolean;
}) {
  const isEven = index % 2 === 0;
  const total = phases.length;

  // Stagger entry points along the scroll path (0.05 to 0.95)
  const start = 0.05 + (index / total) * 0.85;
  const peak = start + 0.06;
  const end = start + 0.12;

  // Z-translation (depth) - cards fly from back to front
  const z = useTransform(scrollYProgress, [start, peak, end], [-700, 0, 450]);
  
  // Y-translation (vertical position) - slides down slightly as it approaches
  const y = useTransform(scrollYProgress, [start, peak, end], [-60, 0, 120]);
  
  // Scale - grows as it approaches, then zooms past
  const scale = useTransform(scrollYProgress, [start, peak, end], [0.1, 1.0, 1.45]);
  
  // Opacity - fades in, remains solid, then fades out as it passes the screen
  const opacity = useTransform(scrollYProgress, [start, start + 0.02, peak + 0.04, end], [0, 1, 1, 0]);

  // Horizontal offset: alternate sides on desktop, center on mobile
  const xOffset = isMobile ? 0 : isEven ? -220 : 220;

  return (
    <motion.div
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
        x: xOffset,
        y,
        z,
        scale,
        opacity,
      }}
      className="w-[280px] md:w-[360px] p-6 rounded-2xl glass-panel border-2 border-white/10 hover:border-accent-cyan/50 transition-all duration-300 pointer-events-auto shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-2.5 py-1 rounded-full">
          {phase.date}
        </span>
        <span className="font-display font-black text-2xl text-accent-violet/30">
          {phase.num}
        </span>
      </div>
      <h3 className="font-display font-black text-lg text-white mb-2 leading-snug">
        {phase.title}
      </h3>
      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
        {phase.desc}
      </p>
    </motion.div>
  );
}

export default function Timeline() {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [isMobile, setIsMobile] = useState(false);

  // References for scroll tracking
  const container2DRef = useRef<HTMLDivElement>(null);
  const road3DRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2D Scroll Progress
  const { scrollYProgress: scroll2DProgress } = useScroll({
    target: container2DRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scroll2DProgress, { stiffness: 100, damping: 20 });

  // 3D Road Scroll Progress
  const { scrollYProgress: scroll3DProgress } = useScroll({
    target: road3DRef,
    offset: ["start start", "end end"],
  });
  
  // Connect scroll to moving grid lines on the road
  const roadY = useTransform(scroll3DProgress, [0, 1], ["0%", "200%"]);

  return (
    <section id="timeline" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass bg-transparent">
      {/* Subtle background glow */}
      <div className="absolute top-[20%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-accent-violet/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-accent-cyan/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col mb-12 max-w-xl lg:mx-auto lg:text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase mb-3"
          >
            03 // The Road to Utkarsh
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-6"
          >
            Milestones & Timeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-zinc-400 leading-relaxed font-normal"
          >
            Trace the steps from registration announcements up to the final podium presentation sprints.
          </motion.p>
        </div>

        {/* Dynamic Mode Switcher Toggle */}
        <div className="flex justify-center mb-16 relative z-30">
          <div className="inline-flex rounded-full bg-white/5 border border-white/10 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setViewMode("2d")}
              className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-black transition-all duration-300 flex items-center gap-2 clickable ${
                viewMode === "2d"
                  ? "bg-white text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Classic Flow (2D)
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-black transition-all duration-300 flex items-center gap-2 clickable ${
                viewMode === "3d"
                  ? "bg-white text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Interactive Highway (3D)
            </button>
          </div>
        </div>

        {/* 2D Render Container */}
        {viewMode === "2d" && (
          <div ref={container2DRef} className="relative max-w-5xl mx-auto py-10">
            {/* Base Inactive Connector Pipe */}
            <div className="absolute left-[16px] lg:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-zinc-800/40 rounded-full" />

            {/* Active Glowing Scroll-drawn Pipe */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute left-[16px] lg:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-violet via-accent-cyan to-accent-violet rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)] z-10"
            />

            {/* Timeline Cards */}
            <div className="space-y-4">
              {phases.map((phase, idx) => (
                <TimelineCard2D key={phase.num} phase={phase} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3D Render Container (Renders outside constraints for full immersion) */}
      {viewMode === "3d" && (
        <div ref={road3DRef} className="relative h-[300vh] w-full bg-black/40">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-16 px-4">
            
            {/* 3D Perspective Stage Viewport */}
            <div className="w-full max-w-5xl h-[65vh] md:h-[75vh] flex items-center justify-center relative perspective-container overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 shadow-2xl backdrop-blur-sm">
              {/* Star dust background dots */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1.5px,transparent_1.5px)] bg-[size:40px_40px] opacity-70" />
              
              {/* 3D Rotated Road Plane */}
              <div className="absolute w-[300px] md:w-[480px] h-[900px] bottom-[-300px] road-3d flex justify-center origin-bottom pointer-events-none">
                {/* Dark road surface */}
                <div className="absolute inset-0 bg-black/85 border-x-2 border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]">
                  {/* Grid Lines Pattern moving on scroll */}
                  <motion.div 
                    className="absolute inset-0 road-grid-pattern opacity-40"
                    style={{ backgroundPositionY: roadY }}
                  />
                  {/* Neon Cyan left line border */}
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-cyan neon-glow-cyan" />
                  {/* Neon Violet/Pink right line border */}
                  <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-accent-violet via-accent-cyan to-accent-violet neon-glow-violet" />
                  {/* ── Center lane dashes — scroll with road ────────── */}
                  <motion.div
                    className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] overflow-hidden pointer-events-none"
                    style={{ y: roadY }}
                  >
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-full bg-white/55 rounded-full"
                        style={{ height: 48, marginBottom: 36 }}
                      />
                    ))}
                  </motion.div>

                  {/* ── Left quarter-lane marker ────────── */}
                  <motion.div
                    className="absolute top-0 bottom-0 overflow-hidden pointer-events-none"
                    style={{ left: "25%", y: roadY }}
                  >
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[2px] bg-white/18 rounded-full"
                        style={{ height: 36, marginBottom: 48 }}
                      />
                    ))}
                  </motion.div>

                  {/* ── Right quarter-lane marker ────────── */}
                  <motion.div
                    className="absolute top-0 bottom-0 overflow-hidden pointer-events-none"
                    style={{ right: "25%", y: roadY }}
                  >
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[2px] bg-white/18 rounded-full"
                        style={{ height: 36, marginBottom: 48 }}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Holographic grid horizon line */}
              <div className="absolute left-1/2 top-[35%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-1/2 pointer-events-none" />

              {/* 3D Billboard Nodes Wrapper */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                {phases.map((phase, idx) => (
                  <TimelineRoadCard3D
                    key={phase.num}
                    phase={phase}
                    index={idx}
                    scrollYProgress={scroll3DProgress}
                    isMobile={isMobile}
                  />
                ))}
              </div>

              {/* Top Vignette (Horizon fading into pitch black) */}
              <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-zinc-950 via-zinc-950/85 to-transparent pointer-events-none" />
              
              {/* Bottom Vignette (Fades cards out near the camera lens) */}
              <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

              {/* Scrolling Indicator Badge */}
              <div className="absolute bottom-6 right-6 px-4.5 py-2.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center gap-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 select-none">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
                <span>Scroll to Traverse Road</span>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
}
