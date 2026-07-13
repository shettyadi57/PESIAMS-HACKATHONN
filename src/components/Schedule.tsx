"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Evt {
  time: string;
  title: string;
  above: boolean;
  // only two accent colors — violet or cyan, matching site palette
  accent: "violet" | "cyan";
}

const EVENTS: Evt[] = [
  { time: "09:00 AM", title: "Registration & Check-in",   above: false, accent: "violet" },
  { time: "09:30 AM", title: "Inauguration",              above: true,  accent: "cyan"   },
  { time: "10:00 AM", title: "Hacking Begins",            above: false, accent: "cyan"   },
  { time: "01:00 PM", title: "Lunch Break",               above: true,  accent: "violet" },
  { time: "02:00 PM", title: "Mentoring Session",         above: false, accent: "violet" },
  { time: "03:00 PM", title: "Surprise Challenge",        above: true,  accent: "cyan"   },
  { time: "04:00 PM", title: "Final Submissions",         above: false, accent: "cyan"   },
  { time: "04:30 PM", title: "Project Judging",           above: true,  accent: "violet" },
  { time: "05:00 PM", title: "Award Ceremony",            above: false, accent: "cyan"   },
];

// ─── Color constants ─────────────────────────────────────────────────────────
const C = {
  violet: {
    hex:    "#8b5cf6",
    glow:   "rgba(139,92,246,0.35)",
    ring:   "rgba(139,92,246,0.22)",
    border: "rgba(139,92,246,0.5)",
    bg:     "rgba(139,92,246,0.08)",
    text:   "#a78bfa",
  },
  cyan: {
    hex:    "#06b6d4",
    glow:   "rgba(6,182,212,0.35)",
    ring:   "rgba(6,182,212,0.22)",
    border: "rgba(6,182,212,0.5)",
    bg:     "rgba(6,182,212,0.08)",
    text:   "#22d3ee",
  },
} as const;

// ─── Layout constants (px) ───────────────────────────────────────────────────
const CARD_W  = 130;
const CARD_H  = 64;
const STEM_H  = 46;
const SP      = 158;   // horizontal spacing between nodes
const PAD_L   = 60;
const PAD_R   = CARD_W + 20;  // enough room so last card never clips
const LINE_Y  = CARD_H + STEM_H;                        // 110 — y of track
const TOTAL_H = LINE_Y + STEM_H + CARD_H + 24;          // 244
const TOTAL_W = PAD_L + EVENTS.length * SP + PAD_R;

const cx = (i: number) => PAD_L + 28 + i * SP;          // node centre x

