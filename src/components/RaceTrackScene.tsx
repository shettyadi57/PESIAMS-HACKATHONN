"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from "framer-motion";

/* --- Event Data --- */
interface Evt { time: string; title: string; desc: string; accent: "violet" | "cyan"; emoji: string; }

const EVENTS: Evt[] = [
  { time: "09:00 AM", title: "Registration & Check-in",            desc: "Verify team IDs, collect badges, and get assigned to your coding station.",    accent: "violet", emoji: "🎫" },
  { time: "09:30 AM", title: "Inauguration Ceremony",              desc: "Official welcome by faculty, introduction of jury and mentors.",                 accent: "cyan",   emoji: "🎙️" },
  { time: "10:00 AM", title: "Problem Statements Revealed",        desc: "Problem domains unlocked on the portal. Sprint clock starts NOW.",               accent: "cyan",   emoji: "💡" },
  { time: "01:00 PM", title: "Working Lunch",                      desc: "Lunch served at stations — keep the momentum going.",                            accent: "violet", emoji: "🍱" },
  { time: "02:00 PM", title: "Mentoring Session",                  desc: "One-on-one guidance from industry experts and faculty mentors.",                  accent: "violet", emoji: "🧠" },
  { time: "03:00 PM", title: "Surprise Challenge Revealed",        desc: "A hidden constraint or feature twist is introduced — adapt fast.",               accent: "cyan",   emoji: "⚡" },
  { time: "04:00 PM", title: "Final Submissions Deadline",         desc: "Code committed, README submitted, demo video uploaded.",                         accent: "cyan",   emoji: "🚀" },
  { time: "04:30 PM", title: "Project Judging",                    desc: "Live demonstrations to the expert evaluation panel.",                            accent: "violet", emoji: "🔍" },
  { time: "05:00 PM", title: "Award Ceremony & Valediction",       desc: "Prize distribution, certificates, and closing remarks.",                         accent: "cyan",   emoji: "🏆" },
];

const C = {
  violet: { hex: "#8b5cf6", glow: "rgba(139,92,246,0.9)", softGlow: "rgba(139,92,246,0.3)", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.5)", text: "#c4b5fd" },
  cyan:   { hex: "#06b6d4", glow: "rgba(6,182,212,0.9)",  softGlow: "rgba(6,182,212,0.3)",  bg: "rgba(6,182,212,0.08)",  border: "rgba(6,182,212,0.5)",  text: "#67e8f9"  },
} as const;

// Curve offset function for winding track
function getCurveOffset(t: number, p: number) {
  // t is depth: 0 at horizon, 1 at screen
  // Winding track based on scroll position + depth
  const trackPos = p * 7.5 + t * 3.2;
  // Multiply by t^1.15 so the horizon itself sways naturally instead of staying static
  return (Math.sin(trackPos) * 180 + Math.cos(trackPos * 0.52) * 70) * Math.pow(t, 1.15);
}

