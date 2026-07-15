"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { PesiamsLogo, UtkarshLogo } from "./BrandLogo";


interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  // ── 3D Cursor Parallax refs ────────────────────────────────────────
  const heroRef    = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const mousePos   = useRef({ x: 0, y: 0 });   // raw target
  const current    = useRef({ rx: 0, ry: 0 });  // lerped current
  const rafId      = useRef<number>(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      // Normalize -1 → +1
      mousePos.current.x = ((e.clientX - left) / width  - 0.5) * 2;
      mousePos.current.y = ((e.clientY - top)  / height - 0.5) * 2;
    };

    const onLeave = () => {
      mousePos.current = { x: 0, y: 0 }; // reset to centre on mouse leave
    };

    const MAX_DEG = 4; // maximum tilt in degrees
    const LERP    = 0.055; // smoothness (lower = more lag)

    const tick = () => {
      // Lerp current toward target
      current.current.rx += (mousePos.current.y * -MAX_DEG - current.current.rx) * LERP;
      current.current.ry += (mousePos.current.x *  MAX_DEG - current.current.ry) * LERP;

      if (videoWrapRef.current) {
        videoWrapRef.current.style.transform =
          `perspective(900px) rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg) scale3d(1.06,1.06,1)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

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

  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 md:py-32 bg-[#050505]"
    >
      {/* ── Full-Screen Video Background ─────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 3D parallax wrapper — tilts on cursor move */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0"
          style={{
            transformOrigin: "center center",
            willChange: "transform",
            transition: "transform 0.05s linear",
          }}
        >

        {/* VIDEO — full cover like a cinema backdrop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            mixBlendMode: "screen",
            opacity: 0.90,
            filter:
              "brightness(1.2) saturate(1.45) contrast(1.05)",
            willChange: "transform",
            transform: "translateZ(0)", // force GPU layer — smooth on mobile
          }}
        >
          <source src="/hero_robot.mp4" type="video/mp4" />
        </video>

        {/* ── GRADIENT LAYER 1: Deep diagonal aurora (violet → cyan) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.22) 0%, transparent 45%, rgba(6,182,212,0.18) 100%)",
          }}
        />

        {/* ── GRADIENT LAYER 2: Radial spotlight — centre stays bright, edges dark */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 70% at 50% 48%, transparent 20%, rgba(5,5,5,0.55) 70%, rgba(5,5,5,0.92) 100%)",
          }}
        />

        {/* ── GRADIENT LAYER 3: Bottom-to-top cinematic fade (seamless into page) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.7) 18%, transparent 50%, rgba(5,5,5,0.5) 85%, #050505 100%)",
          }}
        />

        {/* ── GRADIENT LAYER 4: Left & right edge darkening */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.6) 100%)",
          }}
        />

        {/* ── Aurora glow blobs */}
        <div className="absolute top-0 left-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-violet/12 blur-[160px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-0 right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-cyan/10 blur-[160px] animate-pulse-slow-delayed pointer-events-none" />
        <div className="absolute top-[30%] right-[15%] w-[30vw] h-[30vw] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />

        {/* ── Fine grid overlay for premium texture */}
        <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
        </div>{/* end 3D parallax wrapper */}
      </div>



      {/* Cinematic Content Reveal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* ── PESIAMS College Logo Badge ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-3 mb-6"
          >
            {/* Logo pill */}
            <div
              className="flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 20px rgba(139,92,246,0.12), 0 0 40px rgba(6,182,212,0.08)",
              }}
            >
              <PesiamsLogo
                size={28}
                className="text-accent-cyan"
              />
              <div className="w-[1px] h-5 bg-white/15" />
              <UtkarshLogo size={24} className="text-accent-violet" />
              <div className="w-[1px] h-5 bg-white/15" />
              <div className="text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 leading-none">
                  PESIAMS · Shivamogga
                </p>
                <p className="text-[8px] uppercase tracking-[0.12em] text-zinc-600 leading-none mt-0.5">
                  Dept. of Computer Applications (BCA)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="font-display font-black text-6xl sm:text-7xl md:text-[8rem] tracking-tight leading-none mb-6 select-none transition-all duration-300 drop-shadow-[0_0_35px_rgba(6,182,212,0.25)]"
            style={{
              backgroundImage: isHovered
                ? `radial-gradient(circle 240px at ${coords.x}px ${coords.y}px, #06b6d4 0%, #8b5cf6 45%, #ffffff 90%)`
                : "linear-gradient(to bottom, #ffffff 0%, #f4f4f5 50%, #a1a1aa 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            UTKARSH 1.0
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
              Sep 5, 2026
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="w-full sm:w-auto">
            <button
              onClick={scrollToAbout}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-bold transition-all shadow-[0_4px_20px_rgba(255,255,255,0.22)] active:scale-95 flex items-center justify-center gap-2.5 mx-auto clickable"
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
