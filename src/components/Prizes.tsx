"use"
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Medal, Award, FileCheck, Gift, Users } from "lucide-react";

interface MainPrize {
  place: string;
  amount: string;
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  borderGlow: string;
  glowClass: string;
  bullets: string[];
}

const mainPrizes: MainPrize[] = [
  {
    place: "2nd",
    amount: "₹5,000",
    title: "First Runner-Up",
    icon: Medal,
    color: "from-zinc-400/10 via-zinc-500/5 to-zinc-600/2 border-zinc-400/20 hover:border-zinc-300/60",
    borderGlow: "rgba(161, 161, 170, 0.2)",
    glowClass: "hover:shadow-[0_0_40px_rgba(212,212,216,0.15)]",
    bullets: ["Cash prize of ₹5,000", "BCA Department Merit Certificate", "Runner-Up Silver Medal", "Exclusive PESIAMS Swag Kit"],
  },
  {
    place: "1st",
    amount: "₹10,000",
    title: "Utkarsh Grand Champion",
    icon: Trophy,
    color: "from-amber-400/10 via-yellow-500/5 to-amber-600/2 border-amber-400/25 hover:border-amber-400/60",
    borderGlow: "rgba(245, 158, 11, 0.3)",
    glowClass: "hover:shadow-[0_0_45px_rgba(245,158,11,0.25)]",
    bullets: ["Grand cash prize of ₹10,000", "BCA Champion Golden Trophy", "Winner Gold Medal", "PESIAMS Incubation Pass"],
  },
  {
    place: "3rd",
    amount: "₹2,000",
    title: "Second Runner-Up",
    icon: Award,
    color: "from-orange-800/10 via-orange-900/5 to-orange-950/2 border-orange-800/20 hover:border-orange-600/60",
    borderGlow: "rgba(194, 65, 12, 0.15)",
    glowClass: "hover:shadow-[0_0_35px_rgba(249,115,22,0.12)]",
    bullets: ["Cash prize of ₹2,000", "BCA Department Merit Certificate", "Runner-Up Bronze Medal", "Swag goodies bags"],
  },
];

const subPrizes = [
  {
    icon: FileCheck,
    title: "Participation Certificate",
    desc: "Every builder who successfully submits a working repository receives a verified digital certificate for their resume.",
  },
  {
    icon: Gift,
    title: "Winner Trophy",
    desc: "A premium engraved physical trophy will be awarded to the Champion team to commemorate their victory.",
  },
  {
    icon: Users,
    title: "Networking & Recognition",
    desc: "Gain opportunities to pitch your work, obtain career referrals, and connect with faculty, mentors, and industrial juries.",
  },
];

function PrizeCard({ prize, index }: { prize: MainPrize; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const isFirst = prize.place === "1st";
  const PrizeIcon = prize.icon;

  // Custom inline style for rotating shiny line animation (sweeps every 4.5 seconds)
  const shineAnimation = {
    initial: { left: "-100%" },
    animate: { left: ["-100%", "200%"] },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 90,
        damping: 15,
      }}
      className={`flex flex-col group relative ${
        isFirst ? "lg:order-2 lg:-translate-y-5" : prize.place === "2nd" ? "lg:order-1" : "lg:order-3"
      }`}
    >
      {/* Border tracing vector effect */}
      <div
        onMouseMove={handleMouseMove}
        className={`w-full rounded-[24px] glass-panel border ${prize.color} ${prize.glowClass} p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:-translate-y-1`}
      >
        {/* Shiny Glossy Glare Sweep (Periodic shine effect) */}
        <motion.div
          variants={shineAnimation}
          initial="initial"
          animate="animate"
          transition={{
            repeat: Infinity,
            repeatDelay: 3.5,
            duration: 1.4,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
          className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] pointer-events-none"
        />

        {/* Top Place & Trophy Emblems */}
        <div className="flex items-center justify-between mb-8">
          <span
            className={`px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
              prize.place === "1st"
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                : prize.place === "2nd"
                ? "bg-zinc-400/10 text-zinc-300 border border-zinc-400/20"
                : "bg-orange-600/10 text-orange-400 border border-orange-500/20"
            }`}
          >
            {prize.place} Place
          </span>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
            <PrizeIcon
              className={`${
                prize.place === "1st"
                  ? "text-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                  : prize.place === "2nd"
                  ? "text-zinc-300"
                  : "text-orange-400"
              } transition-transform group-hover:scale-110`}
              size={20}
            />
          </div>
        </div>

        {/* Prize Money Heading */}
        <div className="mb-6">
          <h4 className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1.5">
            {prize.title}
          </h4>
          <span className="font-display font-black text-4xl md:text-5xl text-white tracking-tighter block">
            {prize.amount}
          </span>
        </div>

        <div className="h-[1px] w-full bg-white/5 mb-6" />

        {/* Award Details Bullets */}
        <ul className="space-y-3.5 text-xs text-zinc-400 font-normal">
          {prize.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2.5">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  prize.place === "1st"
                    ? "bg-amber-400 shadow-[0_0_4px_#fbbf24]"
                    : prize.place === "2nd"
                    ? "bg-zinc-400"
                    : "bg-orange-500"
                }`}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Prizes() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="prizes" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass bg-transparent">
      {/* Background soft highlights */}
      <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-accent-violet/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col mb-20 max-w-xl lg:mx-auto lg:text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[9px] font-display font-black tracking-[0.25em] text-zinc-500 uppercase mb-3 block"
          >
            PRIZES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-6"
          >
            Prize Pool
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-zinc-400 leading-relaxed font-semibold uppercase tracking-wider text-accent-cyan"
          >
            Compete. Create. Conquer.
          </motion.p>
        </div>

        {/* 🥇 🥈 🥉 Main Podium Prizes Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end max-w-5xl mx-auto mb-20">
          {mainPrizes.map((prize, idx) => (
            <PrizeCard key={prize.place} prize={prize} index={idx} />
          ))}
        </div>

        {/* 📋 Sub-Prizes Secondary Cards */}
        <div className="max-w-5xl mx-auto border-t border-white/5 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subPrizes.map((sub, idx) => {
              const SubIcon = sub.icon;
              return (
                <motion.div
                  key={sub.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-[20px] bg-[#030305] border border-white/5 hover:border-white/10 p-6 flex flex-col justify-between hover:bg-card-dark-hover transition-all duration-300"
                >
                  <div className="mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent-cyan/30 flex items-center justify-center text-zinc-400 group-hover:text-accent-cyan transition-all mb-4">
                      <SubIcon size={18} />
                    </div>
                    <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-accent-cyan transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                      {sub.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
