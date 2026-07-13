"use"
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MessageSquare, ArrowRight } from "lucide-react";

interface ContactCard {
  role: string;
  name: string;
  phone: string;
  email: string;
}

const contacts: ContactCard[] = [
  {
    role: "Faculty Coordinator Support",
    name: "Mr. Sharath S P",
    phone: "+91 94814 17793",
    email: "sharathsp@pes.edu",
  },
  {
    role: "Student Coordinator Head",
    name: "Adithya S Shetty",
    phone: "+91 91108 55430",
    email: "adithyasshetty@pes.edu",
  },
];

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass">
      {/* Background glow radial */}
      <div className="absolute top-[20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-accent-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column (Metadata) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase mb-3"
            >
              07 // Support desk
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-6"
            >
              Get In Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-zinc-400 leading-relaxed mb-8 font-normal"
            >
              Have specific questions regarding inter-college team quotas, travel approvals, or sponsor packages? Connect with our team directly.
            </motion.p>

            {/* General Inquiry */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-4 items-center p-5 rounded-2xl glass-panel bg-white/5 border border-border-glass max-w-sm"
            >
              <div className="p-2.5 rounded-xl bg-accent-violet/10 border border-accent-violet/25 text-accent-violet shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-0.5">
                  General inquiries
                </span>
                <a
                  href="mailto:bca.pesiams@pes.edu"
                  className="font-display font-bold text-sm text-white hover:text-accent-cyan transition-colors clickable"
                >
                  bca.pesiams@pes.edu
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Hotlines Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {contacts.map((contact, idx) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.15 }}
                className="group relative overflow-hidden rounded-2xl glass-panel p-8 flex flex-col justify-between hover:bg-card-dark-hover transition-all duration-300"
              >
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-accent-cyan font-black block mb-2">
                    {contact.role}
                  </span>
                  <h3 className="font-display font-black text-xl text-white group-hover:text-accent-cyan transition-colors">
                    {contact.name}
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Phone Connection */}
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 text-xs font-semibold text-zinc-300 hover:text-white transition-colors group/link clickable"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-border-glass flex items-center justify-center text-zinc-400 group-hover/link:text-accent-cyan group-hover/link:border-accent-cyan/35 transition-all">
                      <Phone size={14} />
                    </div>
                    <span>{contact.phone}</span>
                    <ArrowRight size={12} className="ml-auto opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  </a>

                  {/* Email Connection */}
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-xs font-semibold text-zinc-300 hover:text-white transition-colors group/link clickable"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-border-glass flex items-center justify-center text-zinc-400 group-hover/link:text-accent-cyan group-hover/link:border-accent-cyan/35 transition-all">
                      <Mail size={14} />
                    </div>
                    <span>{contact.email}</span>
                    <ArrowRight size={12} className="ml-auto opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
