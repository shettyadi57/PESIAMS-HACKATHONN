"use"
"use client";

import React, { useEffect, useRef } from "react";
import { useInView, animate, motion } from "framer-motion";

interface StatItemProps {
  label: string;
  value: number;
  suffix: string;
  delay: number;
}

function StatItem({ label, value, suffix, delay }: StatItemProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(0, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate(val) {
        if (ref.current) {
          const formatted = Math.floor(val).toLocaleString("en-IN");
          ref.current.textContent = formatted + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, suffix]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center justify-center p-6 text-center border-r border-slate-200 last:border-r-0 md:flex-1"
    >
      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
        {label}
      </span>
      <span className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight">
        <span ref={ref}>0</span>
      </span>
    </motion.div>
  );
}

export default function StatsStrip() {
  const stats = [
    { label: "Target Registrations", value: 70, suffix: "+" },
    { label: "Colleges Invited", value: 20, suffix: "+" },
    { label: "Prize Pool", value: 17000, suffix: " ₹" },
    { label: "Innovation Domains", value: 10, suffix: "" },
    { label: "Expert Mentors", value: 10, suffix: "+" },
  ];

  return (
    <section className="relative z-20 border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 divide-slate-200 justify-center">
          {stats.map((stat, idx) => (
            <StatItem
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix === "₹" ? " ₹" : stat.suffix}
              delay={idx * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
