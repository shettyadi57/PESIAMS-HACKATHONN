"use"
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InterestModal({ isOpen, onClose }: InterestModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [track, setTrack] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !college) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Fire confetti for reward loop
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8b5cf6", "#06b6d4", "#ffffff"],
    });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCollege("");
    setTrack("");
    setIsSuccess(false);
  };

  const handleClose = () => {
    onClose();
    // Reset form after exit transition
    setTimeout(resetForm, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg glass-panel p-8 md:p-10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)] z-10"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-accent-violet/10 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-1 rounded-lg border border-border-glass hover:bg-white/5 clickable"
            >
              <X size={18} />
            </button>

            {!isSuccess ? (
              <>
                <div className="mb-6">
                  <h3 className="font-display font-black text-2xl tracking-tight text-white mb-2">
                    Ignite Your Innovation
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Register interest for UTKARSH 1.0. Get early invitations, eligibility updates, and track materials.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adithya Shetty"
                      className="w-full bg-white/5 border border-border-glass rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@college.edu"
                      className="w-full bg-white/5 border border-border-glass rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      College / Institution
                    </label>
                    <input
                      type="text"
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="PES Institute of Advanced Management Studies"
                      className="w-full bg-white/5 border border-border-glass rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      Preferred Hackathon Domain
                    </label>
                    <select
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className="w-full bg-card-dark border border-border-glass rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                    >
                      <option value="">Select a Domain (Optional)</option>
                      <option value="ai">Artificial Intelligence</option>
                      <option value="ml">Machine Learning</option>
                      <option value="security">Cyber Security</option>
                      <option value="healthcare">Healthcare Tech</option>
                      <option value="agriculture">AgriTech</option>
                      <option value="fintech">FinTech</option>
                      <option value="iot">IoT & Robotics</option>
                      <option value="cloud">Cloud Computing</option>
                      <option value="open">Open Innovation</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 relative group overflow-hidden rounded-xl bg-gradient-to-r from-accent-violet to-accent-cyan p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all clickable"
                  >
                    <span className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-background group-hover:bg-transparent text-sm font-bold text-white transition-colors">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Securing your spot...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Submit Interest
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-accent-cyan/15 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>
                </div>
                <h3 className="font-display font-black text-2xl text-white mb-2">
                  You&apos;re On the List!
                </h3>
                <p className="text-sm text-zinc-400 max-w-xs mx-auto mb-8">
                  Thank you for registering interest, {name}. We will contact you at {email} with eligibility details and the registration portal.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-xl bg-white/5 border border-border-glass hover:bg-white/10 hover:border-white/20 text-sm font-semibold text-white transition-all clickable"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
