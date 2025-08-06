"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReviewStream } from "./review-stream-provider";

function sentimentText(sent: "pos" | "neu" | "neg") {
  switch (sent) {
    case "pos":
      return "text-emerald-600";
    case "neg":
      return "text-rose-600";
    default:
      return "text-slate-600";
  }
}

export function SpotlightSplitter() {
  const { spotlight, popSpotlight } = useReviewStream();

  useEffect(() => {
    if (!spotlight) return;
    const t = setTimeout(popSpotlight, 2500);
    return () => clearTimeout(t);
  }, [spotlight, popSpotlight]);

  return (
    <div className="w-[240px] h-[200px] overflow-visible">
      <AnimatePresence>
        {spotlight && (
          <motion.div
            key={spotlight.id}
            initial={{ x: -240, y: 0, scale: 0.9, opacity: 0.85 }}
            animate={{ x: 0, y: [0, -18, 14, 0], scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative w-[220px]"
          >
            <div className="bg-[#F8FAFC] border-l-[3px] border-slate-300 shadow-sm p-2 backdrop-blur-sm text-[12px] leading-tight">
              <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {spotlight.snippet}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {spotlight.attributes.map((a, i) => (
                <motion.span
                  key={a.name + i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.07, type: "spring", stiffness: 300, damping: 20 }}
                  className={`px-2 py-0.5 rounded-full text-[11px] ${sentimentText(a.sentiment)}`}
                >
                  {a.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

