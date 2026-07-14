"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────────────────────── */
interface Evt { time: string; title: string; desc: string; accent: "violet" | "cyan"; }

/* ─── Event data ─────────────────────────────────────────────────────────────── */
const EVENTS: Evt[] = [
  { time: "09:00 AM", title: "Registration & Check-in",                     desc: "Verify team IDs, collect badges, and get assigned to your coding station.",    accent: "violet" },
  { time: "09:30 AM", title: "Inauguration Ceremony",                        desc: "Official welcome by faculty, introduction of jury and mentors.",                 accent: "cyan"   },
  { time: "10:00 AM", title: "Problem Statements Revealed",                  desc: "Problem domains unlocked on the portal. Sprint clock starts NOW.",               accent: "cyan"   },
  { time: "01:00 PM", title: "Working Lunch",                                desc: "Lunch served at stations — keep the momentum going.",                            accent: "violet" },
  { time: "02:00 PM", title: "Mentoring Session",                            desc: "One-on-one guidance from industry experts and faculty mentors.",                  accent: "violet" },
  { time: "03:00 PM", title: "Surprise Challenge Revealed",                  desc: "A hidden constraint or feature twist is introduced — adapt fast.",               accent: "cyan"   },
  { time: "04:00 PM", title: "Final Submissions Deadline",                   desc: "Code committed, README submitted, demo video uploaded.",                         accent: "cyan"   },
  { time: "04:30 PM", title: "Project Judging",                              desc: "Live demonstrations to the expert evaluation panel.",                            accent: "violet" },
  { time: "05:00 PM", title: "Award Ceremony & Valediction",                 desc: "Prize distribution, certificates, and closing remarks.",                         accent: "cyan"   },
];

const C = {
  violet: { hex: "#8b5cf6", glow: "rgba(139,92,246,0.6)", bg: "rgba(139,92,246,0.09)", border: "rgba(139,92,246,0.4)", text: "#c4b5fd", softGlow: "rgba(139,92,246,0.2)" },
  cyan:   { hex: "#06b6d4", glow: "rgba(6,182,212,0.6)",  bg: "rgba(6,182,212,0.09)",  border: "rgba(6,182,212,0.4)",  text: "#67e8f9", softGlow: "rgba(6,182,212,0.2)"  },
} as const;

/* ─── Dot indicator (own component so useTransform isn't inside a .map()) ─── */
function DotIndicator({ index, total, accent, scrollYProgress }: {
  index: number; total: number; accent: "violet" | "cyan"; scrollYProgress: any;
}) {
  const col    = C[accent];
  const center = (index + 0.5) / total;
  const hw     = 0.5 / total;
  const opacity = useTransform(scrollYProgress, [center - hw, center, center + hw], [0.18, 1, 0.18]);
  const scale   = useTransform(scrollYProgress, [center - hw, center, center + hw], [0.7, 1.4, 0.7]);
  return (
    <motion.div style={{ opacity, scale }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.hex, boxShadow: `0 0 8px ${col.glow}` }} />
    </motion.div>
  );
}

