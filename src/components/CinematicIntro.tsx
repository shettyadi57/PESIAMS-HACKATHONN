"use"
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
    }, 4500);

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
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Ambient Backing Radial Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.1, 0.15, 0] }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="absolute w-[50vw] h-[50vw] rounded-full bg-white/10 blur-[120px] pointer-events-none"
          />

          {/* Intro Sequence Elements Container */}
          <div className="relative flex flex-col items-center justify-center">
            
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
                duration: 3.4,
                delay: 1.0,
                times: [0, 0.25, 0.75, 1],
                ease: "easeOut",
              }}
              className="flex flex-col items-center gap-5 text-center relative z-10"
            >
              {/* Emblem Logo */}
              <PesiamsLogo
                className="text-white filter drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                size={56}
              />
              
              {/* College Branding Text */}
              <div>
                <span className="font-display font-black text-xs sm:text-sm tracking-[0.3em] uppercase text-zinc-400 block">
                  PESIAMS SHIVAMOGGA
                </span>
                <span className="font-display font-bold text-[9px] sm:text-xs tracking-[0.18em] text-zinc-600 uppercase block mt-1.5">
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
