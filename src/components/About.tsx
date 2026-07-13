"use"
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Users, Lightbulb } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      num: "01",
      icon: Cpu,
      title: "Learn & Prototype",
      desc: "Build hands-on solutions with bleeding-edge tools. Experience rapid engineering, iterative design, and overnight development sprints.",
    },
    {
      num: "02",
      icon: Users,
      title: "Connect & Network",
      desc: "Work side-by-side with top-tier student engineers. Collaborate with industrial mentors, academic leaders, and corporate sponsors.",
    },
    {
      num: "03",
      icon: Lightbulb,
      title: "Innovate & Compete",
      desc: "Tackle real-world challenges across 10 specialized tracks. Showcase your creations to expert panels for top honors and cash rewards.",
    },
  ];

  return (
    <section id="about" className="relative z-20 py-24 md:py-32 theme-light border-y border-slate-200">
      {/* Decorative subtle visual watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.02] text-black font-display font-black text-[25vw] leading-none pointer-events-none select-none">
        PESIAMS
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          
          {/* Text Section */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-display font-black tracking-[0.2em] text-zinc-500 uppercase mb-3 block"
            >
              01 // The Platform
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-black text-4xl md:text-5xl tracking-tight text-slate-900 mb-6 leading-tight"
            >
              Unleash Your Software Vision
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 font-normal"
            >
              UTKARSH 1.0 is the premier State-Level college hackathon organized by the Department of Computer Applications (BCA) at PES Institute of Advanced Management Studies (PESIAMS), Shivamogga. We gather the state&apos;s brightest minds to hack, build, and deploy.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal"
            >
              Over an intense coding sprint, you will turn raw concepts into functional software prototypes. You will work alongside technical mentors, explore modern APIs, and present live working demos to an expert evaluation panel.
            </motion.p>
          </div>

          {/* Cards Section - Clean White Outlines */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-5">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start transition-all duration-300 hover:shadow-md"
                >
                  {/* Left Column (Icon & Index) */}
                  <div className="flex items-center justify-between w-full md:w-auto md:flex-col gap-4">
                    <span className="font-display font-black text-2xl text-slate-900 group-hover:text-zinc-500 transition-colors">
                      {card.num}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Right Column (Text Description) */}
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                      {card.desc}
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
