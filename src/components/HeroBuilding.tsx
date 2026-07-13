"use"
"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroBuilding() {
  // Mouse coordinates mapping (-0.5 to 0.5)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for coordinate updates
  const springConfig = { damping: 40, stiffness: 120, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax translation translations per depth layer
  const skyX = useTransform(smoothX, [0, 1], [-10, 10]);
  const skyY = useTransform(smoothY, [0, 1], [-10, 10]);

  const starX = useTransform(smoothX, [0, 1], [-20, 20]);
  const starY = useTransform(smoothY, [0, 1], [-20, 20]);

  const buildingX = useTransform(smoothX, [0, 1], [-35, 35]);
  const buildingY = useTransform(smoothY, [0, 1], [-15, 15]);

  const floorX = useTransform(smoothX, [0, 1], [-50, 50]);
  const floorY = useTransform(smoothY, [0, 1], [-25, 25]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black select-none pointer-events-none">
      
      {/* 1. SKY BACKDROP (Far Layer) */}
      <motion.div
        style={{ x: skyX, y: skyY }}
        className="absolute inset-[-10%] bg-gradient-to-b from-[#030008] via-[#050012] to-[#010103] flex items-center justify-center"
      >
        {/* Soft Volumetric Aurora Light */}
        <div className="absolute w-[60vw] h-[60vw] rounded-full bg-accent-violet/10 blur-[130px] animate-pulse-slow" />
        <div className="absolute w-[50vw] h-[50vw] rounded-full bg-accent-cyan/5 blur-[140px] animate-pulse-slow-delayed" />
      </motion.div>

      {/* 2. STARS & FLOATING PARTICLES (Mid-Far Layer) */}
      <motion.div
        style={{ x: starX, y: starY }}
        className="absolute inset-[-15%] flex items-center justify-center opacity-40"
      >
        <div className="absolute inset-0 grid-bg rotate-12 scale-125 opacity-30" />
        {/* Floating Particle Dots */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1.5px,transparent_1.5px)] bg-[size:48px_48px] animate-aurora" />
      </motion.div>

      {/* 3. PESIAMS BUILDING SILHOUETTE (Main Subject Layer) */}
      <motion.div
        style={{ x: buildingX, y: buildingY }}
        className="absolute inset-x-[-10%] bottom-0 h-[60vh] min-h-[400px] flex items-end justify-center z-10"
      >
        {/* Stylized Architectural Facade of PESIAMS */}
        <div className="relative w-full max-w-4xl h-[42vh] flex items-end justify-center filter drop-shadow-[0_-15px_35px_rgba(139,92,246,0.15)]">
          
          {/* Main Central Academic Block */}
          <div className="absolute bottom-0 w-72 h-[35vh] bg-[#0c0d12] border-t border-x border-white/10 rounded-t-xl flex flex-col justify-between p-6">
            {/* Glowing Window grids */}
            <div className="grid grid-cols-6 gap-2 opacity-65">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-sm transition-all duration-1000 ${
                    Math.random() > 0.45 ? "bg-amber-400/85 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse" : "bg-zinc-900"
                  }`}
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
            {/* Central Pillar Glass Archway */}
            <div className="w-20 h-28 bg-[#151722] border border-white/20 rounded-t-lg mx-auto flex items-center justify-center shadow-[inset_0_0_15px_rgba(6,182,212,0.15)]">
              {/* Dynamic lighting beams */}
              <div className="w-[1px] h-full bg-gradient-to-t from-accent-cyan via-accent-cyan/20 to-transparent shadow-[0_0_8px_#06b6d4]" />
            </div>
          </div>

          {/* Left Wing Block */}
          <div className="absolute bottom-0 left-[5%] md:left-[10%] w-72 h-[28vh] bg-[#090a0f] border-t border-x border-white/5 rounded-t-lg p-5">
            <div className="grid grid-cols-8 gap-1.5 opacity-40">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-sm ${
                    Math.random() > 0.6 ? "bg-amber-400/70 shadow-[0_0_5px_rgba(245,158,11,0.4)]" : "bg-zinc-950"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Wing Block */}
          <div className="absolute bottom-0 right-[5%] md:right-[10%] w-72 h-[28vh] bg-[#090a0f] border-t border-x border-white/5 rounded-t-lg p-5">
            <div className="grid grid-cols-8 gap-1.5 opacity-40">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-sm ${
                    Math.random() > 0.65 ? "bg-amber-400/75 shadow-[0_0_5px_rgba(245,158,11,0.4)]" : "bg-zinc-950"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Upward Volumetric Spotlights */}
          <div className="absolute -bottom-10 left-[25%] w-24 h-[50vh] bg-gradient-to-t from-accent-violet/20 via-accent-violet/5 to-transparent origin-bottom rotate-[-12deg] blur-xl pointer-events-none animate-pulse-slow" />
          <div className="absolute -bottom-10 right-[25%] w-24 h-[50vh] bg-gradient-to-t from-accent-cyan/15 via-accent-cyan/3 to-transparent origin-bottom rotate-[12deg] blur-xl pointer-events-none animate-pulse-slow-delayed" />
        </div>
      </motion.div>

      {/* 4. GROUND GRID FLOOR (Near Layer) */}
      <motion.div
        style={{ x: floorX, y: floorY }}
        className="absolute inset-x-[-20%] bottom-[-5%] h-[12vh] bg-gradient-to-t from-[#020203] to-[#000000] border-t border-white/10 z-20"
      >
        {/* Soft volumetric fog layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)] blur-md" />
      </motion.div>

      {/* Dynamic Vignette Shadow Cover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/45 z-30 pointer-events-none" />
    </div>
  );
}
