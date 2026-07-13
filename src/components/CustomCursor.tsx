"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for trailing outline
  const springConfig = { damping: 30, stiffness: 220, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Scroll tracking for neon color shifting
  const { scrollYProgress } = useScroll();
  
  // Transform scroll position into a continuous loop of neon colors
  const ringColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"] // cyan -> violet -> pink -> amber -> emerald
  );

  const ringShadow = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "0 0 12px rgba(6, 182, 212, 0.5)",
      "0 0 12px rgba(139, 92, 246, 0.5)",
      "0 0 12px rgba(236, 72, 153, 0.5)",
      "0 0 12px rgba(245, 158, 11, 0.5)",
      "0 0 12px rgba(16, 185, 129, 0.5)"
    ]
  );

  useEffect(() => {
    // Check if device is touch-based or has no fine pointer
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target is interactive (button, anchor, or custom attribute)
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          target.classList.contains("clickable") ||
          target.getAttribute("data-clickable") === "true" ||
          window.getComputedStyle(target).cursor === "pointer";

        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* 1. Mix-Blend-Difference Inner Dot */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-difference">
        <motion.div
          className="fixed top-0 left-0 bg-white rounded-full pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
            width: isHovered ? 6 : 8,
            height: isHovered ? 6 : 8,
          }}
          animate={{
            scale: isClicked ? 0.6 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        />
      </div>

      {/* 2. Aesthetic Glowing Outer Ring (Moves with color transformations based on scroll position) */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <motion.div
          className="fixed top-0 left-0 rounded-full border pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
            width: isHovered ? 48 : 20,
            height: isHovered ? 48 : 20,
            borderColor: ringColor,
            boxShadow: ringShadow,
          }}
          animate={{
            scale: isClicked ? 0.8 : 1,
            opacity: isVisible ? 1 : 0,
            borderWidth: isHovered ? "2px" : "1.5px",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        />
      </div>
    </>
  );
}
