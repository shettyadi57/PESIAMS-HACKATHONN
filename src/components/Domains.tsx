"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Shield,
  HeartPulse,
  Sprout,
  Coins,
  Wifi,
  Bot,
  Cloud,
  Globe,
} from "lucide-react";

interface Track {
  num: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  hook: string;
  desc: string;
}

const tracks: Track[] = [
  {
    num: "01",
    icon: Brain,
    title: "Artificial Intelligence",
    hook: "Cognitive agent loops",
    desc: "Build local agent loops, advanced neural logic pipelines, large language models integrations, and autonomous workflow engines.",
  },
  {
    num: "02",
    icon: TrendingUp,
    title: "Machine Learning",
    hook: "Predictive intelligence",
    desc: "Develop classification algorithms, deep predictive estimators, linear estimators, and customized data training flows.",
  },
  {
    num: "03",
    icon: Shield,
    title: "Cyber Security",
    hook: "Hardened infrastructure",
    desc: "Conduct vulnerability checks, map security telemetry, secure communication ports, and audit encryption protocols.",
  },
  {
    num: "04",
    icon: HeartPulse,
    title: "Healthcare Tech",
    hook: "Digital health assistance",
    desc: "Tackle clinical workflow issues, build patient record analyzers, diagnostic aids, and fitness telemetry dashboards.",
  },
  {
    num: "05",
    icon: Sprout,
    title: "AgriTech",
    hook: "Precision farming inputs",
    desc: "Build sensor arrays for crop monitoring, predictive yield models, automated irrigation planners, and soil health trackers.",
  },
  {
    num: "06",
    icon: Coins,
    title: "FinTech",
    hook: "Decentralized trust layers",
    desc: "Code secure ledger models, micro-payment routing APIs, fraud detection systems, and budget managers.",
  },
  {
    num: "07",
    icon: Wifi,
    title: "Internet of Things",
    hook: "Hardware edge telemetry",
    desc: "Deploy microcontroller modules, edge data filters, ambient telemetry triggers, and smart home modules.",
  },
  {
    num: "08",
    icon: Bot,
    title: "Robotics & Automation",
    hook: "Kinetic software triggers",
    desc: "Coordinate motor drives, design pathfinders, synchronize actuator loops, and process spatial feedback inputs.",
  },
  {
    num: "09",
    icon: Cloud,
    title: "Cloud Computing",
    hook: "Elastic scaling nodes",
    desc: "Deploy serverless functions, manage node routing tables, build microservices, and design highly available databases.",
  },
  {
    num: "10",
    icon: Globe,
    title: "Open Innovation",
    hook: "Unbounded digital creations",
    desc: "Solve custom local challenges, build original utilities, develop educational helpers, or pitch wildcard applications.",
  },
];

function TrackCard({ track, index }: { track: Track; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const Icon = track.icon;

  // Staggered sticky top offsets to make the card stack like a layered deck
  const stickyTop = 100 + index * 26;

  return (
    <div
      ref={cardRef}
      className="sticky w-full mb-12"
      style={{ top: `${stickyTop}px` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="group relative overflow-hidden rounded-3xl glass-panel p-8 md:p-10 border border-white/10 shadow-[0_-15px_40px_rgba(0,0,0,0.85)] flex flex-col md:flex-row md:items-center justify-between gap-8 bg-[#07070b] hover:border-accent-cyan/40 transition-all duration-300 min-h-[200px]"
      >
        {/* Glowing background highlight on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/5 via-transparent to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Index & Icon */}
        <div className="flex items-center gap-6 md:w-36 shrink-0">
          <span className="font-display font-black text-5xl md:text-6xl text-white/10 group-hover:text-accent-cyan transition-colors duration-300">
            {track.num}
          </span>
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-accent-cyan/30 transition-all duration-300">
            <Icon size={22} />
          </div>
        </div>

        {/* Title & Hook */}
        <div className="flex-1 md:max-w-xs">
          <h3 className="font-display font-black text-2xl text-white group-hover:text-accent-cyan transition-colors mb-1.5">
            {track.title}
          </h3>
          <span className="text-[10px] font-black uppercase tracking-wider text-accent-violet group-hover:text-white transition-colors duration-300">
            {track.hook}
          </span>
        </div>

        {/* Description */}
        <div className="flex-1 md:max-w-md">
          <p className="text-sm text-zinc-400 leading-relaxed font-normal group-hover:text-zinc-300 transition-colors duration-300">
            {track.desc}
          </p>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-accent-cyan/5 blur-xl pointer-events-none rounded-br-3xl" />
      </motion.div>
    </div>
  );
}

export default function Domains() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="domains" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass bg-background">
      {/* Background glow radial */}
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-accent-cyan/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={containerRef} className="flex flex-col mb-20 max-w-xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase mb-3"
          >
            02 // The Tracks
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-6"
          >
            Choose Your Battlefield
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-zinc-400 leading-relaxed font-normal"
          >
            Formulate your ideas and develop software solutions. Align your team with one of our ten innovation domains.
          </motion.p>
        </div>

        {/* Stacked Deck Deck Layout */}
        <div className="relative pb-16">
          {tracks.map((track, idx) => (
            <TrackCard key={track.num} track={track} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
