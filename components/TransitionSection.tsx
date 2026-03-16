"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TransitionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

  return (
    <div
      ref={ref}
      className="relative h-48 md:h-64 overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(to bottom, #0A0A0A, #0d0a05, #0A0A0A)" }}
    >
      {/* Floating ember streaks */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${15 + i * 14}%`,
              top: "50%",
              width: "2px",
              height: `${20 + Math.random() * 40}px`,
              background: `linear-gradient(to top, rgba(201,168,76,0.8), transparent)`,
              opacity: 0.6 - i * 0.05,
              animation: `ember ${3 + i * 0.5}s ease-in infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Center ornament */}
      <motion.div
        style={{ y: y2, opacity, scale }}
        className="text-center z-10"
      >
        <div className="flex items-center gap-6">
          <div className="gold-line w-24 md:w-40" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-got-gold text-2xl" style={{ textShadow: "0 0 20px rgba(201,168,76,0.6)" }}>
              ✦
            </span>
            <p className="font-cinzel text-got-steel text-xs tracking-[0.4em] uppercase opacity-60">
              The Realm Awaits
            </p>
            <span className="text-got-gold text-2xl" style={{ textShadow: "0 0 20px rgba(201,168,76,0.6)" }}>
              ✦
            </span>
          </div>
          <div className="gold-line w-24 md:w-40" />
        </div>
      </motion.div>

      {/* Fog bleed from top */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
        }}
      />

      {/* Fog bleed to bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
        }}
      />
    </div>
  );
}
