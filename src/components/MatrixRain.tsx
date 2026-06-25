/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { useStore } from "../store";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { matrixRainEnabled } = useStore();

  useEffect(() => {
    if (!matrixRainEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas dynamically to match window width/height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters pool
    const chars = "01010101XYZFKHACKER$#@%+-=<>/*".split("");
    const fontSize = 13;
    let columns = Math.floor(canvas.width / fontSize);

    // Track active vertical drops
    let drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // stagger starting drops
    }

    let animationFrameId: number;

    const draw = () => {
      // Semi-transparent background overlay to create trailing fade effect
      ctx.fillStyle = "rgba(9, 9, 11, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 200, 83, 0.35)"; // faint hacker green
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character
        ctx.fillText(text, x, y);

        // Reset drops when they hit bottom of screen, randomly
        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Throttle frame render to 24fps to conserve CPU power
    let lastTime = 0;
    const interval = 1000 / 24;

    const update = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed > interval) {
        draw();
        lastTime = timestamp - (elapsed % interval);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [matrixRainEnabled]);

  if (!matrixRainEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.25]"
    />
  );
}