// ─── Single Event Node ────────────────────────────────────────────────────────
function Node({ evt, i, visible }: { evt: Evt; i: number; visible: boolean }) {
  const col   = C[evt.accent];
  const x     = cx(i);
  const cardX = x - CARD_W / 2;
  const cardY = evt.above ? 0 : LINE_Y + STEM_H + 8;

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: evt.above ? -14 : 14 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: i * 0.09 }}
        style={{
          position: "absolute",
          left: cardX,
          top: cardY,
          width: CARD_W,
          height: CARD_H,
          zIndex: 10,
        }}
      >
        <div
          className="glass-panel rounded-xl h-full"
          style={{
            padding: "10px 12px",
            borderLeft: `2px solid ${col.border}`,
            boxShadow: `0 0 20px ${col.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}
        >
          {/* Time badge */}
          <span
            className="block text-[9px] font-black uppercase tracking-widest mb-1.5"
            style={{ color: col.text }}
          >
            {evt.time}
          </span>
          {/* Title */}
          <span
            className="block text-[11.5px] font-bold text-white leading-snug"
            style={{ letterSpacing: "-0.01em" }}
          >
            {evt.title}
          </span>
        </div>
      </motion.div>
    </>
  );
}

// ─── SVG Layer (track + stems + dots) ────────────────────────────────────────
function TrackSVG({ visible }: { visible: boolean }) {
  return (
    <svg
      width={TOTAL_W}
      height={TOTAL_H}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <defs>
        {/* Site-matched gradient: violet → cyan → violet */}
        <linearGradient id="track-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#8b5cf6" />
          <stop offset="50%"  stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        {/* Soft glow filter */}
        <filter id="soft-glow" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* === GLOW LAYER behind track === */}
      <line
        x1={PAD_L} y1={LINE_Y} x2={TOTAL_W - PAD_R} y2={LINE_Y}
        stroke="url(#track-grad)" strokeWidth={8} strokeOpacity={0.18}
        filter="url(#soft-glow)"
      />

      {/* === TRACK LINE === */}
      <motion.line
        x1={PAD_L} y1={LINE_Y} x2={TOTAL_W - PAD_R} y2={LINE_Y}
        stroke="url(#track-grad)" strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={visible ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.15 }}
      />

      {EVENTS.map((evt, i) => {
        const col     = C[evt.accent];
        const x       = cx(i);
        const stemTop = evt.above ? CARD_H + 2  : LINE_Y + 2;
        const stemBot = evt.above ? LINE_Y - 2  : LINE_Y + STEM_H + 8;

        return (
          <g key={i}>
            {/* Stem */}
            <motion.line
              x1={x} y1={stemTop} x2={x} y2={stemBot}
              stroke={col.hex} strokeWidth={1} strokeOpacity={0.45}
              strokeDasharray="3 3"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={visible ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.09 + 0.35 }}
              style={{ transformOrigin: `${x}px ${stemTop}px` }}
            />
            {/* Outer glow ring */}
            <motion.circle
              cx={x} cy={LINE_Y} r={11}
              fill={col.ring}
              stroke={col.hex} strokeWidth={1} strokeOpacity={0.4}
              filter="url(#dot-glow)"
              initial={{ scale: 0 }}
              animate={visible ? { scale: 1 } : {}}
              transition={{ type:"spring", stiffness:200, damping:14, delay: i*0.09+0.28 }}
              style={{ transformOrigin: `${x}px ${LINE_Y}px` }}
            />
            {/* Inner dot */}
            <motion.circle
              cx={x} cy={LINE_Y} r={5}
              fill={col.hex}
              filter="url(#dot-glow)"
              initial={{ scale: 0 }}
              animate={visible ? { scale: 1 } : {}}
              transition={{ type:"spring", stiffness:240, damping:12, delay: i*0.09+0.31 }}
              style={{ transformOrigin: `${x}px ${LINE_Y}px` }}
            />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Schedule() {
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const headerVis = useInView(headerRef, { once: true, margin: "-80px" });
  const trackVis  = useInView(trackRef,  { once: true, margin: "-60px" });

  return (
    <section
      id="schedule"
      className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass bg-transparent"
    >
      {/* Background glows — site palette only */}
      <div className="absolute top-[5%]  left-[-8%]  w-[45vw] h-[45vw] rounded-full bg-accent-violet/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-8%] w-[45vw] h-[45vw] rounded-full bg-accent-cyan/5   blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Section Header (matches site typography style) ── */}
        <div ref={headerRef} className="flex flex-col mb-20 max-w-2xl lg:mx-auto lg:text-center">
          <motion.span
            initial={{ opacity:0, y:10 }}
            animate={headerVis ? {opacity:1, y:0} : {}}
            transition={{ duration:0.55 }}
            className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase mb-3"
          >
            04 // The Program
          </motion.span>
          <motion.h2
            initial={{ opacity:0, y:20 }}
            animate={headerVis ? {opacity:1, y:0} : {}}
            transition={{ duration:0.55, delay:0.1 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            Event Schedule
          </motion.h2>
          <motion.p
            initial={{ opacity:0, y:20 }}
            animate={headerVis ? {opacity:1, y:0} : {}}
            transition={{ duration:0.55, delay:0.2 }}
            className="text-base text-zinc-400 leading-relaxed font-normal"
          >
            Complete day-of agenda for{" "}
            <span className="text-white font-semibold">Sep 5, 2026</span> at PESIAMS, Shivamogga.
          </motion.p>
        </div>

        {/* ── Track ── */}
        <div ref={trackRef}>

          {/* Day badge — matches Timeline section pill style */}
          <motion.div
            initial={{ opacity:0, x:-16 }}
            animate={trackVis ? {opacity:1, x:0} : {}}
            transition={{ duration:0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 text-[10px] font-black uppercase tracking-widest text-accent-cyan"
            style={{
              background: "rgba(6,182,212,0.08)",
              border: "1px solid rgba(6,182,212,0.3)",
              boxShadow: "0 0 14px rgba(6,182,212,0.12)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Sep 5, 2026 &mdash; Hackathon Day
          </motion.div>

          {/* Scroll wrapper */}
          <div
            className="overflow-x-auto pb-4"
            style={{ scrollbarWidth:"none", WebkitOverflowScrolling:"touch" } as React.CSSProperties}
          >
            {/* Canvas */}
            <div
              style={{
                position: "relative",
                width: TOTAL_W,
                height: TOTAL_H,
                minWidth: TOTAL_W,
              }}
            >
              <TrackSVG visible={trackVis} />
              {EVENTS.map((evt, i) => (
                <Node key={i} evt={evt} i={i} visible={trackVis} />
              ))}
            </div>
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity:0, y:12 }}
            animate={trackVis ? {opacity:1, y:0} : {}}
            transition={{ duration:0.45, delay:0.8 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-violet shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
              <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
                Opening / Break / Judging
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
              <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
                Hacking / Ceremony
              </span>
            </div>
          </motion.div>

          {/* Mobile scroll hint */}
          <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-700 lg:hidden">
            ← Scroll horizontally to see full schedule →
          </p>
        </div>
      </div>
    </section>
  );
}
