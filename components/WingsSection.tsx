"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Wing {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const WINGS: Wing[] = [
  {
    id: 1,
    name: "Editorial",
    description: "The quill that shapes the narrative. The Editorial wing crafts compelling content that voices the business world — from op-eds to thought leadership pieces that define the intellectual identity of VOB.",
    icon: "✒️",
  },
  {
    id: 2,
    name: "Publications",
    description: "Architects of the written realm. Publications manages VOB's journals, newsletters, and digital magazines — ensuring every word reaches its rightful audience with purpose and precision.",
    icon: "📖",
  },
  {
    id: 3,
    name: "Corporate Affairs",
    description: "Keepers of alliances and strategy. Corporate Affairs forges bonds with industry titans, manages institutional relationships, and positions VOB at the heart of the business ecosystem.",
    icon: "🏛️",
  },
  {
    id: 4,
    name: "Promotion",
    description: "Heralds of the VOB standard. The Promotion wing commands attention through bold campaigns, visual storytelling, and strategic outreach that amplifies VOB's presence across every frontier.",
    icon: "📣",
  },
  {
    id: 5,
    name: "Public Relations",
    description: "Guardians of reputation and reach. PR manages VOB's image with diplomatic precision — engaging media, handling external communications, and ensuring the voice of VOB resonates with clarity.",
    icon: "🤝",
  },
  {
    id: 6,
    name: "HR & Finance",
    description: "The backbone of the realm. HR & Finance sustains the lifeblood of VOB — managing talent, resources, and the fiscal foundations that keep every wing operational and empowered.",
    icon: "⚖️",
  },
  {
    id: 7,
    name: "IT & KM",
    description: "Masters of knowledge and technology. IT & KM drives VOB's digital transformation — architecting systems, managing knowledge repositories, and keeping the organization at the technological vanguard.",
    icon: "⚙️",
  },
  {
    id: 8,
    name: "Communications",
    description: "The voice between the walls. Communications orchestrates internal and external messaging — ensuring alignment, cohesion, and that every member of the realm speaks with one unified voice.",
    icon: "📡",
  },
];

// Single sword SVG design — blade orientation varies
function SwordSVG({ glowing, tilt = 0 }: { glowing: boolean; tilt?: number }) {
  const goldColor = glowing ? "#FFD700" : "#C9A84C";
  const steelColor = glowing ? "#E8F0FF" : "#B0BEC5";
  const glowFilter = glowing
    ? "drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 20px #C9A84C)"
    : "drop-shadow(0 0 2px rgba(201,168,76,0.3))";

  return (
    <svg
      viewBox="0 0 40 160"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full sword-svg transition-all duration-500"
      style={{ filter: glowFilter, transform: `rotate(${tilt}deg)` }}
    >
      {/* Blade */}
      <polygon
        points="20,2 16,110 20,120 24,110"
        fill={steelColor}
        opacity="0.95"
      />
      {/* Blade edge highlight */}
      <line x1="20" y1="4" x2="20" y2="112" stroke="white" strokeWidth="0.8" opacity="0.5" />
      {/* Blood groove */}
      <line x1="19" y1="10" x2="19" y2="105" stroke={steelColor} strokeWidth="0.5" opacity="0.4" />

      {/* Guard / crossguard */}
      <rect x="6" y="110" width="28" height="6" rx="2" fill={goldColor} />
      <rect x="4" y="111" width="4" height="4" rx="1" fill={goldColor} opacity="0.8" />
      <rect x="32" y="111" width="4" height="4" rx="1" fill={goldColor} opacity="0.8" />

      {/* Handle/Grip */}
      <rect x="17" y="116" width="6" height="28" rx="2" fill="#4A3728" />
      {/* Grip wrapping */}
      {[0, 4, 8, 12, 16, 20, 24].map((y) => (
        <rect key={y} x="16" y={117 + y} width="8" height="2" rx="1" fill={goldColor} opacity="0.6" />
      ))}

      {/* Pommel */}
      <ellipse cx="20" cy="148" rx="6" ry="5" fill={goldColor} />
      <circle cx="20" cy="148" r="2.5" fill="#8B6914" />
      <circle cx="20" cy="148" r="1" fill={goldColor} opacity="0.8" />

      {/* Tip detail */}
      <polygon points="20,2 18,8 22,8" fill="white" opacity="0.7" />
    </svg>
  );
}

interface SwordCardProps {
  wing: Wing;
  position: { top?: string; bottom?: string; left?: string; right?: string; transform?: string };
  tilt?: number;
  delay?: number;
}

