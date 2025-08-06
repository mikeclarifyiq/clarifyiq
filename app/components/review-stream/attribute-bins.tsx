"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReviewStream } from "./review-stream-provider";

type Sentiment = "pos" | "neu" | "neg";
interface Flare { id: number; sentiment: Sentiment; x: number; }

function flareColor(s: Sentiment) {
  switch (s) {
    case "pos":
      return "text-emerald-600";
    case "neg":
      return "text-rose-600";
    default:
      return "text-slate-600";
  }
}

export function AttributeBins() {
  const { bins } = useReviewStream();
  const prev = useRef<Record<string, { pos: number; neu: number; neg: number }>>({});
  const [flares, setFlares] = useState<Record<string, Flare[]>>({});

  useEffect(() => {
    Object.entries(bins).forEach(([attr, counts]) => {
      const p = prev.current[attr] || { pos: 0, neu: 0, neg: 0 };
      (Object.keys(counts) as Sentiment[]).forEach((sent) => {
        const diff = counts[sent] - (p[sent] || 0);
        if (diff > 0) {
          for (let i = 0; i < diff; i++) {
            setFlares((f) => {
              const arr = f[attr] || [];
              return {
                ...f,
                [attr]: [
                  ...arr,
                  { id: Date.now() + Math.random(), sentiment: sent, x: Math.random() * 8 - 4 },
                ],
              };
            });
          }
        }
      });
    });
    prev.current = JSON.parse(JSON.stringify(bins));
  }, [bins]);

  const removeFlare = (attr: string, id: number) => {
    setFlares((f) => {
      const arr = (f[attr] || []).filter((fl) => fl.id !== id);
      return { ...f, [attr]: arr };
    });
  };

  return (
    <div className="flex gap-6">
      {Object.entries(bins).map(([attr, counts]) => {
        const total = counts.pos + counts.neu + counts.neg;
        const posH = total ? (counts.pos / total) * 100 : 0;
        const neuH = total ? (counts.neu / total) * 100 : 0;
        const negH = 100 - posH - neuH;
        return (
          <div key={attr} className="relative h-40 w-8 flex flex-col items-center">
            <div className="relative w-8 h-28 bg-slate-200 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 w-full bg-emerald-500"
                animate={{ height: `${posH}%` }}
                transition={{ type: "spring", duration: 0.5 }}
              />
              <motion.div
                className="absolute left-0 w-full bg-slate-500"
                animate={{ height: `${neuH}%`, bottom: `${posH}%` }}
                transition={{ type: "spring", duration: 0.5 }}
              />
              <motion.div
                className="absolute top-0 left-0 w-full bg-rose-500"
                animate={{ height: `${negH}%` }}
                transition={{ type: "spring", duration: 0.5 }}
              />
            </div>
            <div className="text-[11px] text-slate-600 mt-1">{attr}</div>
            <AnimatePresence>
              {(flares[attr] || []).map((fl) => (
                <motion.span
                  key={fl.id}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.8 }}
                  style={{ left: `calc(50% + ${fl.x}px)` }}
                  className={`absolute bottom-8 text-xs font-semibold ${flareColor(fl.sentiment)}`}
                  onAnimationComplete={() => removeFlare(attr, fl.id)}
                >
                  +1
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

