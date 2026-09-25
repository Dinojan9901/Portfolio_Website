'use client';

import React, { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Keep the background static for visitors who ask for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let scrollTicking = false;
    let mouseTicking = false;
    let lastMouse = { x: 0, y: 0 };

    const handleScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    // At most one state update per animation frame, instead of one per mouse event.
    const handleMouseMove = (e: MouseEvent) => {
      lastMouse = { x: e.clientX, y: e.clientY };
      if (!mouseTicking) {
        window.requestAnimationFrame(() => {
          setMousePos({
            x: (lastMouse.x / window.innerWidth) * 40 - 20,
            y: (lastMouse.y / window.innerHeight) * 40 - 20,
          });
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    // Mouse parallax only makes sense with a real pointer (not touch screens).
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (hasFinePointer) window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      {/* Floating Aurora Orb 1 (Top Left / Blue) */}
      <div
        className="aurora-orb orb-1"
        style={{
          transform: `translate3d(${mousePos.x * 0.8}px, ${scrollY * -0.15 + mousePos.y * 0.8}px, 0)`,
        }}
      />

      {/* Floating Aurora Orb 2 (Center Right / Purple-Indigo) */}
      <div
        className="aurora-orb orb-2"
        style={{
          transform: `translate3d(${mousePos.x * -0.6}px, ${scrollY * -0.22 + mousePos.y * -0.6}px, 0)`,
        }}
      />

      {/* Floating Aurora Orb 3 (Bottom Center / Cyan-Emerald) */}
      <div
        className="aurora-orb orb-3"
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${scrollY * -0.18 + mousePos.y * 0.5}px, 0)`,
        }}
      />

      {/* Subtle Digital Grid Overlay */}
      <div className="ambient-grid-pattern" />
    </div>
  );
}
