"use client";

import { useReviewStream } from "./review-stream-provider";
import { motion } from "framer-motion";
import { useMemo } from "react";

function FallingCard({ snippet }: { snippet: string }) {
  const amplitude = useMemo(() => 6 + Math.random() * 10, []);
  return (
    <motion.div
      className="absolute left-0 w-full mb-3"
      initial={{ y: "-100%", opacity: 0, x: 0 }}
      animate={{
        y: "100%",
        opacity: [0, 0.85, 0.85, 0],
        x: [0, amplitude, -amplitude, amplitude, 0],
      }}
      transition={{
        y: { duration: 12, ease: "linear" },
        opacity: { duration: 12, times: [0, 0.083, 0.92, 1] },
        x: {
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      }}
    >
      <div className="bg-[#F8FAFC] bg-opacity-90 backdrop-blur-sm border-l-[3px] border-slate-300 shadow-sm p-2 text-[12px] leading-tight hover:-translate-y-0.5 hover:border-slate-400 transition will-change-transform">
        <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
          {snippet}
        </p>
      </div>
    </motion.div>
  );
}

export function WaterfallColumn() {
  const { waterfall } = useReviewStream();
  return (
    <div className="relative w-[220px] h-[400px] overflow-hidden">
      {waterfall.map((r) => (
        <FallingCard key={r.id} snippet={r.snippet} />
      ))}
    </div>
  );
}

