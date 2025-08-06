"use client";
import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import FlipNumbers from 'react-flip-numbers';
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
        <Slider min={500} max={3000} value={lcp} onChange={v => setLcp(v as number)} trackStyle={{ background: 'linear-gradient(90deg,#DC2626,#10B981)' }} handleStyle={{ borderColor: '#10B981' }} />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Taps to Book: {taps}</label>
        <Slider min={1} max={6} value={taps} onChange={v => setTaps(v as number)} trackStyle={{ background: '#F97316' }} handleStyle={{ borderColor: '#F97316' }} />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Image Quality: {imgQ}</label>
        <Slider min={0} max={100} value={imgQ} onChange={v => setImgQ(v as number)} trackStyle={{ background: '#EC4899' }} handleStyle={{ borderColor: '#EC4899' }} />
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
          <FlipNumbers height={40} width={24} play numbers={delta.toString()} />
          <span>/{revenue_unit === 'monthly' ? 'mo' : 'yr'}</span>
        </motion.div>
      )}
    </div>
  );
}

