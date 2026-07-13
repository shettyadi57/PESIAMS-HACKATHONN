"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Navigation, Car, ShieldCheck } from "lucide-react";

export default function Venue() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const venueHighlights = [
    {
      icon: MapPin,
      title: "Main Innovation Foyer",
      desc: "An air-conditioned coding floor fully outfitted with charging hubs, collaborative desks, and high-speed network nodes.",
    },
    {
      icon: Car,
      title: "Campus Parking",
      desc: "Ample, secured free parking is available inside the PESIAMS campus grounds for all registered hacker teams.",
    },
    {
      icon: ShieldCheck,
      title: "Separate Lodging Hubs",
      desc: "Monitored overnight resting zones and washing facilities arranged separately for male and female builders.",
    },
  ];

  return (
    <section id="venue" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass">
      {/* Background glow radial */}
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── College Photo Banner ─────────────────────────────── */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 relative rounded-3xl overflow-hidden border border-border-glass"
          style={{ height: "260px" }}
        >
          {/* Try to load actual college photo — drop college_photo.jpg in /public to activate */}
          <img
            src="/college_photo.jpg"
            alt="PESIAMS Campus — Shivamogga"
            className="w-full h-full object-cover object-center"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />

          {/* Fallback styled placeholder (shows if no photo file) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.06) 100%)",
            }}
          >
            {/* Campus silhouette lines */}
            <svg viewBox="0 0 800 200" className="w-full h-32 opacity-10" preserveAspectRatio="xMidYMid meet">
              <rect x="60"  y="80"  width="80"  height="120" fill="none" stroke="white" strokeWidth="1.5"/>
              <rect x="160" y="50"  width="120" height="150" fill="none" stroke="white" strokeWidth="1.5"/>
              <rect x="300" y="30"  width="200" height="170" fill="none" stroke="white" strokeWidth="2"/>
              <rect x="520" y="60"  width="100" height="140" fill="none" stroke="white" strokeWidth="1.5"/>
              <rect x="640" y="90"  width="80"  height="110" fill="none" stroke="white" strokeWidth="1.5"/>
              <line x1="0" y1="200" x2="800" y2="200" stroke="white" strokeWidth="1" opacity="0.4"/>
              <polygon points="395,0 340,30 450,30" fill="none" stroke="white" strokeWidth="1.5"/>
            </svg>
            <div className="text-center mt-2">
              <p className="text-zinc-300 font-display font-black text-xl tracking-widest">PESIAMS CAMPUS</p>
              <p className="text-zinc-500 text-xs tracking-widest mt-1 uppercase">NH 206, Sagar Road, Shivamogga — 577204</p>
              <p className="text-zinc-700 text-[10px] tracking-wider mt-3 uppercase">
                📁 Drop <code className="text-accent-cyan">college_photo.jpg</code> in <code className="text-accent-violet">/public</code> to show real campus photo
              </p>
            </div>
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40 pointer-events-none" />

          {/* PESIAMS badge overlay */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              PES Institute of Advanced Management Studies
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          
          {/* Left Column (Information & Transit) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase mb-3"
            >
              05 // The Destination
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-6"
            >
              The Venue
            </motion.h2>
            
            {/* Address Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 p-5 rounded-2xl glass-panel bg-white/5 flex gap-4 items-start"
            >
              <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan shrink-0">
                <Navigation size={18} />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white mb-1">
                  PES Institute of Advanced Management Studies
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  NH 206, Sagar Road, Shivamogga, <br />
                  Karnataka, India — 577204.
                </p>
              </div>
            </motion.div>

            {/* Highlights List */}
            <div className="space-y-6">
              {venueHighlights.map((highlight, idx) => {
                const HighlightIcon = highlight.icon;
                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="p-2.5 rounded-xl border border-border-glass bg-zinc-800/30 text-zinc-300 shrink-0">
                      <HighlightIcon size={16} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white mb-1">
                        {highlight.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {highlight.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column (Embedded Map) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 h-[350px] md:h-[450px] relative rounded-3xl overflow-hidden border border-border-glass shadow-[0_0_40px_rgba(6,182,212,0.05)] bg-card-dark"
          >
            {/* Map Iframe — exact Place ID from Google Maps link */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.3242!2d75.5071402!3d13.9631746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba5eb38753875%3A0x239d4f69a53edc48!2sP.E.S.%20Institute%20of%20Technology%20and%20Management!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, opacity: 0.92 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PESIAMS Campus Map — Shivamogga"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
