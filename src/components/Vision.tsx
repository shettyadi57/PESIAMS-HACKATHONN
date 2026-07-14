"use"
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

export default function Vision() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass">
      {/* Background glow radial */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-accent-cyan/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="relative">
          
          {/* Header Tag */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase"
            >
              The Vision // Inaugural Statement
            </motion.span>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 max-w-5xl mx-auto">
            {/* Left: HOD Brand Card (Organizing Chair) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full max-w-[290px] shrink-0 flex items-center justify-center lg:items-start"
            >
              <div
                className="group relative w-full aspect-[3/4] bg-gradient-to-br from-[#0c1020] to-[#07070d] border-[3px] border-[#ff9f00]/50 hover:border-[#ff9f00] rounded-tl-[32px] rounded-bl-[32px] rounded-br-[32px] rounded-tr-[88px] transition-all duration-500 hover:-translate-y-2 flex flex-col p-[3px] pb-12 overflow-visible shadow-2xl"
                style={{
                  boxShadow: "0 15px 45px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,159,0,0.05)",
                }}
              >
                {/* 3D-like hover aura gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ff9f00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-inherit pointer-events-none" />

                {/* Photo Wrapper */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-tl-[28px] rounded-bl-[28px] rounded-tr-[82px] rounded-br-[12px] bg-zinc-950/40">
                  <img
                    src="https://pestrust.edu.in/pesiams/documents/files/faculty/1739877880_ffb5ab574de93e8a7982.png"
                    alt="Mrs. Roopa D S"
                    className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.08] saturate-[0.92] transition-transform duration-700 scale-[1.62] origin-[center_38%] group-hover:scale-[1.68]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-transparent to-transparent opacity-60 pointer-events-none" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,36,0)_95%,rgba(255,159,0,0.08)_95%)] bg-[size:100%_4px] opacity-40 pointer-events-none" />
                </div>

                {/* Custom absolute name plate popping out over the bottom */}
                <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-[88%] bg-gradient-to-r from-[#032d60] to-[#044085] border border-[#ff9f00]/45 group-hover:border-[#ff9f00] text-white text-center py-3.5 px-4 rounded-xl shadow-2xl transition-all duration-300 z-10">
                  <h3 className="font-display font-black text-[14px] text-white tracking-tight mb-0.5 leading-tight">
                    Mrs. Roopa D S
                  </h3>
                  <p className="text-[9px] text-[#ff9f00] font-black uppercase tracking-widest mb-0.5">
                    Organizing Chair / HOD
                  </p>
                  <p className="text-[7.5px] text-zinc-300 font-semibold tracking-wider uppercase opacity-90">
                    Dept. of Computer Applications (BCA)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Letter / Quote Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative flex-1 rounded-3xl glass-panel p-8 md:p-12 border border-border-glass shadow-[0_0_50px_rgba(6,182,212,0.05)] overflow-hidden flex flex-col justify-between"
            >
              {/* Top quote icon */}
              <div className="absolute -top-6 -left-4 text-white/[0.02] pointer-events-none select-none">
                <Quote size={200} />
              </div>

              <div className="relative z-10 flex flex-col justify-center h-full">
                <h2 className="font-display font-black text-xl md:text-2xl tracking-tight text-white mb-6 text-left leading-normal">
                  &ldquo;We don&apos;t have past recaps. We have a blank repository.&rdquo;
                </h2>
                
                <div className="space-y-6 text-sm md:text-base text-zinc-400 font-normal leading-relaxed text-left">
                  <p>
                    UTKARSH 1.0 is a clean sheet. This is the first-ever edition of our college hackathon, and we are not going to fake history. We are here to make it. By registering for this cohort, you aren&apos;t following in anyone&apos;s footprints — you are stamping the first footprints.
                  </p>
                  <p>
                    Our goal is simple: to create Karnataka&apos;s most intensive and practical state-level coding arena. The structures we build this weekend, the projects that compile at dawn, and the connections forged across coffee mugs will define what UTKARSH becomes in 2.0, 3.0, and beyond.
                  </p>
                  <p className="font-semibold text-white">
                    You are the foundation. Welcome to the inaugural cohort.
                  </p>
                </div>

                {/* Signature block */}
                <div className="mt-8 pt-6 border-t border-white/5 w-full flex flex-col items-start">
                  <span className="font-display font-black text-white text-sm">
                    Department of Computer Applications (BCA)
                  </span>
                  <span className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase mt-0.5">
                    PES Institute of Advanced Management Studies, Shivamogga
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
