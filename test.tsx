import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * A single-file export of the Mini Audit calculators using dummy data.
 * This component is designed for quick import into Framer.
 */
export default function Test() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <MiniAuditCard type="reviews" />
      <MiniAuditCard type="seo" />
      <MiniAuditCard type="ux" />
    </div>
  );
}

type CardType = 'reviews' | 'seo' | 'ux';

interface BaseInputs {
  email: string;
  market_id: string;
  revenue_unit: 'monthly' | 'annual';
}

function MiniAuditCard({ type }: { type: CardType }) {
  const [email, setEmail] = useState('demo@company.com');
  const [marketId, setMarketId] = useState('demo-market');
  const [unit, setUnit] = useState<'monthly' | 'annual'>('monthly');

  const common: BaseInputs = { email, market_id: marketId, revenue_unit: unit };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white/80 backdrop-blur rounded-2xl shadow-lg flex flex-col space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-400 transition placeholder-gray-400 outline-none"
        placeholder="you@company.com"
      />

      <input
        value={marketId}
        onChange={(e) => setMarketId(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        placeholder="market-id"
      />

      <div className="flex space-x-2">
        {(['monthly', 'annual'] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setUnit(opt)}
            className={`flex-1 text-sm font-semibold py-1 rounded-lg transition ${
              unit === opt
                ? 'bg-gradient-to-r from-purple-500 to-blue-400 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {type === 'reviews' && <ReviewsCard {...common} />}
      {type === 'seo' && <SEOCart {...common} />}
      {type === 'ux' && <UXCard {...common} />}
    </div>
  );
}

function ReviewsCard({ revenue_unit }: BaseInputs) {
  const [star, setStar] = useState(4.2);
  const [velocity, setVelocity] = useState(5);
  const [response, setResponse] = useState(60);
  const [delta, setDelta] = useState<number | null>(null);
  const [advanced, setAdvanced] = useState(false);

  const calc = () => {
    const diff = 5 - star + (10 - velocity) * 0.1 + (100 - response) * 0.01;
    setDelta(Math.max(0, Math.round(diff * 1000)));
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-sm text-gray-600">Star Rating: {star.toFixed(1)}</label>
      <input
        type="range"
        min={1}
        max={5}
        step={0.1}
        value={star}
        onChange={(e) => setStar(parseFloat(e.target.value))}
      />

      <button
        onClick={() => setAdvanced(!advanced)}
        className="text-sm text-blue-600 hover:underline self-start"
      >
        {advanced ? 'Hide advanced controls' : 'Advanced controls'}
      </button>

      {advanced && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Review Velocity: {velocity}</label>
            <input type="range" min={0} max={20} value={velocity} onChange={(e) => setVelocity(parseInt(e.target.value))} />
          </div>
          <div>
            <label className="text-sm text-gray-600">Response Rate: {response}%</label>
            <input type="range" min={0} max={100} value={response} onChange={(e) => setResponse(parseInt(e.target.value))} />
          </div>
        </motion.div>
      )}

      <button
        onClick={calc}
        className="flex items-center justify-center py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-400"
      >
        Calculate
      </button>

      {delta !== null && (
        <div className="pt-4 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-mono">
            ${delta}/{revenue_unit === 'monthly' ? 'mo' : 'yr'}
          </motion.div>
        </div>
      )}
    </div>
  );
}

function SEOCart({ revenue_unit }: BaseInputs) {
  const [gmb, setGmb] = useState(false);
  const [schema, setSchema] = useState(false);
  const [citations, setCitations] = useState(false);
  const [keywords, setKeywords] = useState(false);
  const [delta, setDelta] = useState<number | null>(null);

  const calc = () => {
    const score = [gmb, schema, citations, keywords].filter(Boolean).length;
    setDelta(score * 500);
  };

  return (
    <div className="flex flex-col space-y-4">
      {[
        { label: 'GMB profile filled', value: gmb, set: setGmb },
        { label: 'Schema markup', value: schema, set: setSchema },
        { label: 'Citations accurate', value: citations, set: setCitations },
        { label: 'Local keywords', value: keywords, set: setKeywords },
      ].map((item) => (
        <label key={item.label} className="inline-flex items-center space-x-2">
          <input type="checkbox" checked={item.value} onChange={() => item.set(!item.value)} />
          <span className="text-sm text-gray-700">{item.label}</span>
        </label>
      ))}

      <button
        onClick={calc}
        className="mt-4 flex justify-center py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-400"
      >
        Calculate
      </button>

      {delta !== null && (
        <motion.div className="mt-4 text-center text-xl font-mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          ${delta}/{revenue_unit === 'monthly' ? 'mo' : 'yr'}
        </motion.div>
      )}
    </div>
  );
}

function UXCard({ revenue_unit }: BaseInputs) {
  const [lcp, setLcp] = useState(2000);
  const [taps, setTaps] = useState(4);
  const [imgQ, setImgQ] = useState(60);
  const [delta, setDelta] = useState<number | null>(null);

  const calc = () => {
    const diff = (3000 - lcp) * 0.001 + (6 - taps) * 0.2 + (100 - imgQ) * 0.01;
    setDelta(Math.max(0, Math.round(diff * 800)));
  };

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <label className="block text-sm text-gray-600">LCP: {lcp} ms</label>
        <input type="range" min={500} max={3000} value={lcp} onChange={(e) => setLcp(parseInt(e.target.value))} />
      </div>
      <div>
        <label className="block text-sm text-gray-600">Taps to Book: {taps}</label>
        <input type="range" min={1} max={6} value={taps} onChange={(e) => setTaps(parseInt(e.target.value))} />
      </div>
      <div>
        <label className="block text-sm text-gray-600">Image Quality: {imgQ}</label>
        <input type="range" min={0} max={100} value={imgQ} onChange={(e) => setImgQ(parseInt(e.target.value))} />
      </div>

      <button
        onClick={calc}
        className="mt-4 flex justify-center py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-400"
      >
        Calculate
      </button>

      {delta !== null && (
        <motion.div className="mt-4 text-center text-2xl font-mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          ${delta}/{revenue_unit === 'monthly' ? 'mo' : 'yr'}
        </motion.div>
      )}
    </div>
  );
}

