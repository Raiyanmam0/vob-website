"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SnowParticles from "./SnowParticles";

export default function HeroSection() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const snowY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.55;
      audioRef.current.play().catch(() => {});
      setAudioStarted(true);
    }
    setTimeout(() => {
      document.getElementById("wings")?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="snap-section relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          y: bgY,
          scale: 1.08,
        }}
      />

      {/* Cold dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(5,8,15,0.08) 35%, rgba(5,8,18,0.5) 75%, rgba(3,5,12,0.82) 100%)",
        }}
      />

      {/* Subtle cold blue tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(80,110,150,0.05) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Fog layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: fogOpacity }}
      >
        <div
          className="fog-left absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 55% at 15% 55%, rgba(190,200,215,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="fog-right absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 50% at 85% 55%, rgba(180,195,210,0.10) 0%, transparent 60%)",
          }}
        />
        <div
          className="fog-left absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 35% at 50% 75%, rgba(160,175,195,0.14) 0%, transparent 55%)",
            animationDelay: "-6s",
          }}
        />
      </motion.div>

      {/* Snow particles */}
      <motion.div className="absolute inset-0" style={{ y: snowY }}>
        <SnowParticles count={90} />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-between h-full py-10 px-4"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo top-center */}
        <motion.div
          className="flex justify-center w-full"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        >
          <div className="relative" style={{ width: "290px", height: "94px" }}>
            <Image
              src="/logo.png"
              alt="Voice of Business"
              fill
              className="object-contain"
              style={{
                filter:
                  "brightness(1.05) drop-shadow(0 2px 16px rgba(255,255,255,0.18)) drop-shadow(0 0 30px rgba(200,215,235,0.2))",
              }}
              priority
            />
          </div>
        </motion.div>

        {/* Center content */}
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Ornament */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.4 }}
            className="flex items-center gap-5 w-64"
          >
            <div
              className="flex-1"
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(200,215,235,0.5))",
              }}
            />
            <span style={{ color: "rgba(200,215,235,0.7)", fontSize: "16px" }}>❄</span>
            <div
              className="flex-1"
              style={{
                height: "1px",
                background: "linear-gradient(90deg, rgba(200,215,235,0.5), transparent)",
              }}
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            className="font-cinzel text-xs tracking-[0.55em] uppercase"
            style={{ color: "#8B9BB4" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            University of Dhaka
          </motion.p>

          {/* Title */}
          <motion.h1
            className="font-cinzel-decorative font-black tracking-wide leading-tight"
            style={{
              color: "#dce8f0",
              textShadow:
                "0 0 30px rgba(180,210,240,0.35), 0 0 60px rgba(120,160,200,0.15), 0 4px 10px rgba(0,0,0,0.9)",
              fontSize: "clamp(32px, 7vw, 60px)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.9 }}
          >
            Recruitment
            <span
              className="block font-cinzel"
              style={{
                fontSize: "0.52em",
                color: "rgba(180,200,220,0.85)",
                letterSpacing: "0.2em",
                marginTop: "6px",
              }}
            >
              Season 2025
            </span>
          </motion.h1>

          {/* Quote */}
          <motion.p
            className="font-eb-garamond text-base md:text-lg max-w-sm"
            style={{ color: "#8a9bae", fontStyle: "italic", lineHeight: 1.6 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            "When the snows fall and the white winds blow, the lone wolf dies — but the pack survives."
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.7, type: "spring" }}
          >
            <AnimatePresence mode="wait">
              {!entered ? (
                <motion.button
                  key="enter"
                  onClick={handleEnter}
                  className="relative px-10 py-4 font-cinzel text-xs tracking-[0.3em] uppercase overflow-hidden group"
                  style={{
                    border: "1px solid rgba(180,210,240,0.45)",
                    color: "rgba(200,220,240,0.9)",
                    background: "rgba(5,10,20,0.55)",
                    letterSpacing: "0.32em",
                    backdropFilter: "blur(4px)",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(180,210,240,0.1) 50%, transparent 100%)",
                    }}
                  />
                  {/* Ice corner accents */}
                  <span className="absolute top-0 left-0 w-2.5 h-2.5" style={{ borderTop: "1px solid rgba(180,210,240,0.6)", borderLeft: "1px solid rgba(180,210,240,0.6)" }} />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5" style={{ borderTop: "1px solid rgba(180,210,240,0.6)", borderRight: "1px solid rgba(180,210,240,0.6)" }} />
                  <span className="absolute bottom-0 left-0 w-2.5 h-2.5" style={{ borderBottom: "1px solid rgba(180,210,240,0.6)", borderLeft: "1px solid rgba(180,210,240,0.6)" }} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5" style={{ borderBottom: "1px solid rgba(180,210,240,0.6)", borderRight: "1px solid rgba(180,210,240,0.6)" }} />
                  <span className="relative flex items-center gap-3">
                    <span style={{ opacity: 0.7 }}>❄</span>
                    Enter the Realm
                    <span style={{ opacity: 0.7 }}>❄</span>
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="entered"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-cinzel text-xs tracking-widest"
                  style={{ color: "rgba(180,210,240,0.65)" }}
                >
                  The gates open...
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="flex flex-col items-center gap-2"
          style={{ opacity: 0.35 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 2.6 }}
        >
          <p className="font-cinzel text-xs tracking-[0.35em] uppercase" style={{ color: "#8B9BB4" }}>
            Scroll to enter
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: "rgba(180,210,240,0.6)", fontSize: "16px" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>

      <audio ref={audioRef} src="/got-theme.mp3" loop preload="auto" />

      <AnimatePresence>
        {audioStarted && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(5,10,20,0.75)",
              border: "1px solid rgba(180,210,240,0.3)",
              backdropFilter: "blur(8px)",
              color: "rgba(200,220,240,0.8)",
            }}
            onClick={toggleMute}
            title={muted ? "Unmute" : "Mute"}
          >
            <span className="text-base">{muted ? "🔇" : "🔊"}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
