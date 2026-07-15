"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // References for DOM nodes to bypass React re-renders
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Core movement coordinates
  const target = useRef({ x: -100, y: -100 });
  const lastTarget = useRef({ x: -100, y: -100 });
  
  const vx = useRef(-100);
  const vy = useRef(-100);
  const vxb = useRef(-100);
  const vyb = useRef(-100);
  const vxc = useRef(-100);
  const vyc = useRef(-100);

  const ringX = useRef(-100);
  const ringY = useRef(-100);
  const dotX = useRef(-100);
  const dotY = useRef(-100);

  // Spotlight glow configurations
  const glowSize = useRef(350);
  const glowIntensity = useRef(1.0);

  // Track the last input pointer type and scroll position for mobile inertia
  const lastPointerType = useRef<"mouse" | "touch">("mouse");
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    // Track mouse positioning and hover state
    const handleMouseMove = (e: MouseEvent) => {
      lastPointerType.current = "mouse";
      
      const targetEl = e.target as HTMLElement | null;
      const isInput = targetEl ? (
        targetEl.tagName === "INPUT" || 
        targetEl.tagName === "TEXTAREA" || 
        targetEl.tagName === "SELECT" ||
        targetEl.closest("input, textarea, select")
      ) : false;

      if (isInput) {
        setIsVisible(false);
        return;
      }

      if (!isVisible) setIsVisible(true);

      const clickableParent = targetEl ? targetEl.closest(".clickable, button, a") as HTMLElement | null : null;

      if (clickableParent) {
        setIsHovered(true);

        const rect = clickableParent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Snapping cursor target slightly towards button center
        target.current.x = centerX + (e.clientX - centerX) * 0.25;
        target.current.y = centerY + (e.clientY - centerY) * 0.25;

        // Premium magnetic translation pull on the button
        const pullX = (e.clientX - centerX) * 0.18;
        const pullY = (e.clientY - centerY) * 0.18;
        clickableParent.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        clickableParent.style.transition = "none";
      } else {
        setIsHovered(false);
        target.current.x = e.clientX;
        target.current.y = e.clientY;

        // Smooth release of all translated interactive elements
        const buttons = document.querySelectorAll(".clickable, button, a");
        buttons.forEach((btn) => {
          const el = btn as HTMLElement;
          if (el.style.transform) {
            el.style.transform = "";
            el.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
          }
        });
      }
    };

    const handleMouseDown = () => {
      lastPointerType.current = "mouse";
      setIsClicked(true);
    };
    
    const handleMouseUp = () => {
      lastPointerType.current = "mouse";
      setIsClicked(false);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Touch event handlers for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      lastPointerType.current = "touch";
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        target.current.x = touch.clientX;
        target.current.y = touch.clientY;

        // Snap coordinates instantly to touchstart point to prevent long sliding transitions from old positions
        vx.current = touch.clientX;
        vy.current = touch.clientY;
        vxb.current = touch.clientX;
        vyb.current = touch.clientY;
        vxc.current = touch.clientX;
        vyc.current = touch.clientY;
        ringX.current = touch.clientX;
        ringY.current = touch.clientY;
        dotX.current = touch.clientX;
        dotY.current = touch.clientY;

        lastTarget.current.x = touch.clientX;
        lastTarget.current.y = touch.clientY;

        setIsVisible(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      lastPointerType.current = "touch";
      if (e.touches.length > 0) {
        if (!isVisible) setIsVisible(true);
        const touch = e.touches[0];
        target.current.x = touch.clientX;
        target.current.y = touch.clientY;
      }
    };

    const handleTouchEnd = () => {
      lastPointerType.current = "touch";
      setIsVisible(false);
      setIsClicked(false);
    };

    // Scroll event handler to dynamically shift cursor coordinates
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Scroll delta is only tracked for mobile touch devices so the glow travels with the page
      if (lastPointerType.current === "touch") {
        target.current.y -= deltaY;

        // Keep target coordinate within viewport boundary margins
        const margin = window.innerHeight * 1.2;
        target.current.y = Math.max(-margin, Math.min(window.innerHeight + margin, target.current.y));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Register mobile touch and scroll listeners
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Highly performant 60 FPS RequestAnimationFrame Loop
    let animationFrameId: number;

    const animateLoop = () => {
      // Primary lerp positioning
      vx.current += (target.current.x - vx.current) * 0.085;
      vy.current += (target.current.y - vy.current) * 0.085;

      // Secondary trail coordinates (fades behind)
      vxb.current += (vx.current - vxb.current) * 0.14;
      vyb.current += (vy.current - vyb.current) * 0.14;

      // Tertiary trail coordinates (fades further behind)
      vxc.current += (vxb.current - vxc.current) * 0.14;
      vyc.current += (vyb.current - vyc.current) * 0.14;

      // Pointer ring & dot lerping
      ringX.current += (target.current.x - ringX.current) * 0.16;
      ringY.current += (target.current.y - ringY.current) * 0.16;

      dotX.current += (target.current.x - dotX.current) * 0.28;
      dotY.current += (target.current.y - dotY.current) * 0.28;

      // Velocity calculation (speed of movement)
      const dx = target.current.x - lastTarget.current.x;
      const dy = target.current.y - lastTarget.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Record last coordinate
      lastTarget.current.x = target.current.x;
      lastTarget.current.y = target.current.y;

      // Expand glow on move, contract when static
      let destSize = 350;
      let destIntensity = 1.0;

      if (speed > 1.2) {
        destSize = isHovered ? 450 : 390;
        destIntensity = isHovered ? 1.4 : 1.15;
      } else {
        destSize = isHovered ? 380 : 310;
        destIntensity = isHovered ? 1.2 : 0.85;
      }

      // Smooth glow size and brightness lerping
      glowSize.current += (destSize - glowSize.current) * 0.06;
      glowIntensity.current += (destIntensity - glowIntensity.current) * 0.06;

      // Write CSS variables to DOM root
      const doc = document.documentElement;
      doc.style.setProperty("--cursor-vx", `${vx.current}px`);
      doc.style.setProperty("--cursor-vy", `${vy.current}px`);
      doc.style.setProperty("--cursor-vxb", `${vxb.current}px`);
      doc.style.setProperty("--cursor-vyb", `${vyb.current}px`);
      doc.style.setProperty("--cursor-vxc", `${vxc.current}px`);
      doc.style.setProperty("--cursor-vyc", `${vyc.current}px`);
      doc.style.setProperty("--cursor-glow-size", `${glowSize.current}px`);
      doc.style.setProperty("--cursor-glow-intensity", `${glowIntensity.current}`);

      // Manual DOM element transforms to prevent React lag
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0) translate(-50%, -50%) scale(${
          isClicked ? 0.8 : isHovered ? 1.4 : 1.0
        })`;
        ringRef.current.style.opacity = isVisible ? "1" : "0";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX.current}px, ${dotY.current}px, 0) translate(-50%, -50%) scale(${
          isClicked ? 0.65 : 1.0
        })`;
        dotRef.current.style.opacity = isVisible ? "1" : "0";
      }

      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);

      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isHovered, isClicked]);

  return (
    <>
      {/* 1. Mix-Blend-Difference Inner Dot Pointer */}
      <div className="pointer-events-none fixed inset-0 z-55 overflow-hidden mix-blend-difference">
        <div
          ref={dotRef}
          className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full transition-opacity duration-300 pointer-events-none"
          style={{ transform: "translate(-100px, -100px)" }}
        />
      </div>

      {/* 2. Soft Glowing Ring Pointer */}
      <div className="pointer-events-none fixed inset-0 z-55 overflow-hidden">
        <div
          ref={ringRef}
          className="fixed top-0 left-0 w-5 h-5 rounded-full border border-white/30 backdrop-blur-[1px] transition-all duration-300 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.05)]"
          style={{ transform: "translate(-100px, -100px)" }}
        />
      </div>
    </>
  );
}