/* --- Canvas Road Renderer --- */
function RoadCanvas({ progress, speed, isMobileSize }: { progress: number; speed: number; isMobileSize: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const stateRef  = useRef({ progress, speed });

  useEffect(() => { stateRef.current = { progress, speed }; }, [progress, speed]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const { progress: p, speed: spd } = stateRef.current;

    ctx.clearRect(0, 0, W, H);

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.52);
    sky.addColorStop(0, "#01010a");
    sky.addColorStop(0.5, "#030214");
    sky.addColorStop(1, "#05041a");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.52);

    // Horizon glow
    const hglow = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, W * 0.7);
    hglow.addColorStop(0, `rgba(139,92,246,${0.18 + spd * 0.2})`);
    hglow.addColorStop(0.4, `rgba(6,182,212,${0.1 + spd * 0.15})`);
    hglow.addColorStop(1, "transparent");
    ctx.fillStyle = hglow;
    ctx.fillRect(0, 0, W, H * 0.65);

    // Horizon line
    const vx = W / 2;
    const vy = H * 0.42;

    const roadHalfBase = W * 0.46;
    const steps = isMobileSize ? 30 : 60;

    // --- Draw Road Plane with Curve ---
    const road = ctx.createLinearGradient(0, vy, 0, H);
    road.addColorStop(0, "#07070d");
    road.addColorStop(0.4, "#0c0a17");
    road.addColorStop(1, "#120f24");

    ctx.beginPath();
    // Left edge from bottom to top
    for (let i = steps; i >= 0; i--) {
      const t = i / steps;
      const y = vy + (H - vy) * t;
      const curve = getCurveOffset(t, p);
      // Non-linear power taper + min width to prevent sharp triangle wedge
      const halfW = roadHalfBase * Math.pow(t, 1.45) + 8;
      ctx.lineTo(vx + curve - halfW, y);
    }
    // Right edge from top to bottom
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = vy + (H - vy) * t;
      const curve = getCurveOffset(t, p);
      const halfW = roadHalfBase * Math.pow(t, 1.45) + 8;
      ctx.lineTo(vx + curve + halfW, y);
    }
    ctx.closePath();
    ctx.fillStyle = road;
    ctx.fill();

    // --- Neon Rails ---
    // Left Neon Rail
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = vy + (H - vy) * t;
      const curve = getCurveOffset(t, p);
      const halfW = roadHalfBase * Math.pow(t, 1.45) + 8;
      if (i === 0) ctx.moveTo(vx + curve - halfW, y);
      else ctx.lineTo(vx + curve - halfW, y);
    }
    ctx.lineWidth = 3 + spd * 2;
    ctx.strokeStyle = "rgba(6,182,212,0.9)";
    if (!isMobileSize) {
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 15 + spd * 25;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Right Neon Rail
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = vy + (H - vy) * t;
      const curve = getCurveOffset(t, p);
      const halfW = roadHalfBase * Math.pow(t, 1.45) + 8;
      if (i === 0) ctx.moveTo(vx + curve + halfW, y);
      else ctx.lineTo(vx + curve + halfW, y);
    }
    ctx.lineWidth = 3 + spd * 2;
    ctx.strokeStyle = "rgba(139,92,246,0.9)";
    if (!isMobileSize) {
      ctx.shadowColor = "#8b5cf6";
      ctx.shadowBlur = 15 + spd * 25;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // --- Perspective Grid Rows ---
    const GRID_ROWS = 22;
    for (let i = 0; i < GRID_ROWS; i++) {
      const t = Math.pow((i + (p * GRID_ROWS * 2.2 % 1)) / GRID_ROWS, 1.8);
      if (t > 1) continue;
      const y = vy + (H - vy) * t;
      const curve = getCurveOffset(t, p);
      const xSpan = roadHalfBase * Math.pow(t, 1.45) + 8;
      const alpha = Math.min(t * 1.5, 0.6);

      ctx.beginPath();
      ctx.moveTo(vx + curve - xSpan, y);
      ctx.lineTo(vx + curve + xSpan, y);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(139,92,246,${alpha * 0.22})`;
      ctx.stroke();
    }

    // --- Center Lane Dashes ---
    const DASH_COUNT = 18;
    for (let d = 0; d < DASH_COUNT; d++) {
      const rawT = (d + p * DASH_COUNT * 2.5 % 1) / DASH_COUNT;
      const t = Math.pow(rawT, 1.6);
      if (t > 0.98) continue;
      const y = vy + (H - vy) * t;
      const curve = getCurveOffset(t, p);
      const dashW = 2 + t * 4;
      const alpha = Math.min(t * 1.8, 0.85);

      ctx.beginPath();
      ctx.arc(vx + curve, y, dashW, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }

    // --- 3D Checkpoint Gates (Arches) ---
    const totalEvents = EVENTS.length;
    const TRACK_END = 0.92;
    EVENTS.forEach((evt, idx) => {
      const gatePos = ((idx + 0.5) / totalEvents) * TRACK_END;
      const dist = gatePos - p;
      // Render gate if it is ahead and within view
      if (dist > -0.05 && dist < 0.25) {
        // Map distance to depth t (0 to 1)
        const t = 1 - (dist / 0.25);
        const depth = Math.pow(t, 1.7); // perspective scaling
        if (depth > 0.02 && depth < 0.98) {
          const y = vy + (H - vy) * depth;
          const curve = getCurveOffset(depth, p);
          const rW = roadHalfBase * Math.pow(depth, 1.45) + 8;
          
          // Gate dimensions
          const gateW = rW * 1.15;
          const gateH = 140 * depth;
          const col = C[evt.accent];

          // Draw Glowing Gate Frame
          ctx.beginPath();
          ctx.moveTo(vx + curve - gateW, y);
          ctx.lineTo(vx + curve - gateW, y - gateH);
          ctx.lineTo(vx + curve + gateW, y - gateH);
          ctx.lineTo(vx + curve + gateW, y);
          
          ctx.lineWidth = 2.5 + depth * 5;
          ctx.strokeStyle = col.hex;
          if (!isMobileSize) {
            ctx.shadowColor = col.hex;
            ctx.shadowBlur = 10 + depth * 25;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Gate accent blocks on top corners
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(vx + curve - gateW - 2, y - gateH - 4, 6, 8);
          ctx.fillRect(vx + curve + gateW - 4, y - gateH - 4, 6, 8);

          // Render Gate Label Text
          if (depth > 0.15) {
            ctx.save();
            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${Math.max(8, 14 * depth)}px sans-serif`;
            ctx.textAlign = "center";
            ctx.fillText(`GATE ${String(idx + 1).padStart(2, "0")}`, vx + curve, y - gateH - 10);
            ctx.restore();
          }
        }
      }
    });

    // --- Speed lines (F1 feeling) ---
    if (spd > 0.08) {
      const lineCount = isMobileSize ? Math.floor(spd * 20) : Math.floor(spd * 80);
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = `rgba(200, 200, 255, ${0.12 * spd})`;
      
      for (let i = 0; i < lineCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const startR = 20 + Math.random() * 80;
        const len    = 40 + Math.random() * 140 * spd;
        const sx = vx + Math.cos(angle) * startR;
        const sy = vy * 0.9 + Math.sin(angle) * startR * 0.4;
        const ex = vx + Math.cos(angle) * (startR + len);
        const ey = vy * 0.9 + Math.sin(angle) * (startR + len) * 0.4;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
    }

    // Stars
    const STAR_COUNT = isMobileSize ? 30 : 85;
    for (let i = 0; i < STAR_COUNT; i++) {
      const sx2 = ((i * 7919 + 1234) % 10000) / 10000 * W;
      const sy2 = ((i * 6271 + 4567) % 10000) / 10000 * H * 0.44;
      const sR  = ((i * 3571) % 100) / 100;
      const twinkle = 0.3 + Math.sin(Date.now() / 1000 + i) * 0.3;
      ctx.beginPath();
      ctx.arc(sx2, sy2, sR * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${twinkle * (0.35 + sR * 0.5)})`;
      ctx.fill();
    }

    animRef.current = requestAnimationFrame(draw);
  }, [isMobileSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    animRef.current = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

/* --- Checkpoint Info Pop Card --- */
function Checkpoint({ evt, index, total, scrollYProgress, isMobileSize }: {
  evt: Evt; index: number; total: number; scrollYProgress: ReturnType<typeof useSpring>; isMobileSize: boolean;
}) {
  const col    = C[evt.accent];
  const isLeft = index % 2 === 0;

  const TRACK_END  = 0.92;
  const center     = ((index + 0.5) / total) * TRACK_END;
  const hw         = (TRACK_END / total) * 0.6;

  // Immersive 3D Pop transition
  const opacity = useTransform(scrollYProgress,
    [center - hw * 1.3, center - hw * 0.4, center, center + hw * 0.4, center + hw * 1.1],
    [0, 1, 1, 1, 0]
  );
  
  const y = useTransform(scrollYProgress,
    [center - hw * 1.3, center - hw * 0.4, center, center + hw * 0.4, center + hw * 1.1],
    [100, 10, 0, -10, -100]
  );

  const x = useTransform(scrollYProgress,
    [center - hw * 1.3, center - hw * 0.4, center, center + hw * 0.4, center + hw * 1.1],
    isMobileSize 
      ? [-135, -135, -135, -135, -135]
      : (isLeft ? [-360, -290, -280, -295, -370] : [360, 290, 280, 295, 370])
  );

  const scale = useTransform(scrollYProgress,
    [center - hw * 1.3, center - hw * 0.4, center, center + hw * 0.4],
    [0.7, 1.05, 1, 0.85]
  );

  // Rotation creates an offset banking perspective look
  const rotateY = useTransform(scrollYProgress,
    [center - hw * 1.3, center, center + hw * 1.1],
    isMobileSize ? [0, 0, 0] : (isLeft ? [22, 5, -12] : [-22, -5, 12])
  );

  return (
    <motion.div style={{
      position: "absolute",
      left: "50%",
      top: isMobileSize ? "20%" : "40%",
      opacity, y, x, scale, rotateY,
      pointerEvents: "none",
      transformStyle: "preserve-3d",
      zIndex: 25,
    }}>
      {/* 3D Glass Card Pop Layout */}
      <div style={{
        width: isMobileSize ? 270 : 300,
        background: "linear-gradient(135deg, rgba(8, 7, 16, 0.94) 0%, rgba(18, 14, 32, 0.92) 100%)",
        border: `1px solid ${col.border}`,
        borderLeft: isLeft && !isMobileSize ? `4px solid ${col.hex}` : `1px solid ${col.border}`,
        borderRight: !isLeft && !isMobileSize ? `4px solid ${col.hex}` : `1px solid ${col.border}`,
        borderTop: isMobileSize ? `3px solid ${col.hex}` : `1px solid ${col.border}`,
        borderRadius: 20,
        padding: "20px 22px",
        backdropFilter: isMobileSize ? "none" : "blur(28px)",
        boxShadow: `
          0 0 0 1px rgba(255,255,255,0.05) inset,
          0 15px 50px rgba(0,0,0,0.9),
          0 0 35px ${col.softGlow}
        `,
      }}>
        {/* Top bar with tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>{evt.emoji}</span>
            <span style={{
              fontFamily: "var(--font-display,'Outfit',system-ui)",
              fontSize: 10, fontWeight: 900, letterSpacing: "0.22em",
              textTransform: "uppercase", color: col.text,
            }}>{evt.time}</span>
          </div>
          <span style={{
            fontFamily: "var(--font-display,'Outfit',system-ui)",
            fontSize: 9, fontWeight: 900, letterSpacing: "0.15em",
            background: col.bg, border: `1px solid ${col.border}`,
            color: col.hex, padding: "3px 10px", borderRadius: 20,
          }}>
            STAGE {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display,'Outfit',system-ui)",
          fontSize: 16, fontWeight: 900, color: "#fff",
          lineHeight: 1.25, letterSpacing: "-0.015em", margin: "0 0 10px",
        }}>{evt.title}</h3>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-sans,system-ui)",
          fontSize: 12, color: "#a1a1aa", lineHeight: 1.6, margin: 0,
        }}>{evt.desc}</p>

        {/* Status indicator bar */}
        <div style={{
          marginTop: 15, height: 2, borderRadius: 2,
          background: `linear-gradient(to right, ${col.hex}, transparent)`,
        }} />
      </div>
    </motion.div>
  );
}

/* --- HUD Speedometer --- */
function Speedometer({ speed, progress, isMobileSize }: { speed: number; progress: number; isMobileSize: boolean }) {
  const kmh  = Math.round(progress * 280 + speed * 120);
  const gear = speed > 0.6 ? "6" : speed > 0.4 ? "5" : speed > 0.25 ? "4" : speed > 0.12 ? "3" : speed > 0.04 ? "2" : "1";

  return (
    <div style={{
      position: "absolute", bottom: isMobileSize ? 12 : 24, left: isMobileSize ? 12 : 24, zIndex: 40,
      display: "flex", alignItems: "flex-end", gap: isMobileSize ? 8 : 14, pointerEvents: "none",
      transform: isMobileSize ? "scale(0.8)" : "none",
      transformOrigin: "bottom left",
    }}>
      {/* RPM Tachometer */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--font-display,'Outfit',system-ui)",
          fontSize: 7, fontWeight: 900, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
        }}>RPM</span>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const active   = i / 16 < speed + 0.05;
            const isDanger = i >= 13;
            const barColor = isDanger ? "#ef4444" : i >= 10 ? "#f59e0b" : "#06b6d4";
            return (
              <div key={i} style={{
                width: 3.5, height: 8 + i * 1.5, borderRadius: 2,
                background: active ? barColor : "rgba(255,255,255,0.07)",
                boxShadow: active ? `0 0 6px ${barColor}` : "none",
                transition: "background 0.12s ease, box-shadow 0.12s ease",
              }} />
            );
          })}
        </div>
      </div>

      {/* Speed readout */}
      <div style={{
        background: "rgba(0,0,0,0.7)", border: "1px solid rgba(6,182,212,0.2)",
        borderRadius: 12, padding: "8px 14px", backdropFilter: "blur(16px)",
      }}>
        <div style={{
          fontFamily: "var(--font-display,'Outfit',system-ui)",
          fontSize: 28, fontWeight: 900, lineHeight: 1,
          color: speed > 0.5 ? "#f59e0b" : "#06b6d4",
          letterSpacing: "-0.03em",
          textShadow: `0 0 20px ${speed > 0.5 ? "rgba(245,158,11,0.8)" : "rgba(6,182,212,0.8)"}`,
          transition: "color 0.3s ease, text-shadow 0.3s ease",
        }}>{kmh}</div>
        <div style={{
          fontFamily: "var(--font-display,'Outfit',system-ui)",
          fontSize: 7, fontWeight: 900, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: 2,
        }}>KM/H</div>
      </div>

      {/* Gear */}
      <div style={{
        background: "rgba(0,0,0,0.7)",
        border: `1px solid ${speed > 0.5 ? "rgba(245,158,11,0.4)" : "rgba(139,92,246,0.25)"}`,
        borderRadius: 10, padding: "6px 12px", backdropFilter: "blur(16px)",
        transition: "border-color 0.3s ease",
      }}>
        <div style={{
          fontFamily: "var(--font-display,'Outfit',system-ui)",
          fontSize: 22, fontWeight: 900, lineHeight: 1,
          color: speed > 0.5 ? "#f59e0b" : "#8b5cf6",
          textShadow: `0 0 16px ${speed > 0.5 ? "rgba(245,158,11,0.9)" : "rgba(139,92,246,0.9)"}`,
          transition: "all 0.2s ease",
        }}>{gear}</div>
        <div style={{
          fontFamily: "var(--font-display,'Outfit',system-ui)",
          fontSize: 7, fontWeight: 900, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: 2,
        }}>GEAR</div>
      </div>
    </div>
  );
}

/* --- Minimap / Progress HUD --- */
function MinimapHUD({ progress, currentIndex, isMobileSize }: { progress: number; currentIndex: number; isMobileSize: boolean }) {
  return (
    <div style={{
      position: "absolute", top: isMobileSize ? 12 : 24, right: isMobileSize ? 12 : 24, zIndex: 40,
      pointerEvents: "none", display: "flex", flexDirection: "column",
      gap: isMobileSize ? 4 : 6, alignItems: "flex-end",
      transform: isMobileSize ? "scale(0.8)" : "none",
      transformOrigin: "top right",
    }}>
      <div style={{
        background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10, padding: "6px 14px", backdropFilter: "blur(16px)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{
          fontFamily: "var(--font-display,'Outfit',system-ui)",
          fontSize: 9, fontWeight: 900, letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.28)", textTransform: "uppercase",
        }}>GATE</span>
        <span style={{
          fontFamily: "var(--font-display,'Outfit',system-ui)",
          fontSize: 13, fontWeight: 900, color: "#06b6d4",
          letterSpacing: "-0.01em", textShadow: "0 0 12px rgba(6,182,212,0.8)",
        }}>{String(currentIndex + 1).padStart(2, "0")} / {String(EVENTS.length).padStart(2, "0")}</span>
      </div>
      <div style={{
        display: "flex", flexDirection: "column", gap: 5,
        alignItems: "center", padding: "8px 0",
      }}>
        {EVENTS.map((evt, i) => {
          const dotProgress = (i + 0.5) / EVENTS.length;
          const isPassed    = progress > dotProgress;
          const isActive    = Math.abs(progress - dotProgress) < 0.5 / EVENTS.length + 0.04;
          const col         = C[evt.accent];
          return (
            <div key={i} style={{
              width: isActive ? 10 : 6, height: isActive ? 10 : 6,
              borderRadius: "50%",
              background: isPassed || isActive ? col.hex : "rgba(255,255,255,0.1)",
              boxShadow: isActive ? `0 0 10px ${col.glow}, 0 0 20px ${col.softGlow}` : "none",
              transition: "all 0.35s ease",
            }} />
          );
        })}
      </div>
    </div>
  );
}

/* --- Finish Overlay --- */
function FinishOverlay({ scrollYProgress, isMobileSize }: { scrollYProgress: ReturnType<typeof useSpring>; isMobileSize: boolean }) {
  const opacity = useTransform(scrollYProgress, [0.84, 0.94, 1], [0, 1, 1]);
  const scale   = useTransform(scrollYProgress, [0.84, 0.94], [0.3, 1]);
  const y       = useTransform(scrollYProgress, [0.84, 0.94], [60, 0]);
  const awardOp = useTransform(scrollYProgress, [0.92, 1], [0, 1]);

  return (
    <motion.div style={{
      position: "absolute", left: "50%", top: "36%",
      transform: "translateX(-50%)",
      opacity, scale, y, zIndex: 30, pointerEvents: "none",
      width: isMobileSize ? "90%" : "clamp(340px, 46vw, 640px)",
    }}>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{
          fontFamily: "var(--font-display,'Outfit',system-ui)",
          fontSize: "clamp(30px, 4vw, 56px)", fontWeight: 900, letterSpacing: "0.3em",
          color: "#ffffff", display: "block",
          textShadow: "0 0 24px #06b6d4, 0 0 60px #06b6d4, 0 0 100px rgba(6,182,212,0.5)",
        }}>FINISH</span>
      </div>
      <div style={{
        width: "100%", height: 28,
        backgroundImage: "repeating-conic-gradient(#ffffff 0deg 90deg, #000000 90deg 180deg)",
        backgroundSize: "28px 28px", borderRadius: 4,
        boxShadow: "0 0 30px rgba(6,182,212,0.6), 0 0 10px rgba(139,92,246,0.5)",
      }} />
      <div style={{
        height: 2, marginTop: 5,
        background: "linear-gradient(to right, transparent, #06b6d4, #8b5cf6, #06b6d4, transparent)",
        borderRadius: 2,
      }} />
      <motion.div style={{ opacity: awardOp, marginTop: 20 }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(6,6,16,0.98) 0%, rgba(14,10,30,0.96) 100%)",
          border: "1px solid rgba(6,182,212,0.4)", borderTop: "3px solid #06b6d4",
          borderRadius: 20, padding: isMobileSize ? "18px 20px" : "22px 28px", 
          backdropFilter: isMobileSize ? "none" : "blur(28px)",
          boxShadow: "0 0 80px rgba(6,182,212,0.12), 0 24px 80px rgba(0,0,0,0.9)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 10, filter: "drop-shadow(0 0 16px rgba(251,191,36,0.9))" }}>🏆</div>
          <p style={{
            fontFamily: "var(--font-display,'Outfit',system-ui)",
            fontSize: 10, fontWeight: 900, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#22d3ee", marginBottom: 6,
          }}>Sep 5, 2026 · 05:00 PM</p>
          <h3 style={{
            fontFamily: "var(--font-display,'Outfit',system-ui)",
            fontSize: 22, fontWeight: 900, color: "#fff",
            lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: 8,
          }}>Award Ceremony & Valediction</h3>
          <p style={{
            fontFamily: "var(--font-sans,system-ui)",
            fontSize: 12, color: "#71717a", lineHeight: 1.55,
          }}>Prize distribution, certificates, and closing remarks at PESIAMS Shivamogga.</p>
          <div style={{
            marginTop: 16, height: 2,
            background: "linear-gradient(to right, transparent, #8b5cf6, #06b6d4, #8b5cf6, transparent)",
            borderRadius: 2,
          }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --- Speed / Vignette Overlay --- */
function SpeedOverlay({ speed, isMobileSize }: { speed: number; isMobileSize: boolean }) {
  const blur   = isMobileSize ? 0 : Math.min(speed * 10, 7);
  const vigInt = Math.min(speed * 0.9, 0.7);
  return (
    <>
      <div style={{
        position: "absolute", inset: 0, zIndex: 35,
        background: `radial-gradient(ellipse 70% 100% at 50% 50%, transparent 40%, rgba(0,0,0,${vigInt}) 100%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: "0 0 auto 0", height: "45%",
        background: "linear-gradient(to bottom, rgba(0,0,2,0.85) 0%, transparent)",
        zIndex: 10, pointerEvents: "none",
      }} />
      {blur > 1 && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 36,
          backdropFilter: `blur(${blur}px)`,
          maskImage: "radial-gradient(ellipse 40% 60% at 50% 50%, transparent 40%, black 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 40% 60% at 50% 50%, transparent 40%, black 100%)",
          pointerEvents: "none",
        }} />
      )}
    </>
  );
}

