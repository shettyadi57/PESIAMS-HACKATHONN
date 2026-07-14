"use client";

import React, { useEffect, useState } from "react";

export default function BackgroundSystem() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 w-full h-full bg-[#050505] overflow-hidden pointer-events-none">
      {/* 1. Fine Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />

      {/* 2. Soft Animated Gradient (Aurora Blobs in the far background) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-violet/4 blur-[140px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-cyan/3 blur-[140px] animate-pulse-slow-delayed pointer-events-none" />

      {/* 3. Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none noise-bg" />

      {/* 4. Advanced Interactive Liquid Spotlight following the mouse cursor with feathering and trail */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              calc(var(--cursor-glow-size, 350px) * 1.2) circle at var(--cursor-vx, -1000px) var(--cursor-vy, -1000px),
              rgba(6, 182, 212, calc(0.24 * var(--cursor-glow-intensity, 1))) 0%,
              rgba(139, 92, 246, calc(0.12 * var(--cursor-glow-intensity, 1))) 45%,
              transparent 100%
            ),
            radial-gradient(
              calc(var(--cursor-glow-size, 350px) * 0.95) circle at var(--cursor-vxb, -1000px) var(--cursor-vyb, -1000px),
              rgba(139, 92, 246, calc(0.14 * var(--cursor-glow-intensity, 1))) 0%,
              rgba(59, 130, 246, calc(0.08 * var(--cursor-glow-intensity, 1))) 50%,
              transparent 100%
            ),
            radial-gradient(
              calc(var(--cursor-glow-size, 350px) * 0.75) circle at var(--cursor-vxc, -1000px) var(--cursor-vyc, -1000px),
              rgba(59, 130, 246, calc(0.08 * var(--cursor-glow-intensity, 1))) 0%,
              transparent 100%
            )
          `,
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
