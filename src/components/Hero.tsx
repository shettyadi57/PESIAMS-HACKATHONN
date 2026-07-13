"use"
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import HeroWebGL from "./HeroWebGL";
import CountdownTimer from "./CountdownTimer";

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.4,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 25, opacity: 0, filter: "blur(5px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 90, damping: 16 },
    },
  } as const;

  const scrollToAbout = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 md:py-32 bg-[#000000]"
    >
      {/* 3D Holographic Globe backdrop */}
      <HeroWebGL />

      {/* Cinematic Content Reveal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Department Credits */}
          <motion.div
            variants={itemVariants}
            className="mb-4"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-bold block mb-1">
              PES Institute of Advanced Management Studies, Shivamogga
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-bold block">
              Department of Computer Applications (BCA)
            </span>
          </motion.div>

          {/* Main Title - Awwwards level display */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-6xl sm:text-7xl md:text-[8rem] tracking-tight leading-none mb-6 select-none bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400 drop-shadow-[0_0_35px_rgba(6,182,212,0.25)]"
          >
            UTKARSH <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">1.0</span>
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            variants={itemVariants}
            className="font-display font-semibold text-lg sm:text-xl md:text-2xl uppercase tracking-[0.12em] text-white mb-8"
          >
            Ignite Ideas. Build the Future.
          </motion.h2>

          {/* Countdown Clock */}
          <motion.div variants={itemVariants} className="mb-10">
            <CountdownTimer />
          </motion.div>

          {/* Trust Metadata Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2.5 mb-10 text-[9px] font-bold uppercase tracking-widest text-zinc-400"
          >
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              Inaugural Edition
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              State-Level Hackathon
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1">
              <Calendar size={10} />
              Oct 24, 2026
            </span>
          </motion.div>

          {/* Single Explorer CTA (No Register CTA until open) */}
          <motion.div
            variants={itemVariants}
            className="w-full sm:w-auto"
          >
            <button
              onClick={scrollToAbout}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-bold transition-all shadow-[0_4px_20px_rgba(255,255,255,0.25)] active:scale-95 flex items-center justify-center gap-2.5 mx-auto clickable"
            >
              Explore Event
              <ArrowRight size={14} className="animate-pulse" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-zinc-700 animate-bounce pointer-events-none">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
