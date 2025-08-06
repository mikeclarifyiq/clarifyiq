"use client";
import React, { useRef, useEffect } from "react";

const TOTAL = 3000;

interface Point {
  x: number;
  y: number;
}

export const ParticleScene: React.FC<{ streams?: number }> = ({ streams = 3 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const progressRef = useRef(0);

  useEffect(() => {
    const radius = 120;
    const pts: Point[] = [];
    for (let i = 0; i < TOTAL; i++) {
      const angle = (i / TOTAL) * Math.PI * 2;
      pts.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
    }
    pointsRef.current = pts;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const docHeight = doc.scrollHeight - window.innerHeight;
      progressRef.current = docHeight > 0 ? scrollTop / docHeight : 0;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const render = () => {
      const w = (canvas.width = canvas.clientWidth);
      const h = (canvas.height = canvas.clientHeight);
      ctx.clearRect(0, 0, w, h);
      const progress = progressRef.current;
      pointsRef.current.forEach((p, idx) => {
        const streamIndex = idx % streams;
        const tx = (streamIndex - (streams - 1) / 2) * 80 * progress;
        const ty = -progress * h * 0.8;
        const x = w / 2 + p.x * (1 - progress) + tx;
        const y = h / 2 + p.y * (1 - progress) + ty;
        ctx.fillStyle = "rgba(58,153,255,0.75)";
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [streams]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

