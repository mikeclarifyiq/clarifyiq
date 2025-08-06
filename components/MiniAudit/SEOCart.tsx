"use client";
import React, { useState } from 'react';
import { SEOInputs } from './variables';
import { motion } from 'framer-motion';

export default function SEOCart(props: SEOInputs) {
  const { email, market_id, revenue_unit } = props;
  const [liveAudit, setLiveAudit] = useState(false);
  const [gmb, setGmb] = useState(false);
  const [schema, setSchema] = useState(false);
  const [citations, setCitations] = useState(false);
  const [keywords, setKeywords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delta, setDelta] = useState<number | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    const payload = { email, market_id, revenue_unit, run_live_audit: liveAudit, gmb_profile: gmb, schema_markup: schema, citations, keywords };
    const res = await fetch('/api/calc/seo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const json = await res.json();
    setDelta(json.delta_revenue);
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="inline-flex items-center space-x-2">
        <input type="checkbox" checked={liveAudit} onChange={() => setLiveAudit(!liveAudit)} className="h-5 w-5 text-blue-500" />
        <span className="text-sm text-gray-700">Run live audit</span>
      </label>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'GMB profile filled', state: gmb, set: () => setGmb(!gmb) },
          { label: 'Schema markup enabled', state: schema, set: () => setSchema(!schema) },
          { label: 'Citations accurate', state: citations, set: () => setCitations(!citations) },
          { label: 'Local keywords optimized', state: keywords, set: () => setKeywords(!keywords) }
        ].map((item, idx) => (
          <label key={idx} className="inline-flex items-center space-x-2">
            <input type="checkbox" checked={item.state} onChange={item.set} className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-700">{item.label}</span>
          </label>
        ))}
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
        <motion.div className="mt-4 text-center text-xl font-mono text-blue-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          ${'{'}delta{'}'}/{revenue_unit === 'monthly' ? 'mo' : 'yr'}
        </motion.div>
      )}
    </div>
  );
}

