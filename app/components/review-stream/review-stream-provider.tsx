"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface AttributeChip {
  name: string;
  sentiment: "pos" | "neu" | "neg";
}

export interface ReviewRow {
  id: string;
  snippet: string;
  attributes: AttributeChip[];
}

interface BinCounts {
  pos: number;
  neu: number;
  neg: number;
}

interface ReviewStreamCtx {
  waterfall: ReviewRow[];
  spotlight: ReviewRow | null;
  bins: Record<string, BinCounts>;
  popSpotlight: () => void;
}

const ReviewStreamContext = createContext<ReviewStreamCtx | null>(null);

export function useReviewStream() {
  const ctx = useContext(ReviewStreamContext);
  if (!ctx) throw new Error("useReviewStream must be used within provider");
  return ctx;
}

export function ReviewStreamProvider({ children }: { children: ReactNode }) {
  const [waterfall, setWaterfall] = useState<ReviewRow[]>([]);
  const [spotlight, setSpotlight] = useState<ReviewRow | null>(null);
  const [bins, setBins] = useState<Record<string, BinCounts>>({});

  // Fetch new reviews periodically
  useEffect(() => {
    const id = setInterval(async () => {
      if (waterfall.length >= 60) return;
      try {
        const res = await fetch("/api/review-stream?batch=100");
        const j = await res.json();
        setWaterfall((q) => [...q, ...j.rows]);
      } catch (err) {
        console.error(err);
      }
    }, 5000);
    return () => clearInterval(id);
  }, [waterfall.length]);

  // Promote next review to spotlight periodically
  useEffect(() => {
    const id = setInterval(() => {
      setSpotlight((s) => {
        if (s || waterfall.length === 0) return s;
        const [next, ...rest] = waterfall;
        setWaterfall(rest);
        return next;
      });
    }, 3500);
    return () => clearInterval(id);
  }, [waterfall]);

  const popSpotlight = () => setSpotlight(null);

  // Update bins when spotlight changes
  useEffect(() => {
    if (!spotlight) return;
    spotlight.attributes.forEach((a) => {
      setBins((b) => {
        const counts = b[a.name] || { pos: 0, neu: 0, neg: 0 };
        counts[a.sentiment] += 1;
        return { ...b, [a.name]: counts };
      });
    });
  }, [spotlight]);

  return (
    <ReviewStreamContext.Provider value={{ waterfall, spotlight, bins, popSpotlight }}>
      {children}
    </ReviewStreamContext.Provider>
  );
}

