"use"
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PesiamsLogo, UtkarshLogo } from "./BrandLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { number: "01", label: "About", id: "about" },
    { number: "02", label: "Domains", id: "domains" },
    { number: "03", label: "Timeline", id: "timeline" },
    { number: "04", label: "Prizes", id: "prizes" },
    { number: "05", label: "Venue", id: "venue" },
    { number: "06", label: "FAQ", id: "faq" },
    { number: "07", label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Active Section Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ["hero", ...navItems.map((item) => item.id)];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo & PESIAMS BCA Branding */}
          <div className="flex items-center gap-3 clickable" onClick={() => scrollToSection("hero")}>
            <PesiamsLogo className="text-white shrink-0" size={34} />
            <UtkarshLogo className="text-zinc-400 shrink-0" size={28} />
            <div>
              <span className="font-display font-black text-lg tracking-tight text-white block">
                UTKARSH <span className="text-zinc-500">1.0</span>
              </span>
              <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold block -mt-1">
                PESIAMS · BCA Dept
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-5 text-[13px] font-semibold tracking-wide">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-1 transition-all relative py-2 clickable ${
                      activeSection === item.id
                        ? "text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-[10px] text-zinc-500 font-bold mr-0.5">
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* Official Social Links (No Register Button) */}
            <div className="flex items-center gap-4.5">
              <a
                href="https://www.instagram.com/pesiams_official/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-white transition-colors clickable"
                title="PESIAMS Official Instagram"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://www.linkedin.com/school/pes-institute-of-advanced-management-studies/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-white transition-colors clickable"
                title="PESIAMS Shivamogga LinkedIn"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-zinc-400 transition-colors clickable"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-20 bg-black/95 backdrop-blur-xl border-b border-white/10 lg:hidden flex flex-col justify-between pb-10"
          >
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <nav className="flex flex-col gap-6">
                <ul className="flex flex-col gap-4.5 text-lg font-display font-semibold">
                  {navItems.map((item, idx) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-baseline gap-2.5 text-left w-full ${
                          activeSection === item.id
                            ? "text-white"
                            : "text-zinc-500"
                        }`}
                      >
                        <span className="text-xs text-zinc-600">{item.number}</span>
                        <span>{item.label}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="px-8 border-t border-white/10 pt-6 flex flex-col gap-5">
              <div className="flex items-center gap-5 justify-center">
                <a
                  href="https://www.instagram.com/pesiams_official/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a
                  href="https://www.linkedin.com/school/pes-institute-of-advanced-management-studies/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
