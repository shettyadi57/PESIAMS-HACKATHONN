"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PesiamsLogo } from "./BrandLogo";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      // Restore scroll after overlay fades out
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
      }, 600);
    }, 5500);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* ── CAMPUS VIDEO BACKGROUND ── */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://pestrust.edu.in/pesiams/assets/front_end/img/homeBannerVideo.mp4"
          />

          {/* Dark cinematic overlay — ensures text remains legible */}
          <div className="absolute inset-0 bg-black/65" />

          {/* Vignette edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

          {/* Top + Bottom letterbox bars */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: [1, 1, 0] }}
            transition={{ duration: 5.5, times: [0, 0.85, 1], ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-[8vh] bg-black origin-top"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: [1, 1, 0] }}
            transition={{ duration: 5.5, times: [0, 0.85, 1], ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 h-[8vh] bg-black origin-bottom"
          />

          {/* ── FOREGROUND CONTENT ── */}
          <div className="relative flex flex-col items-center justify-center z-10">

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
              className="absolute w-60 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_#ffffff]"
            />

            {/* Logo and Presentation Credits Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.93, 1, 1.05, 1.35],
              }}
              transition={{
                duration: 3.8,
                delay: 1.2,
                times: [0, 0.25, 0.75, 1],
                ease: "easeOut",
              }}
              className="flex flex-col items-center gap-5 text-center relative z-10"
            >
              {/* Emblem Logo */}
              <PesiamsLogo
                className="text-white filter drop-shadow-[0_0_25px_rgba(255,255,255,0.55)]"
                size={60}
              />

              {/* College Branding Text */}
              <div>
                <span className="font-display font-black text-xs sm:text-sm tracking-[0.3em] uppercase text-zinc-200 block drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  PESIAMS SHIVAMOGGA
                </span>
                <span className="font-display font-bold text-[9px] sm:text-xs tracking-[0.18em] text-zinc-400 uppercase block mt-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  Department of BCA Presents
                </span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
