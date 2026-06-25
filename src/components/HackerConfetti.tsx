/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Particle {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function HackerConfetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const chars = ["0", "1", "x", "f", "a", "c", "k", "e", "r", "#", "$", "%", "!", "A", "B", "F"];
    const colors = ["#00FF33", "#33FF66", "#00C853", "#A9F1A9", "#00E676"];
    const generated: Particle[] = [];

    // Generate 60 hacker matrix code particles bursting from the center screen
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 200 + Math.random() * 400;
      
      generated.push({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - 100, // burst upwards slightly
        size: 14 + Math.floor(Math.random() * 18),
        duration: 1.5 + Math.random() * 1.5,
        delay: Math.random() * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(generated);

    // Auto cleanup after particles finish animating
    const timer = setTimeout(() => {
      setParticles([]);
    }, 3500);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1, 0.5],
              x: p.x,
              y: p.y,
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              fontSize: `${p.size}px`,
              color: p.color,
              fontFamily: "monospace",
              textShadow: `0 0 8px ${p.color}, 0 0 15px ${p.color}`,
              fontWeight: "bold",
            }}
          >
            {p.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
