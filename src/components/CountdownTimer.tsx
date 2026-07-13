"use"
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const targetDate = React.useMemo(() => new Date("2026-09-05T09:00:00+05:30"), []);
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference <= 0) {
        setIsLive(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeCard = ({ value, label }: { value: number; label: string }) => {
    const formatted = String(value).padStart(2, "0");

    return (
      <div className="flex flex-col items-center">
        {/* Minimalist Translucent Border Card */}
        <div className="w-16 h-18 sm:w-20 sm:h-22 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative overflow-hidden backdrop-blur-md">
          {/* Subtle gradient highlights */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />

          {/* Sliding motion for numbers */}
          <div className="h-10 sm:h-12 overflow-hidden relative flex items-center justify-center w-full">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={formatted}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-white select-none absolute"
              >
                {formatted}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Minimalist Subtag */}
        <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mt-2.5">
          {label}
        </span>
      </div>
    );
  };

  if (isLive) {
    return (
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/15">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="font-display font-black text-xs tracking-widest uppercase text-white">
          HACKATHON IS NOW LIVE
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="flex items-center gap-2.5 md:gap-3.5"
    >
      <TimeCard value={timeLeft.days} label="Days" />
      <span className="text-xl text-zinc-700 font-display font-black -mt-4 animate-pulse">:</span>
      <TimeCard value={timeLeft.hours} label="Hours" />
      <span className="text-xl text-zinc-700 font-display font-black -mt-4 animate-pulse">:</span>
      <TimeCard value={timeLeft.minutes} label="Minutes" />
      <span className="text-xl text-zinc-700 font-display font-black -mt-4 animate-pulse">:</span>
      <TimeCard value={timeLeft.seconds} label="Seconds" />
    </motion.div>
  );
}
