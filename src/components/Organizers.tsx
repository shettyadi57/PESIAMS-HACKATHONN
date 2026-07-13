"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Member {
  name: string;
  role: string;
  dept?: string;
  linkedin?: string;
  photo?: string; // Image asset path
}

const principalMember: Member = {
  name: "Dr. Girish Kumar K",
  role: "Patron / Principal",
  dept: "PESIAMS, Shivamogga",
  photo: "", // Path to photo (e.g. "/images/principal.jpg")
  linkedin: "https://linkedin.com",
};

const hodMember: Member = {
  name: "Mrs. Roopa D S",
  role: "Organizing Chair / HOD",
  dept: "Dept. of Computer Applications (BCA)",
  photo: "", // Path to photo
  linkedin: "https://linkedin.com",
};

const facultyLeaders: Member[] = [
  {
    name: "Mr. Sharath S P",
    role: "Faculty Coordinator",
    dept: "Dept. of Computer Applications (BCA)",
    photo: "",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Mrs. Ashwini G",
    role: "Faculty Coordinator",
    dept: "Dept. of Computer Applications (BCA)",
    photo: "",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Mr. Raghavendra R",
    role: "Faculty Coordinator",
    dept: "Dept. of Computer Applications (BCA)",
    photo: "",
    linkedin: "https://linkedin.com",
  },
];

const studentLeaders: Member[] = [
  {
    name: "Adithya S Shetty",
    role: "Student Coordinator Head",
    dept: "Dept. of Computer Applications (BCA)",
    photo: "",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Abhishek P",
    role: "Student Coordinator",
    dept: "Dept. of Computer Applications (BCA)",
    photo: "",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Bhoomika G S",
    role: "Student Coordinator",
    dept: "Dept. of Computer Applications (BCA)",
    photo: "",
    linkedin: "https://linkedin.com",
  },
];

function MemberCard({ member, delay }: { member: Member; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-2xl bg-[#0a0a0f] border border-white/5 hover:border-accent-cyan/35 shadow-2xl flex flex-col transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* 3D-like hover aura gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Photo / Vertical Image Slot (aspect 3:4) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950 flex items-center justify-center border-b border-white/5">
        {member.photo && !imageError ? (
          <img
            src={member.photo}
            alt={member.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* High-end Holographic Initials Placeholder */
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)] flex items-center justify-center">
            {/* Moving background line grids */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:10px_10px]" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent-violet/20 via-accent-cyan/15 to-transparent border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:border-accent-cyan/30 transition-all duration-350">
              <span className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                {getInitials(member.name)}
              </span>
            </div>
          </div>
        )}

        {/* Small floating LinkedIn link */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 border border-white/10 hover:border-accent-cyan/50 text-zinc-400 hover:text-white backdrop-blur-md transition-all duration-300 pointer-events-auto clickable"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        )}
      </div>

      {/* Details (Centered bold name & role) */}
      <div className="p-5 flex flex-col items-center justify-center text-center">
        <h3 className="font-display font-black text-base text-white group-hover:text-accent-cyan transition-colors mb-1">
          {member.name}
        </h3>
        <p className="text-[10px] text-zinc-450 font-black uppercase tracking-wider mb-0.5">
          {member.role}
        </p>
        {member.dept && (
          <p className="text-[8px] text-zinc-500 font-bold tracking-widest uppercase">
            {member.dept}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Organizers() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="organizers" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass bg-background">
      {/* Background glow radial */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-accent-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header (PEC Hacks style) */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase mb-3 block"
            >
              06 // The Leadership
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl md:text-6xl tracking-tight text-white mb-2 uppercase leading-none"
            >
              Guiding The Vision.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:max-w-sm"
          >
            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              The leadership committee behind UTKARSH 1.0 — steering innovation, software logic development, and academic excellence.
            </p>
          </motion.div>
        </div>

        {/* 1. Academic Patrons (Principal & HOD - Centered grid) */}
        <div className="mb-20">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-8 border-b border-white/5 pb-2">
            Academic patrons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <MemberCard member={principalMember} delay={0.05} />
            <MemberCard member={hodMember} delay={0.12} />
          </div>
        </div>

        {/* 2. Faculty Coordinators (3 cards grid) */}
        <div className="mb-20">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-8 border-b border-white/5 pb-2">
            Faculty coordinators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {facultyLeaders.map((member, idx) => (
              <MemberCard key={member.name} member={member} delay={0.15 + idx * 0.08} />
            ))}
          </div>
        </div>

        {/* 3. Student Coordinators (3 cards grid) */}
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-8 border-b border-white/5 pb-2">
            Student coordinators committee
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {studentLeaders.map((member, idx) => (
              <MemberCard key={member.name} member={member} delay={0.25 + idx * 0.08} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
