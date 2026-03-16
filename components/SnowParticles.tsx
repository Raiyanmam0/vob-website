"use client";

import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  drift: string;
  opacity: number;
}

export default function SnowParticles({ count = 80 }: { count?: number }) {
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const generated: Snowflake[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 110 - 5}%`,
      size: Math.random() * 4 + 1,
      duration: `${Math.random() * 10 + 8}s`,
      delay: `-${Math.random() * 15}s`,
      drift: `${(Math.random() - 0.5) * 60}px`,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setFlakes(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute top-0 rounded-full"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            backgroundColor: "white",
            opacity: flake.opacity,
            "--duration": flake.duration,
            "--delay": flake.delay,
            "--drift": flake.drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
