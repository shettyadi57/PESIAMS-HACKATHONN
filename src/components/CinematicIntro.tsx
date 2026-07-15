"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PesiamsLogo } from "./BrandLogo";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [scanStatus, setScanStatus] = useState("INITIALIZING SECURE LINK...");

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    // Cycle through high-tech scanning statuses
    const statusTimeline = [
      { text: "ESTABLISHING CONNECTIVITY...", delay: 800 },
      { text: "LOCATING BCA HACKATHON COMMAND CENTERS...", delay: 1800 },
      { text: "GRID SCAN ACTIVE: TARGET LOCKED [PESIAMS HQ]...", delay: 2800 },
      { text: "INITIATING UTKARSH 1.0 MAIN BOOT PROTOCOL...", delay: 4000 },
      { text: "SYSTEMS NOMINAL. ENGINES READY.", delay: 4900 }
    ];

    const timers = statusTimeline.map(item => {
      return setTimeout(() => {
        setScanStatus(item.text);
      }, item.delay);
    });

    const timer = setTimeout(() => {
      setIsVisible(false);
      // Restore scroll after overlay fades out
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
      }, 600);
    }, 5600);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-55 flex flex-col items-center justify-center overflow-hidden bg-[#020208]"
        >
          {/* ── CAMPUS VIDEO BACKGROUND ── */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] saturate-[0.8]"
            src="https://pestrust.edu.in/pesiams/assets/front_end/img/homeBannerVideo.mp4"
          />

          {/* Cybernetic Grid Tint Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020208]/90 via-black/45 to-[#020208]/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#020208_100%)]" />

          {/* ── HIGH-END HUD & 3D GRAPHIC OVERLAYS ── */}
          {/* 1. Matrix/Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,36,0)_96%,rgba(6,182,212,0.15)_96%)] bg-[size:100%_6px] opacity-40 pointer-events-none" />

          {/* 2. Cyber HUD Corner Brackets */}
          <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-accent-cyan/60 pointer-events-none" />
          <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-accent-cyan/60 pointer-events-none" />
          <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-accent-cyan/60 pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-accent-cyan/60 pointer-events-none" />

          {/* 3. Rolling Coordinate Strips (Left/Right) */}
          <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-1 font-mono text-[8px] text-accent-cyan/45 uppercase tracking-widest pointer-events-none">
            <span>SYS.LOC // 13.9298 N</span>
            <span>SYS.LNG // 75.5678 E</span>
            <span>ALTITUDE // 584 M</span>
            <span>RANGE // LOCK_ON</span>
            <div className="h-20 w-[1px] bg-accent-cyan/35 my-2 self-center animate-pulse" />
            <span>BEAM // ACTIVE</span>
          </div>
          <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-1 font-mono text-[8px] text-accent-cyan/45 uppercase tracking-widest pointer-events-none items-end">
            <span>FPS // 60.00</span>
            <span>MEM // 98.42%</span>
            <span>TEMP // 38.6 C</span>
            <span>GRID // 10-DOMAIN</span>
            <div className="h-20 w-[1px] bg-accent-cyan/35 my-2 self-center animate-pulse" />
            <span>LINK // COMPASS</span>
          </div>

          {/* 4. Scanning Radar Sweeper Line */}
          <motion.div
            animate={{ y: ["-100vh", "100vh"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent shadow-[0_0_20px_rgba(6,182,212,0.8)] opacity-70 pointer-events-none z-10"
          />

          {/* Top + Bottom Letterbox Cinema Bars */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: [1, 1, 0] }}
            transition={{ duration: 5.5, times: [0, 0.88, 1], ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-[10vh] bg-black origin-top z-20"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: [1, 1, 0] }}
            transition={{ duration: 5.5, times: [0, 0.88, 1], ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 h-[10vh] bg-black origin-bottom z-20"
          />

          {/* ── FOREGROUND CONTENT ── */}
          <div className="relative flex flex-col items-center justify-center z-10 select-none">

            {/* Rotating 3D HUD Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 rounded-full border border-dashed border-accent-cyan/15 pointer-events-none flex items-center justify-center"
            >
              <div className="w-64 h-64 rounded-full border border-double border-accent-violet/10" />
            </motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-80 h-80 rounded-full border border-accent-cyan/10 border-t-transparent border-b-transparent pointer-events-none"
            />

            {/* Glowing Sweep Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.8,
                times: [0, 0.2, 0.8, 1],
                ease: "easeInOut",
              }}
              className="absolute w-72 h-[1.5px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent shadow-[0_0_20px_#06b6d4] z-20"
            />

            {/* Logo and Presentation Credits Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.93, 1, 1.05, 1.35],
              }}
              transition={{
                duration: 4.0,
                delay: 1.0,
                times: [0, 0.25, 0.75, 1],
                ease: "easeOut",
              }}
              className="flex flex-col items-center gap-6 text-center relative z-10"
            >
              {/* Emblem Logo with Glitch Neon Pulse */}
              <motion.div
                animate={{
                  textShadow: [
                    "0 0 10px rgba(6,182,212,0.8)",
                    "0 0 30px rgba(139,92,246,0.9)",
                    "0 0 10px rgba(6,182,212,0.8)"
                  ],
                  filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <PesiamsLogo
                  className="text-white filter drop-shadow-[0_0_28px_rgba(6,182,212,0.7)]"
                  size={68}
                />
              </motion.div>

              {/* College Branding Text with digital scan effect */}
              <div className="space-y-1">
                <span className="font-display font-black text-sm sm:text-base tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-white block drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  PESIAMS SHIVAMOGGA
                </span>
                <span className="font-display font-black text-[10px] sm:text-xs tracking-[0.24em] text-accent-cyan uppercase block drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Department of BCA Presents
                </span>
              </div>
            </motion.div>

            {/* Live Ticker Status Bar (Bottom Center) */}
            <div className="absolute bottom-[-100px] w-80 text-center font-mono text-[9px] tracking-widest text-accent-cyan/85 pointer-events-none">
              <span className="inline-block border border-accent-cyan/25 bg-black/40 px-4 py-1.5 rounded-md backdrop-blur-md animate-pulse">
                {scanStatus}
              </span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
