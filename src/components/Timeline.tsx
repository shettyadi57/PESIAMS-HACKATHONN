"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const MilestoneScene3D = dynamic(() => import("./MilestoneScene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[520px] rounded-3xl border border-white/8 bg-zinc-950/80">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" />
        <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Loading 3D Scene...</span>
      </div>
    </div>
  ),
});

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



export default function Timeline() {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  // References for scroll tracking
  const container2DRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  // 2D Scroll Progress
  const { scrollYProgress: scroll2DProgress } = useScroll({
    target: container2DRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scroll2DProgress, { stiffness: 100, damping: 20 });

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
              Classic Flow
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-black transition-all duration-300 flex items-center gap-2 clickable ${
                viewMode === "3d"
                  ? "bg-gradient-to-r from-accent-violet to-accent-cyan text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ✦ Interactive 3D
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

      {/* ── Real Interactive 3D Milestone Scene ── */}
      {viewMode === "3d" && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-10">
          <MilestoneScene3D />
        </div>
      )}
    </section>
  );
}
