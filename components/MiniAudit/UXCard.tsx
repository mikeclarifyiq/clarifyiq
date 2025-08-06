"use client";
import React, { useState } from 'react';
import { UXInputs } from './variables';
import { motion } from 'framer-motion';

export default function UXCard(props: UXInputs) {
  const { email, market_id, revenue_unit } = props;
  const [fetchCWV, setFetchCWV] = useState(false);
  const [lcp, setLcp] = useState(2000);
  const [taps, setTaps] = useState(4);
  const [imgQ, setImgQ] = useState(60);
  const [loading, setLoading] = useState(false);
  const [delta, setDelta] = useState<number | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    const payload = { email, market_id, revenue_unit, fetch_cwv: fetchCWV, lcp_ms: lcp, taps_to_book: taps, image_quality: imgQ };
    const res = await fetch('/api/calc/ux', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const json = await res.json();
    setDelta(json.delta_revenue);
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-6">
      <label className="inline-flex items-center space-x-2">
        <input type="checkbox" checked={fetchCWV} onChange={() => setFetchCWV(!fetchCWV)} className="h-5 w-5 text-blue-500" />
        <span className="text-sm text-gray-700">Fetch real CWV</span>
      </label>

      <div>
        <label className="block text-sm text-gray-600">LCP: {lcp} ms</label>
        <input
          type="range"
          min={500}
          max={3000}
          value={lcp}
          onChange={e => setLcp(parseFloat(e.target.value))}
          className="w-full accent-green-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Taps to Book: {taps}</label>
        <input
          type="range"
          min={1}
          max={6}
          value={taps}
          onChange={e => setTaps(parseFloat(e.target.value))}
          className="w-full accent-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Image Quality: {imgQ}</label>
        <input
          type="range"
          min={0}
          max={100}
          value={imgQ}
          onChange={e => setImgQ(parseFloat(e.target.value))}
          className="w-full accent-pink-500"
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={loading || !email || !market_id}
        className="mt-4 flex justify-center py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-400 hover:from-purple-600 hover:to-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <span className="loader mr-2" /> : null}
        Calculate
      </button>

      {delta !== null && (
        <motion.div className="mt-4 flex justify-center items-baseline space-x-1 text-blue-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="text-2xl font-mono">$</span>
          <motion.span key={delta} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-mono">
            {delta}
          </motion.span>
          <span>/{revenue_unit === 'monthly' ? 'mo' : 'yr'}</span>
        </motion.div>
      )}
    </div>
  );
}