/* --- Camera Shake --- */
function CameraShake({ speed }: { speed: number }) {
  const shakeX = useMotionValue(0);
  const shakeY = useMotionValue(0);
  useEffect(() => {
    if (speed < 0.1) { shakeX.set(0); shakeY.set(0); return; }
    const id = setInterval(() => {
      const amp = speed * 4;
      shakeX.set((Math.random() - 0.5) * amp);
      shakeY.set((Math.random() - 0.5) * amp * 0.6);
    }, 50);
    return () => clearInterval(id);
  }, [speed, shakeX, shakeY]);
  return (
    <motion.div style={{
      position: "absolute", inset: 0, zIndex: 38,
      x: shakeX, y: shakeY, pointerEvents: "none",
    }} />
  );
}

/* --- Main Scene --- */
export default function RaceTrackScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth        = useSpring(scrollYProgress, { stiffness: 55, damping: 18 });
  const rawVelocity   = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 40, damping: 22 });

  const [renderProgress, setRenderProgress] = React.useState(0);
  const [renderSpeed,    setRenderSpeed]    = React.useState(0);
  const [currentIndex,   setCurrentIndex]   = React.useState(0);

  const [isMobileSize, setIsMobileSize] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobileSize(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubP = smooth.on("change", (v) => {
      setRenderProgress(v);
      setCurrentIndex(Math.min(Math.floor(v * EVENTS.length), EVENTS.length - 1));
    });
    const unsubV = smoothVelocity.on("change", (v) => {
      setRenderSpeed(Math.min(Math.abs(v) * 3.5, 1));
    });
    return () => { unsubP(); unsubV(); };
  }, [smooth, smoothVelocity]);

  // Compute camera banking tilt directly from both winding curvature and scroll velocity
  const currentBend = Math.sin(renderProgress * 8 + 0.8 * 2.8);
  const totalTilt = useTransform(smoothVelocity, (vel) => {
    const bendTilt = currentBend * -15; // tilt depending on how road curves
    const scrollGForce = Math.min(Math.max(vel * -5, -8), 8);
    return bendTilt + scrollGForce;
  });

  const scrollHint = useTransform(smooth, [0, 0.08], [1, 0]);
  const checkLabel = useTransform(smooth, [0.04, 0.12], [0, 1]);

  return (
    <div ref={containerRef} style={{ height: `${EVENTS.length * 130 + 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "#000008" }}>

        {/* Camera container — tilts on scroll velocity and track curvature */}
        <motion.div style={{
          position: "absolute", inset: 0,
          rotateZ: totalTilt,
          transformPerspective: 1200,
        }}>
          <RoadCanvas progress={renderProgress} speed={renderSpeed} isMobileSize={isMobileSize} />

          {/* Checkpoint info pop cards */}
          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
            {EVENTS.slice(0, -1).map((evt, i) => (
              <Checkpoint 
                key={evt.title} 
                evt={evt} 
                index={i} 
                total={EVENTS.length} 
                scrollYProgress={smooth} 
                isMobileSize={isMobileSize} 
              />
            ))}
          </div>

          <FinishOverlay scrollYProgress={smooth} isMobileSize={isMobileSize} />
        </motion.div>

        {/* Speed FX */}
        <SpeedOverlay speed={renderSpeed} isMobileSize={isMobileSize} />
        <CameraShake speed={renderSpeed} />

        {/* HUD: Top center badge */}
        <div style={{
          position: "absolute", top: isMobileSize ? 12 : 20, left: "50%",
          transform: isMobileSize ? "translateX(-50%) scale(0.8)" : "translateX(-50%)",
          transformOrigin: "top center",
          zIndex: 40, pointerEvents: "none",
          width: isMobileSize ? "90%" : "auto",
          display: "flex", justifyContent: "center"
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: isMobileSize ? "5px 12px" : "7px 20px", borderRadius: 100,
            background: "rgba(6,182,212,0.07)",
            border: "1px solid rgba(6,182,212,0.22)",
            backdropFilter: "blur(12px)",
            fontFamily: "var(--font-display,'Outfit',system-ui)",
            fontSize: 9, fontWeight: 900, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#22d3ee",
            whiteSpace: "nowrap",
          }}>
            {isMobileSize ? "🏎️ Sep 5, 2026 · PESIAMS" : "🏎️ Sep 5, 2026 · Hackathon Day · PESIAMS"}
          </div>
        </div>

        {/* HUD: Speedometer bottom-left */}
        <Speedometer speed={renderSpeed} progress={renderProgress} isMobileSize={isMobileSize} />

        {/* HUD: Minimap top-right */}
        <MinimapHUD progress={renderProgress} currentIndex={currentIndex} isMobileSize={isMobileSize} />

        {/* Scroll hint — fades out */}
        <motion.div style={{
          position: "absolute", bottom: isMobileSize ? 80 : 24, left: "50%",
          transform: isMobileSize ? "translateX(-50%) scale(0.85)" : "translateX(-50%)",
          transformOrigin: "bottom center",
          zIndex: 40,
          opacity: scrollHint, pointerEvents: "none",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 24px", borderRadius: 100,
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
          }}>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#06b6d4", boxShadow: "0 0 8px rgba(6,182,212,0.9)",
              }}
            />
            <span style={{
              fontFamily: "var(--font-display,'Outfit',system-ui)",
              fontSize: 9, fontWeight: 900, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "#52525b",
              whiteSpace: "nowrap",
            }}>
              {isMobileSize ? "Scroll to race" : `Scroll to race · ${EVENTS.length} checkpoints · Finish line ahead`}
            </span>
          </div>
        </motion.div>

        {/* Active event label — center bottom */}
        <motion.div style={{
          position: "absolute", bottom: 100, left: "50%",
          transform: "translateX(-50%)", zIndex: 40,
          opacity: checkLabel, pointerEvents: "none",
        }}>
          <div style={{
            textAlign: "center",
            fontFamily: "var(--font-display,'Outfit',system-ui)",
            fontSize: 10, fontWeight: 900, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.18)",
          }}>
            {EVENTS[currentIndex]?.time} · {EVENTS[currentIndex]?.title}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
