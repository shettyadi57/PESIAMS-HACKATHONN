"use"
"use client";

import React from "react";
import { PesiamsLogo, UtkarshLogo } from "./BrandLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 border-t border-border-glass bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* Left Column (Branding & Legal) */}
        <div className="max-w-sm flex flex-col">
          <div className="flex items-center gap-3.5 mb-4">
            <PesiamsLogo className="text-white shrink-0" size={32} />
            <UtkarshLogo className="text-zinc-500 shrink-0" size={26} />
            <span className="font-display font-black text-lg tracking-tight text-white">
              UTKARSH <span className="text-zinc-500">1.0</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed font-normal mb-6">
            Organized by PES Institute of Advanced Management Studies, Shivamogga — Department of Bachelor of Computer Applications (BCA).
          </p>
          <span className="text-[10px] text-zinc-600 font-bold tracking-wider uppercase">
            &copy; {currentYear} UTKARSH 1.0. All rights reserved.
          </span>
        </div>

        {/* Middle Column (Site Navigation) */}
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-4">
            Quick Navigation
          </h4>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs font-semibold text-zinc-400">
            <li>
              <button onClick={() => handleScrollTo("hero")} className="hover:text-white transition-colors py-1 text-left clickable">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("about")} className="hover:text-white transition-colors py-1 text-left clickable">
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("domains")} className="hover:text-white transition-colors py-1 text-left clickable">
                Domains
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("timeline")} className="hover:text-white transition-colors py-1 text-left clickable">
                Timeline
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("prizes")} className="hover:text-white transition-colors py-1 text-left clickable">
                Prizes
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("venue")} className="hover:text-white transition-colors py-1 text-left clickable">
                Venue
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("faq")} className="hover:text-white transition-colors py-1 text-left clickable">
                FAQ
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("contact")} className="hover:text-white transition-colors py-1 text-left clickable">
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Right Column (Socials & Address) */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-3">
              Connect With Us
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/pesiams_official/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-border-glass hover:border-accent-cyan/35 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all clickable"
                title="PESIAMS Official Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://www.linkedin.com/school/pes-institute-of-advanced-management-studies/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-border-glass hover:border-accent-cyan/35 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all clickable"
                title="PESIAMS Shivamogga LinkedIn"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black block mb-1">
              Venue Destination
            </span>
            <span className="text-xs text-zinc-400 leading-relaxed font-normal">
              Sagar Road, Shivamogga, Karnataka 577204
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
