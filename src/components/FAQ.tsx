"use"
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqData: FAQItem[] = [
  {
    q: "What is UTKARSH 1.0?",
    a: "UTKARSH 1.0 is the debut edition of the state-level hackathon organized by the Department of Computer Applications (BCA) at PESIAMS, Shivamogga. It is a physical hackathon focused on solving real-world challenges across various emerging technology tracks.",
  },
  {
    q: "Who is eligible to participate?",
    a: "All undergraduate and postgraduate students enrolled in any recognized institution or university studying Engineering, B.Sc, BCA, MCA, or related disciplines can apply.",
  },
  {
    q: "Is there any registration fee?",
    a: "No. Registration and participation in UTKARSH 1.0 are completely free of charge. This includes food, accommodation, and access to campus amenities.",
  },
  {
    q: "What is the team size limit?",
    a: "Teams must consist of 2 to 4 members. Individual entries are not permitted to ensure collaborative project execution.",
  },
  {
    q: "Are inter-college teams allowed?",
    a: "Yes. You can form teams with members representing different colleges, provided all members carry valid college ID cards.",
  },
  {
    q: "I am a beginner. Can I participate?",
    a: "Absolutely! Hackathons are the best place to learn. We will have dedicated mentoring checkpoints where technical faculty and industry experts will guide you through repository setups and debugging.",
  },
  {
    q: "Is the hackathon online or offline?",
    a: "It is 100% offline. All team members must report physically to the PESIAMS campus in Shivamogga, Karnataka, for the entire duration of the hackathon.",
  },
  {
    q: "Will food and overnight accommodation be provided?",
    a: "Yes. Full meals (breakfast, lunch, dinner), mid-session coffee/tea, and snacks are provided. We have secured separate overnight rest areas on campus for male and female participants.",
  },
  {
    q: "Will Wi-Fi be available at the venue?",
    a: "Yes. High-speed campus Wi-Fi access credentials will be provided to all registered participants at check-in. However, we advise carrying mobile hotspots as backup adapters.",
  },
  {
    q: "What should I bring to the venue?",
    a: "You must bring your laptops, chargers, power strips, extension cords, toiletries, comfortable clothes, and your physical college ID cards.",
  },
  {
    q: "How does the mentoring checkpoint process work?",
    a: "We have structured auditing rounds. Mentors will walk around coding tables to check your project directories, review database structures, and help solve critical development bugs.",
  },
  {
    q: "What are the abstract submission rules?",
    a: "After registering, you must upload a presentation deck (up to 5 slides) outlining the problem statement, proposed solution model, tech stack, and wireframes. Vetted abstracts will receive invitation passes.",
  },
  {
    q: "What are the key judging criteria?",
    a: "Projects are evaluated on technical execution, innovation, user experience, and practical feasibility/commercial viability. Demos must be live; screenshots or pre-recorded videos will score lower.",
  },
  {
    q: "Can we use pre-existing code?",
    a: "You may use open-source APIs, UI packages, and boilerplate systems, but the core functionality of your project must be coded entirely during the hackathon coding window. Git commits will be reviewed.",
  },
  {
    q: "What is the code of conduct?",
    a: "We maintain a collaborative and professional space. Plagiarism, harassment, or disruption of campus peace will result in immediate disqualification and reporting to host institutions.",
  },
];

function AccordionItem({ item, isOpen, onToggle, idx }: { item: FAQItem; isOpen: boolean; onToggle: () => void; idx: number }) {
  return (
    <div className="border-b border-border-glass last:border-0 py-4">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between text-left py-3 focus:outline-none group clickable"
      >
        <span className="font-display font-bold text-base text-zinc-300 group-hover:text-white transition-colors">
          {item.q}
        </span>
        <div className="w-6 h-6 rounded-lg border border-border-glass group-hover:border-accent-cyan/35 flex items-center justify-center text-zinc-400 group-hover:text-white shrink-0 ml-4 transition-all">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pr-10 text-sm text-zinc-400 leading-relaxed font-normal">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative z-20 py-24 md:py-32 overflow-hidden border-t border-border-glass">
      {/* Background glow radial */}
      <div className="absolute top-[20%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-accent-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header left-column */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-display font-black tracking-widest text-accent-cyan uppercase mb-3"
            >
              06 // Help Desk
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-zinc-400 leading-relaxed font-normal"
            >
              Have questions about eligibility, accommodation, or coding rules? We have outlined fifteen detailed responses to help you prepare.
            </motion.p>
          </div>

          {/* FAQ right-column accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 rounded-2xl glass-panel p-6 md:p-8"
          >
            <div className="divide-y divide-border-glass">
              {faqData.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  item={item}
                  isOpen={openIndex === idx}
                  onToggle={() => handleToggle(idx)}
                  idx={idx}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
