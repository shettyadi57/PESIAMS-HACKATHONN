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
        <div ref={containerRef} className="max-w-4xl mx-auto relative">
          
          {/* Header Tag */}
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase"
            >
              The Vision // Inaugural Statement
            </motion.span>
          </div>

          {/* Letter / Quote Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-3xl glass-panel p-8 md:p-12 border border-border-glass shadow-[0_0_50px_rgba(6,182,212,0.05)] overflow-hidden"
          >
            {/* Top quote icon */}
            <div className="absolute -top-6 -left-4 text-white/[0.02] pointer-events-none select-none">
              <Quote size={200} />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
              <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white mb-6">
                &ldquo;We don&apos;t have past recaps. We have a blank repository.&rdquo;
              </h2>
              
              <div className="space-y-6 text-sm md:text-base text-zinc-400 font-normal leading-relaxed">
                <p>
                  UTKARSH 1.0 is a clean sheet. This is the first-ever edition of our college hackathon, and we are not going to fake history. We are here to make it. By registering for this cohort, you aren&apos;t following in anyone&apos;s footsteps — you are stamping the first footprints.
                </p>
                <p>
                  Our goal is simple: to create Karnataka&apos;s most intensive and practical state-level coding arena. The structures we build this weekend, the projects that compile at dawn, and the connections forged across coffee mugs will define what UTKARSH becomes in 2.0, 3.0, and beyond.
                </p>
                <p className="font-semibold text-white">
                  You are the foundation. Welcome to the inaugural cohort.
                </p>
              </div>

              {/* Signature block */}
              <div className="mt-10 pt-8 border-t border-white/5 w-full flex flex-col items-center">
                <span className="font-display font-black text-white text-base">
                  Department of Computer Applications (BCA)
                </span>
                <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase mt-1">
                  PES Institute of Advanced Management Studies
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
