"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserCheck,
  Megaphone,
  Code2,
  Utensils,
  MessageCircle,
  Zap,
  GitCommit,
  Search,
  Trophy,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Evt {
  time: string;
  title: string;
  desc: string;
  accent: "violet" | "cyan";
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
}

const EVENTS: Evt[] = [
  {
    time: "09:00 AM",
    title: "Registration & Check-in",
    desc: "Verify team IDs, collect badges, and get assigned to your coding station.",
    accent: "violet",
    icon: UserCheck,
  },
  {
    time: "09:30 AM",
    title: "Inauguration Ceremony",
    desc: "Official welcome by faculty, introduction of jury and mentors.",
    accent: "cyan",
    icon: Megaphone,
  },
  {
    time: "10:00 AM",
    title: "Problem Statements Revealed — Hacking Begins",
    desc: "Problem domains unlocked on the portal. Sprint clock starts NOW.",
    accent: "cyan",
    icon: Code2,
  },
  {
    time: "01:00 PM",
    title: "Working Lunch",
    desc: "Lunch served at stations — keep the momentum going.",
    accent: "violet",
    icon: Utensils,
  },
  {
    time: "02:00 PM",
    title: "Mentoring Session",
    desc: "One-on-one guidance from industry experts and faculty mentors.",
    accent: "violet",
    icon: MessageCircle,
  },
  {
    time: "03:00 PM",
    title: "Surprise Challenge Revealed",
    desc: "A hidden constraint or feature twist is introduced — adapt fast.",
    accent: "cyan",
    icon: Zap,
  },
  {
    time: "04:00 PM",
    title: "Final Submissions Deadline",
    desc: "Code committed, README submitted, demo video uploaded.",
    accent: "cyan",
    icon: GitCommit,
  },
  {
    time: "04:30 PM",
    title: "Project Judging",
    desc: "Live demonstrations to the expert evaluation panel.",
    accent: "violet",
    icon: Search,
  },
  {
    time: "05:00 PM",
    title: "Award Ceremony & Valediction",
    desc: "Prize distribution, certificates, and closing remarks.",
    accent: "cyan",
    icon: Trophy,
  },
];

// ─── Accent colour values ─────────────────────────────────────────────────────
const C = {
  violet: {
    hex:    "#8b5cf6",
    glow:   "rgba(139,92,246,0.4)",
    bg:     "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.3)",
    text:   "#a78bfa",
    ring:   "rgba(139,92,246,0.15)",
  },
  cyan: {
    hex:    "#06b6d4",
    glow:   "rgba(6,182,212,0.4)",
    bg:     "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.3)",
    text:   "#22d3ee",
    ring:   "rgba(6,182,212,0.15)",
  },
} as const;

// ─── Single Row ───────────────────────────────────────────────────────────────
function EventRow({ evt, index, isLast }: { evt: Evt; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const col = C[evt.accent];
  const Icon = evt.icon;

  return (
    <div ref={ref} className="relative flex gap-0">

      {/* ── LEFT COLUMN: dot + vertical line ── */}
      <div className="flex flex-col items-center" style={{ width: 48, flexShrink: 0 }}>
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: index * 0.08 }}
          className="relative z-10 mt-6"
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              width: 28,
              height: 28,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              background: col.ring,
              boxShadow: `0 0 14px ${col.glow}`,
            }}
          />
          {/* Inner dot */}
          <div
            className="relative w-3.5 h-3.5 rounded-full z-10"
            style={{
              background: col.hex,
              boxShadow: `0 0 8px ${col.glow}, 0 0 20px ${col.glow}`,
            }}
          />
        </motion.div>

        {/* Vertical connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
            className="flex-1 w-[1.5px] mt-2"
            style={{
              transformOrigin: "top",
              background: `linear-gradient(to bottom, ${col.hex}55, rgba(139,92,246,0.12) 60%, transparent)`,
              minHeight: 40,
            }}
          />
        )}
      </div>

      {/* ── RIGHT COLUMN: time + card ── */}
      <div className="flex-1 pb-10 pl-4">
        {/* Time badge */}
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="inline-block text-[10px] font-black uppercase tracking-widest mb-2 mt-5"
          style={{ color: col.text }}
        >
          {evt.time}
        </motion.span>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.08 + 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="group glass-panel rounded-2xl p-5 flex items-start gap-4 hover:border-white/10 transition-all duration-300"
          style={{
            borderLeft: `2px solid ${col.border}`,
            boxShadow: `0 0 24px rgba(0,0,0,0.4), 0 0 6px ${col.glow}22`,
          }}
        >
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center mt-0.5"
            style={{
              background: col.bg,
              border: `1px solid ${col.border}`,
            }}
          >
            <Icon size={17} style={{ color: col.text }} />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3
              className="font-display font-bold text-[15px] text-white leading-snug mb-1.5 group-hover:text-opacity-90 transition-colors"
              style={{ letterSpacing: "-0.01em" }}
            >
              {evt.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-normal group-hover:text-zinc-400 transition-colors">
              {evt.desc}
            </p>
          </div>

          {/* Index number */}
          <span
            className="text-[11px] font-black shrink-0 mt-0.5"
            style={{ color: col.hex, opacity: 0.5 }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Schedule() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVis = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="schedule"
      className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass bg-transparent"
    >
      {/* Background aurora glows */}
      <div className="absolute top-[10%] left-[-8%] w-[40vw] h-[40vw] rounded-full bg-accent-violet/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-8%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/5 blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 md:px-12">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headerVis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase mb-3 block"
          >
            04 // The Program
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerVis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            Event Schedule
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerVis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-zinc-400 leading-relaxed font-normal"
          >
            Full day-of agenda for{" "}
            <span className="text-white font-semibold">Sep 5, 2026</span>{" "}
            at PESIAMS, Shivamogga — from check-in through the awards ceremony.
          </motion.p>

          {/* Day badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headerVis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mt-6 text-[10px] font-black uppercase tracking-widest text-accent-cyan"
            style={{
              background: "rgba(6,182,212,0.07)",
              border: "1px solid rgba(6,182,212,0.25)",
              boxShadow: "0 0 12px rgba(6,182,212,0.1)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Sep 5, 2026 — Hackathon Day
          </motion.div>
        </div>

        {/* ── Vertical Timeline ── */}
        <div className="relative">
          {EVENTS.map((evt, i) => (
            <EventRow
              key={evt.title}
              evt={evt}
              index={i}
              isLast={i === EVENTS.length - 1}
            />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headerVis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.5 }}
          className="flex items-center gap-6 mt-2"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-violet shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
              Ceremony / Break
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
              Hacking / Technical
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
