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
  name: "Dr. Sudarshan G M",
  role: "Patron / Principal",
  dept: "PESIAMS, Shivamogga",
  photo: "", // Path to photo (e.g. "/images/principal.jpg")
  linkedin: "https://linkedin.com",
};

const hodMember: Member = {
  name: "Mrs. Roopa D S",
  role: "Organizing Chair / HOD",
  dept: "Dept. of Computer Applications (BCA)",
  photo: "https://pestrust.edu.in/pesiams/documents/files/faculty/1739877880_ffb5ab574de93e8a7982.png",
  linkedin: "https://linkedin.com",
};

const facultyLeaders: Member[] = [
  {
    name: "Mr. Sachidananda M H",
    role: "Faculty Coordinator",
    dept: "Dept. of Computer Applications (BCA)",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT3HQVRlmN_Tn-Ga9xIq_v5YB307e0MNY7gK2Pu0t-Qg&s=10",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Ms. Asma Noorain",
    role: "Faculty Coordinator",
    dept: "Dept. of Computer Applications (BCA)",
    photo: "https://pestrust.edu.in/pesiams/documents/files/faculty/1742292393_5e5983d1bf03f1510270.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Mr. Bhanu Prakash P C",
    role: "Faculty Coordinator",
    dept: "Dept. of Computer Applications (BCA)",
    photo: "https://pestrust.edu.in/pesiams/documents/files/facultydetails/1766817566_65d3fcd2b56106b71f96.jpg",
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      className="group relative w-full bg-gradient-to-br from-[#0c1020] to-[#07070d] border-[3px] border-[#ff9f00]/50 hover:border-[#ff9f00] rounded-tl-[32px] rounded-bl-[32px] rounded-br-[32px] rounded-tr-[88px] transition-all duration-500 hover:-translate-y-2 flex flex-col p-[3px] pb-12 overflow-visible shadow-2xl"
      style={{
        boxShadow: "0 15px 45px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,159,0,0.05)",
      }}
    >
      {/* 3D-like hover aura gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ff9f00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-inherit pointer-events-none" />

      {/* Photo Wrapper with robust aspect-[3/4] flow */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-tl-[28px] rounded-bl-[28px] rounded-tr-[82px] rounded-br-[12px] bg-zinc-950/40">
        {member.photo && !imageError ? (
          <div className="relative w-full h-full">
            <img
              src={member.photo}
              alt={member.name}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover filter brightness-[1.05] contrast-[1.08] saturate-[0.92] transition-transform duration-700 ${
                member.name.includes("Roopa") || member.name.includes("Sachidananda") || member.name.includes("Asma")
                  ? "scale-[1.62] origin-[center_38%] group-hover:scale-[1.68]"
                  : "group-hover:scale-[1.06]"
              }`}
            />
            {/* Hologram details */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,36,0)_95%,rgba(255,159,0,0.08)_95%)] bg-[size:100%_4px] opacity-40 pointer-events-none" />
          </div>
        ) : (
          /* High-end Holographic Initials Placeholder */
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,159,0,0.1),transparent_70%)] flex items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:8px_8px]" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff9f00]/25 via-accent-cyan/10 to-transparent border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,159,0,0.15)] group-hover:border-[#ff9f00]/40 transition-all duration-350">
              <span className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-450">
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
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 border border-white/10 hover:border-[#ff9f00] text-zinc-400 hover:text-white backdrop-blur-md transition-all duration-300 pointer-events-auto z-10 clickable"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        )}
      </div>

      {/* Custom absolute name plate popping out over the bottom */}
      <div 
        className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-[88%] bg-gradient-to-r from-[#032d60] to-[#044085] border border-[#ff9f00]/45 group-hover:border-[#ff9f00] text-white text-center py-3.5 px-4 rounded-xl shadow-2xl transition-all duration-300 z-10 group-hover:shadow-[0_0_20px_rgba(255,159,0,0.2)]"
        style={{
          backdropFilter: "blur(12px)",
        }}
      >
        <h3 className="font-display font-black text-[14px] text-white tracking-tight mb-0.5 leading-tight">
          {member.name}
        </h3>
        <p className="text-[9px] text-[#ff9f00] font-black uppercase tracking-widest mb-0.5">
          {member.role}
        </p>
        {member.dept && (
          <p className="text-[7.5px] text-zinc-300 font-semibold tracking-wider uppercase opacity-90">
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
    <section id="organizers" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass bg-transparent">
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