function SwordCard({ wing, position, tilt = 0, delay = 0 }: SwordCardProps) {
  const [active, setActive] = useState(false);

  return (
    <>
      <motion.div
        className="absolute cursor-pointer sword-container z-20"
        style={{ ...position, width: "52px", height: "180px" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
        onClick={() => setActive(true)}
        whileHover={{ scale: 1.1, y: -8 }}
      >
        <SwordSVG glowing={active} tilt={tilt} />
        {/* Wing name label */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-cinzel text-got-gold text-center"
          style={{ fontSize: "10px", letterSpacing: "0.05em", textShadow: "0 0 8px rgba(201,168,76,0.8)" }}
        >
          {wing.name}
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
            style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(false)}
          >
            <motion.div
              className="relative max-w-md w-full"
              style={{
                background: "linear-gradient(135deg, #0d0d0d 0%, #1a1209 50%, #0d0d0d 100%)",
                border: "1px solid rgba(201,168,76,0.4)",
                boxShadow: "0 0 60px rgba(201,168,76,0.15), inset 0 0 40px rgba(0,0,0,0.5)",
              }}
              initial={{ scale: 0.8, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top border ornament */}
              <div className="gold-line" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-got-dark px-4 text-got-gold text-lg">
                ⚔
              </div>

              <div className="p-8 pt-10">
                {/* Wing icon */}
                <div className="text-5xl text-center mb-4">{wing.icon}</div>

                {/* Wing name */}
                <h2
                  className="font-cinzel text-got-gold text-center text-2xl mb-2 tracking-widest"
                  style={{ textShadow: "0 0 20px rgba(201,168,76,0.5)" }}
                >
                  {wing.name}
                </h2>

                {/* Sub-label */}
                <p className="text-center text-xs font-cinzel text-got-steel tracking-[0.3em] uppercase mb-6 opacity-70">
                  Voice of Business
                </p>

                <div className="gold-line mb-6" />

                {/* Description */}
                <p
                  className="font-eb-garamond text-center leading-relaxed text-base"
                  style={{ color: "#d4c8b0", fontStyle: "italic" }}
                >
                  {wing.description}
                </p>

                <div className="gold-line mt-6 mb-6" />

                {/* CTA placeholder */}
                <p className="text-center text-xs font-cinzel text-got-steel tracking-widest opacity-60 mb-6">
                  Applications Open · Spring 2025
                </p>

                <button
                  onClick={() => setActive(false)}
                  className="w-full py-3 font-cinzel text-sm tracking-[0.2em] uppercase transition-all duration-300"
                  style={{
                    border: "1px solid rgba(201,168,76,0.5)",
                    color: "#C9A84C",
                    background: "transparent",
                    letterSpacing: "0.2em",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = "rgba(201,168,76,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  Close the Gate
                </button>
              </div>

              {/* Bottom border ornament */}
              <div className="gold-line" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function WingsSection() {
  // Positions around the throne
  const swordPositions = [
    // Left column (top to bottom)
    { top: "8%", left: "2%", tilt: -15, delay: 0.1 },
    { top: "8%", left: "10%", tilt: -8, delay: 0.2 },
    { top: "55%", left: "2%", tilt: -20, delay: 0.3 },
    { top: "55%", left: "10%", tilt: -5, delay: 0.4 },
    // Right column (top to bottom)
    { top: "8%", right: "10%", tilt: 8, delay: 0.5 },
    { top: "8%", right: "2%", tilt: 15, delay: 0.6 },
    { top: "55%", right: "10%", tilt: 5, delay: 0.7 },
    { top: "55%", right: "2%", tilt: 20, delay: 0.8 },
  ];

  return (
    <section
      id="wings"
      className="snap-section relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Throne background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/throne-bg.png')" }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Candle light spots */}
      <div
        className="absolute bottom-16 left-1/4 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,140,0,0.12) 0%, transparent 70%)",
          animation: "flicker 2s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-16 right-1/4 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,140,0,0.12) 0%, transparent 70%)",
          animation: "flicker 2.5s ease-in-out infinite",
        }}
      />

      {/* Title */}
      <motion.div
        className="relative z-30 text-center mb-8 px-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="font-cinzel text-got-steel text-xs tracking-[0.5em] uppercase mb-3 opacity-70">
          The Eight Wings of the Realm
        </p>
        <h2
          className="font-cinzel-decorative text-got-gold text-3xl md:text-5xl font-bold tracking-wider"
          style={{ textShadow: "0 0 30px rgba(201,168,76,0.4), 0 2px 4px rgba(0,0,0,0.8)" }}
        >
          Choose Your Seat
        </h2>
        <div className="gold-line mt-4 max-w-xs mx-auto" />
        <p
          className="font-eb-garamond text-sm md:text-base mt-4 max-w-md mx-auto"
          style={{ color: "#a09070", fontStyle: "italic" }}
        >
          Eight houses. One voice. Hover over a sword to learn of its domain.
        </p>
      </motion.div>

      {/* Swords container */}
      <div className="relative w-full max-w-4xl mx-auto" style={{ height: "420px" }}>
        {WINGS.map((wing, i) => {
          const pos = swordPositions[i];
          const { tilt, delay, ...cssPos } = pos;
          return (
            <SwordCard
              key={wing.id}
              wing={wing}
              position={cssPos}
              tilt={tilt}
              delay={delay}
            />
          );
        })}

        {/* Center throne glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Center instruction text */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="font-cinzel text-got-gold text-xs tracking-widest opacity-60 whitespace-nowrap">
            — tap a sword —
          </p>
        </motion.div>
      </div>

      {/* Bottom ornament */}
      <motion.div
        className="relative z-30 mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="font-cinzel text-got-steel text-xs tracking-[0.3em] opacity-50">
          VOICE OF BUSINESS · EMPOWERING THE LEADER WITHIN
        </p>
      </motion.div>
    </section>
  );
}
