"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Coffee, Play, ShieldAlert, Award, FileCode, Cpu, Sparkles } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  type: "general" | "hacking" | "food" | "review" | "ceremony";
}

const singleDaySchedule: ScheduleItem[] = [
  {
    time: "09:00 AM - 09:45 AM",
    title: "Registration and Participant Reporting",
    desc: "Verification of team IDs, allocation of coding stations, and distribution of hackathon badges and kits.",
    icon: Coffee,
    type: "general",
  },
  {
    time: "10:00 AM - 10:30 AM",
    title: "Inauguration Ceremony",
    desc: "Official welcome address, introduction of jury members, and explanation of evaluation parameters.",
    icon: Play,
    type: "ceremony",
  },
  {
    time: "10:30 AM",
    title: "Problem Statements Revealed & Hackathon Begins",
    desc: "Problem statements are officially unlocked on the portal, and the coding sprint clock starts.",
    icon: FileCode,
    type: "hacking",
  },
  {
    time: "10:30 AM - 01:30 PM",
    title: "Development Session",
    desc: "Initial architecture planning, database schemas formulation, and repository setup.",
    icon: Cpu,
    type: "hacking",
  },
  {
    time: "01:30 PM - 02:00 PM",
    title: "Working Lunch",
    desc: "A quick lunch served directly at the stations to keep coding momentum uninterrupted.",
    icon: Coffee,
    type: "food",
  },
  {
    time: "02:00 PM - 03:00 PM",
    title: "Development Continues",
    desc: "Refining core functionalities, integrating front-end interfaces, and testing APIs.",
    icon: Cpu,
    type: "hacking",
  },
  {
    time: "03:00 PM",
    title: "Hidden Challenge / Twist Revealed",
    desc: "A surprise technical constraint or feature requirement is introduced to test flexibility and adaptability.",
    icon: Sparkles,
    type: "review",
  },
  {
    time: "03:00 PM - 04:30 PM",
    title: "Final Development and Adaptation",
    desc: "Integrating the surprise twist, debugging, and polishing the final user interface.",
    icon: Cpu,
    type: "hacking",
  },
  {
    time: "04:30 PM",
    title: "Hard Submission Deadline",
    desc: "Final code repositories must be committed, and product descriptions submitted on the portal.",
    icon: ShieldAlert,
    type: "review",
  },
  {
    time: "04:30 PM - 05:30 PM",
    title: "Final Evaluation & Closing Activities",
    desc: "Jury evaluations via live project demonstrations, followed by the closing remarks and prize distribution.",
    icon: Award,
    type: "ceremony",
  },
];

export default function Schedule() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const getTypeStyle = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "hacking":
        return "border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)]";
      case "review":
        return "border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]";
      case "food":
        return "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
      case "ceremony":
        return "border-accent-violet bg-accent-violet/10 text-accent-violet shadow-[0_0_15px_rgba(139,92,246,0.15)]";
      default:
        return "border-zinc-700 bg-zinc-850/40 text-zinc-300";
    }
  };

  return (
    <section id="schedule" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass bg-background">
      {/* Background glow */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent-violet/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={containerRef} className="flex flex-col mb-16 max-w-2xl lg:mx-auto lg:text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase mb-3"
          >
            Agenda // The Program
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-6"
          >
            Event Day Schedule
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-zinc-400 leading-relaxed font-normal"
          >
            Plan your sprint. Follow our scheduled checkpoints, problem statement unlocking, surprise challenges, and jury presentation sessions.
          </motion.p>
        </div>

        {/* Schedule list */}
        <div className="max-w-4xl mx-auto space-y-5">
          {singleDaySchedule.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl glass-panel p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-card-dark-hover transition-all duration-300 border border-white/5 hover:border-white/10"
              >
                {/* Time Frame Column */}
                <div className="flex items-center gap-3 md:w-52 shrink-0">
                  <Clock size={15} className="text-zinc-500 group-hover:text-accent-cyan transition-colors" />
                  <span className="font-display font-black text-sm text-white tracking-wider">
                    {item.time}
                  </span>
                </div>

                {/* Decorative Divider */}
                <div className="hidden md:block w-[1px] h-10 bg-border-glass group-hover:bg-accent-cyan/20 transition-colors" />

                {/* Icon and Description Grid */}
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${getTypeStyle(item.type)}`}>
                    <ItemIcon size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-accent-cyan transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-450 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
