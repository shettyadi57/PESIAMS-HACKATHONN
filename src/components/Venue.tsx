"use"
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
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
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
            {/* Map Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3869.8398466187515!2d75.52932331189422!3d13.968273792070381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbbefc7873919e1%3A0xc34ba2f30ea13b4d!2sPES%20Institute%20of%20Advanced%20Management%20Studies!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.95) contrast(1.1) opacity(0.85)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PESIAMS Campus Map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