/* ─── Floating event card ────────────────────────────────────────────────────── */
function RaceCard({ evt, index, total, scrollYProgress }: {
  evt: Evt; index: number; total: number; scrollYProgress: any;
}) {
  const isLeft = index % 2 === 0;
  const col    = C[evt.accent];

  // Each card occupies a window that is 1/total of the scroll range
  // Leave the last 15% for the finish line
  const TRACK_END = 0.85;
  const center    = ((index + 0.5) / total) * TRACK_END;
  const hw        = (TRACK_END / total) * 0.55;

  const opacity = useTransform(scrollYProgress, [center - hw * 1.4, center - hw * 0.4, center, center + hw * 0.4, center + hw * 1.4], [0, 0.9, 1, 0.9, 0]);
  const y       = useTransform(scrollYProgress, [center - hw * 1.4, center, center + hw * 1.4], [70, 0, -70]);
  const scale   = useTransform(scrollYProgress, [center - hw * 1.4, center, center + hw * 1.4], [0.5, 1, 0.72]);
  const xPull   = 250;
  const x       = useTransform(scrollYProgress,
    [center - hw * 1.4, center, center + hw * 1.4],
    isLeft ? [-(xPull - 50), -xPull, -(xPull - 20)] : [xPull - 50, xPull, xPull - 20],
  );

  return (
    <motion.div style={{
      position: "absolute", left: "50%", top: "43%",
      width: 285, marginLeft: isLeft ? -285 : 0,
      opacity, y, x, scale, pointerEvents: "none",
    }}>
      {/* Connector line from card to road */}
      <div style={{
        position: "absolute", top: "50%",
        [isLeft ? "right" : "left"]: -2,
        width: 36, height: 1,
        background: `linear-gradient(${isLeft ? "to left" : "to right"}, transparent, ${col.hex}90)`,
        transform: "translateY(-50%)",
      }} />
      {/* Dot at road side */}
      <div style={{
        position: "absolute", top: "50%",
        [isLeft ? "right" : "left"]: -6,
        width: 6, height: 6, borderRadius: "50%",
        background: col.hex, boxShadow: `0 0 10px ${col.glow}`,
        transform: "translateY(-50%)",
      }} />

      {/* Card body */}
      <div style={{
        background: "linear-gradient(135deg, rgba(8,8,14,0.96) 0%, rgba(14,12,24,0.94) 100%)",
        border: `1px solid ${col.border}`,
        borderLeft:  isLeft  ? `3px solid ${col.hex}` : `1px solid ${col.border}`,
        borderRight: !isLeft ? `3px solid ${col.hex}` : `1px solid ${col.border}`,
        borderRadius: 16,
        padding: "16px 18px",
        backdropFilter: "blur(18px)",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 40px rgba(0,0,0,0.8), 0 0 30px ${col.softGlow}`,
      }}>
        {/* Time */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{
            fontFamily: "var(--font-display, 'Outfit', system-ui)",
            fontSize: 10, fontWeight: 900, letterSpacing: "0.22em",
            textTransform: "uppercase", color: col.text,
          }}>{evt.time}</span>
          <span style={{
            fontFamily: "var(--font-display, 'Outfit', system-ui)",
            fontSize: 9, fontWeight: 900, letterSpacing: "0.18em",
            textTransform: "uppercase", color: col.hex,
            background: col.bg, border: `1px solid ${col.border}`,
            padding: "2px 8px", borderRadius: 20, opacity: 0.9,
          }}>{String(index + 1).padStart(2, "0")}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display, 'Outfit', system-ui)",
          fontSize: 14, fontWeight: 900, color: "#ffffff",
          lineHeight: 1.25, letterSpacing: "-0.01em", margin: "0 0 7px",
        }}>{evt.title}</h3>

        {/* Desc */}
        <p style={{
          fontFamily: "var(--font-sans, system-ui)",
          fontSize: 11, color: "#71717a",
          lineHeight: 1.55, margin: 0,
        }}>{evt.desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── Checkered finish line ─────────────────────────────────────────────────── */
function FinishLine({ scrollYProgress }: { scrollYProgress: any }) {
  // Appears from scroll 0.82 → end
  const opacity  = useTransform(scrollYProgress, [0.78, 0.88, 1.0], [0, 1, 1]);
  const scale    = useTransform(scrollYProgress, [0.78, 0.88, 1.0], [0.2, 1, 1]);
  const y        = useTransform(scrollYProgress, [0.78, 0.88, 1.0], [80, 0, 0]);
  // Glow pulse driven by scroll at end
  const glowSize = useTransform(scrollYProgress, [0.88, 1.0], [20, 55]);

  return (
    <motion.div
      style={{
        position: "absolute", left: "50%", top: "38%",
        transform: "translateX(-50%)",
        opacity, scale, y,
        width: "clamp(360px, 44vw, 620px)",
        pointerEvents: "none",
        zIndex: 25,
      }}
    >
      {/* ── FINISH banner (checkered) ── */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        {/* Neon "FINISH" text */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <span style={{
            fontFamily: "var(--font-display, 'Outfit', system-ui)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 900,
            letterSpacing: "0.25em",
            color: "#ffffff",
            textTransform: "uppercase",
            textShadow: "0 0 20px #06b6d4, 0 0 40px #06b6d4, 0 0 80px rgba(6,182,212,0.5)",
          }}>FINISH</span>
        </div>

        {/* Checkered bar */}
        <div style={{
          width: "100%", height: 28,
          backgroundImage: "repeating-conic-gradient(#ffffff 0deg 90deg, #000000 90deg 180deg)",
          backgroundSize: "28px 28px",
          borderRadius: 4,
          border: "1.5px solid rgba(255,255,255,0.25)",
          boxShadow: "0 0 24px rgba(6,182,212,0.5), 0 0 8px rgba(139,92,246,0.5)",
        }} />

        {/* Thin glowing line below checker */}
        <div style={{
          width: "100%", height: 2, marginTop: 4,
          background: "linear-gradient(to right, transparent, #06b6d4, #8b5cf6, #06b6d4, transparent)",
          borderRadius: 2,
        }} />
      </div>

      {/* ── Final event card (Award Ceremony) ── */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.88, 0.95], [0, 1]) }}
      >
        <div style={{
          background: "linear-gradient(135deg, rgba(8,8,18,0.98) 0%, rgba(14,10,30,0.96) 100%)",
          border: "1px solid rgba(6,182,212,0.4)",
          borderTop: "3px solid #06b6d4",
          borderRadius: 18,
          padding: "20px 24px",
          backdropFilter: "blur(24px)",
          boxShadow: "0 0 60px rgba(6,182,212,0.15), 0 0 30px rgba(139,92,246,0.12), 0 20px 60px rgba(0,0,0,0.9), inset 0 0 30px rgba(6,182,212,0.04)",
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 36, marginBottom: 8, filter: "drop-shadow(0 0 12px rgba(251,191,36,0.8))",
          }}>🏆</div>
          <p style={{
            fontFamily: "var(--font-display, 'Outfit', system-ui)",
            fontSize: 11, fontWeight: 900, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#22d3ee", marginBottom: 6,
          }}>Sep 5, 2026 — 05:00 PM</p>
          <h3 style={{
            fontFamily: "var(--font-display, 'Outfit', system-ui)",
            fontSize: 20, fontWeight: 900, color: "#ffffff",
            lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: 8,
          }}>Award Ceremony & Valediction</h3>
          <p style={{
            fontFamily: "var(--font-sans, system-ui)",
            fontSize: 12, color: "#71717a", lineHeight: 1.5,
          }}>Prize distribution, certificates, and closing remarks at PESIAMS Shivamogga.</p>

          {/* Decorative strip */}
          <div style={{
            marginTop: 14, height: 2,
            background: "linear-gradient(to right, transparent, #8b5cf6, #06b6d4, #8b5cf6, transparent)",
            borderRadius: 2,
          }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Flag posts flanking the finish line ─────────────────────────────────────── */
function FlagPost({ side, scrollYProgress }: { side: "left" | "right"; scrollYProgress: any }) {
  const opacity = useTransform(scrollYProgress, [0.80, 0.90], [0, 1]);
  const y       = useTransform(scrollYProgress, [0.80, 0.90], [60, 0]);
  const color   = side === "left" ? "#06b6d4" : "#8b5cf6";

  return (
    <motion.div style={{
      position: "absolute",
      top: "25%",
      [side]: "calc(50% - clamp(200px, 24vw, 340px) - 18px)",
      opacity, y,
      pointerEvents: "none", zIndex: 24,
    }}>
      {/* Pole */}
      <div style={{
        width: 3, height: 140,
        background: `linear-gradient(to bottom, ${color}, transparent)`,
        margin: "0 auto",
        boxShadow: `0 0 12px ${color}88`,
      }} />
      {/* Flag */}
      <div style={{
        width: 52, height: 34,
        background: "repeating-conic-gradient(#fff 0deg 90deg, #000 90deg 180deg)",
        backgroundSize: "14px 14px",
        borderRadius: "0 4px 4px 0",
        boxShadow: `0 0 16px ${color}66`,
        border: `1.5px solid ${color}88`,
        marginLeft: 3,
        position: "absolute",
        top: 0,
        transform: "translateY(-100%)",
      }} />
    </motion.div>
  );
}

/* ─── Main scene (no SSR) ────────────────────────────────────────────────────── */
export default function RaceTrackScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 16 });

  const gridY  = useTransform(smooth, [0, 1], ["0%", "700%"]);
  const dashY  = useTransform(smooth, [0, 1], [0, 1400]);

  return (
    <div ref={containerRef} style={{ height: `${EVENTS.length * 120 + 80}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "#030305" }}>

        {/* ── Background ambience ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", top: "20%", left: "15%", width: "45vw", height: "25vw", borderRadius: "50%", background: "rgba(139,92,246,0.05)", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", top: "20%", right: "15%", width: "45vw", height: "25vw", borderRadius: "50%", background: "rgba(6,182,212,0.05)", filter: "blur(100px)" }} />
          {/* Star dots */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
            backgroundSize: "52px 52px", opacity: 0.12,
          }} />
        </div>

        {/* ── CSS Perspective Road ── */}
        <div style={{
          position: "absolute", inset: 0,
          perspective: "480px", perspectiveOrigin: "50% 40%",
        }}>
          {/* Road plane */}
          <div style={{
            position: "absolute",
            left: "50%", bottom: "-10vh",
            width: "clamp(280px, 34vw, 520px)",
            height: "220vh",
            transform: "translateX(-50%) rotateX(70deg)",
            transformOrigin: "50% bottom",
            background: "linear-gradient(to top, #090910 0%, #060608 60%, #040406 100%)",
            overflow: "hidden",
          }}>
            {/* Moving perspective grid */}
            <motion.div style={{
              position: "absolute", inset: 0,
              backgroundImage: `
                linear-gradient(to bottom, rgba(139,92,246,0.16) 1px, transparent 1px),
                linear-gradient(to right, rgba(6,182,212,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "36px 52px",
              backgroundPositionY: gridY,
            }} />

            {/* Center lane dashes */}
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 3, top: 0, bottom: 0, overflow: "hidden" }}>
              <motion.div style={{ y: dashY }}>
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} style={{ width: "100%", height: 46, background: "rgba(255,255,255,0.5)", borderRadius: 2, marginBottom: 36 }} />
                ))}
              </motion.div>
            </div>

            {/* 1/4 lane side markers */}
            {["25%", "75%"].map((pos) => (
              <div key={pos} style={{ position: "absolute", top: 0, bottom: 0, left: pos, width: 2, overflow: "hidden" }}>
                <motion.div style={{ y: dashY }}>
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} style={{ width: "100%", height: 28, background: "rgba(255,255,255,0.09)", borderRadius: 2, marginBottom: 50 }} />
                  ))}
                </motion.div>
              </div>
            ))}

            {/* Checkered finish strip ON the road (appears near far end) */}
            <motion.div style={{
              position: "absolute", left: 0, right: 0, top: "12%", height: 22,
              backgroundImage: "repeating-conic-gradient(#fff 0deg 90deg, #000 90deg 180deg)",
              backgroundSize: "22px 22px",
              opacity: useTransform(smooth, [0.75, 0.88], [0, 1]),
            }} />
          </div>

          {/* Neon LEFT rail */}
          <div style={{
            position: "absolute", bottom: 0,
            left: `calc(50% - clamp(140px, 17vw, 260px))`,
            width: 3, height: "60%",
            transformOrigin: "50% bottom",
            transform: "rotateX(70deg)",
            background: "linear-gradient(to top, #06b6d4 0%, #8b5cf6 60%, transparent 100%)",
            boxShadow: "0 0 20px rgba(6,182,212,0.8), 0 0 50px rgba(6,182,212,0.3)",
            borderRadius: 4,
          }} />

          {/* Neon RIGHT rail */}
          <div style={{
            position: "absolute", bottom: 0,
            right: `calc(50% - clamp(140px, 17vw, 260px))`,
            width: 3, height: "60%",
            transformOrigin: "50% bottom",
            transform: "rotateX(70deg)",
            background: "linear-gradient(to top, #8b5cf6 0%, #06b6d4 60%, transparent 100%)",
            boxShadow: "0 0 20px rgba(139,92,246,0.8), 0 0 50px rgba(139,92,246,0.3)",
            borderRadius: 4,
          }} />

          {/* Road surface glow */}
          <div style={{
            position: "absolute", bottom: 0, left: "50%",
            width: "clamp(280px, 34vw, 520px)",
            height: "30vh",
            transformOrigin: "50% bottom",
            transform: "translateX(-50%) rotateX(70deg)",
            background: "linear-gradient(to top, rgba(6,182,212,0.04), transparent)",
            pointerEvents: "none",
          }} />
        </div>

        {/* ── Vignettes ── */}
        <div style={{ position: "absolute", inset: "0 0 auto 0", height: "48%", background: "linear-gradient(to bottom, #030305 30%, rgba(3,3,5,0.7) 70%, transparent)", pointerEvents: "none", zIndex: 10 }} />
        <div style={{ position: "absolute", inset: "auto 0 0 0", height: "16%", background: "linear-gradient(to top, #030305, transparent)", pointerEvents: "none", zIndex: 10 }} />

        {/* ── Flag posts at finish ── */}
        <FlagPost side="left"  scrollYProgress={smooth} />
        <FlagPost side="right" scrollYProgress={smooth} />

        {/* ── Floating event cards ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
          {EVENTS.slice(0, -1).map((evt, i) => (
            <RaceCard key={evt.title} evt={evt} index={i} total={EVENTS.length} scrollYProgress={smooth} />
          ))}
        </div>

        {/* ── Finish line + Award card ── */}
        <FinishLine scrollYProgress={smooth} />

        {/* ── Right-side HUD progress strip ── */}
        <div style={{ position: "absolute", right: 22, top: "50%", transform: "translateY(-50%)", zIndex: 30, display: "flex", flexDirection: "column", gap: 7, alignItems: "center" }}>
          {EVENTS.map((evt, i) => (
            <DotIndicator key={evt.title} index={i} total={EVENTS.length} accent={evt.accent} scrollYProgress={smooth} />
          ))}
        </div>

        {/* ── Top date label ── */}
        <div style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "7px 18px", borderRadius: 100,
            background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.2)",
            fontFamily: "var(--font-display, 'Outfit', system-ui)",
            fontSize: 10, fontWeight: 900, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#22d3ee",
          }}>
            🏎️ &nbsp;Sep 5, 2026 — Hackathon Day
          </div>
        </div>

        {/* ── Bottom hint ── */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 22px", borderRadius: 100,
            background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#06b6d4", animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
            <span style={{
              fontFamily: "var(--font-display, 'Outfit', system-ui)",
              fontSize: 9, fontWeight: 900, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#52525b",
            }}>
              Scroll to drive · {EVENTS.length} milestones · Finish line ahead
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
