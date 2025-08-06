"use client";
import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import FlipNumbers from 'react-flip-numbers';
import { motion } from 'framer-motion';
import { ReviewsInputs } from './variables';
import { fetchGMB } from '@/utils/fetchGMB';

export default function ReviewsCard(props: ReviewsInputs) {
  const { email, market_id, revenue_unit, auto_detect: initAuto, star_rating, review_velocity, response_rate } = props;
  const [autoDetect, setAutoDetect] = useState(initAuto);
  const [star, setStar] = useState(star_rating);
  const [velocity, setVelocity] = useState(review_velocity);
  const [responseRate, setResponseRate] = useState(response_rate);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [delta, setDelta] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (autoDetect && email && market_id) {
      fetchGMB({ email, market_id }).then(r => setStar(r.rating));
    }
  }, [autoDetect, email, market_id]);

  const handleCalculate = async () => {
    setLoading(true);
    const payload = { email, market_id, revenue_unit, auto_detect: autoDetect, star_rating: star, review_velocity: velocity, response_rate: responseRate };
    const res = await fetch('/api/calc/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const json = await res.json();
    setDelta(json.delta_revenue);
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="inline-flex items-center space-x-2">
        <input type="checkbox" checked={autoDetect} onChange={() => setAutoDetect(!autoDetect)} className="h-5 w-5 text-blue-500" />
        <span className="text-sm font-medium text-gray-700">Auto-detect my Google rating</span>
      </label>

      {!autoDetect && (
        <div>
          <label className="text-sm text-gray-600">Star Rating: {star.toFixed(1)}</label>
          <Slider
            min={1} max={5} step={0.1} value={star}
            onChange={v => setStar(v as number)}
            trackStyle={{ background: 'linear-gradient(90deg,#6F5BFF, #3A99FF)' }}
            handleStyle={{ borderColor: '#6F5BFF', height: 20, width: 20, marginTop: -8, backgroundColor: 'white' }}
          />
        </div>
      )}

      <button onClick={() => setIsAdvanced(!isAdvanced)} className="text-sm text-blue-600 hover:underline">
        {isAdvanced ? 'Hide advanced controls' : 'Advanced controls'}
      </button>
      {isAdvanced && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Review Velocity: {velocity}</label>
            <Slider min={0} max={20} value={velocity} onChange={v => setVelocity(v as number)} trackStyle={{ background: '#3A99FF' }} handleStyle={{ background: 'white', borderColor: '#3A99FF' }} />
          </div>
          <div>
            <label className="text-sm text-gray-600">Response Rate: {responseRate}%</label>
            <Slider min={0} max={100} value={responseRate} onChange={v => setResponseRate(v as number)} trackStyle={{ background: '#3A99FF' }} handleStyle={{ background: 'white', borderColor: '#3A99FF' }} />
          </div>
        </motion.div>
      )}

      <button
        onClick={handleCalculate}
        disabled={loading || !email || !market_id}
        className={`flex items-center justify-center py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-400 hover:from-purple-600 hover:to-blue-500 transition ${!email||!market_id?'opacity-50 cursor-not-allowed':''}`}
      >
        {loading ? <span className="loader mr-2" /> : null}
        Calculate
      </button>

      {delta !== null && (
        <div className="pt-4 text-center">
          {delta === 0 ? (
            <div className="text-green-600 font-medium">
              🎉 You’re doing amazing! <a href="#" className="underline">See the other 197 levers</a>
            </div>
          ) : (
            <div className="flex justify-center items-baseline space-x-1">
              <span className="text-2xl font-mono">$</span>
              <FlipNumbers height={40} width={24} play numbers={delta.toString()} />
              <span className="text-gray-600">/{revenue_unit === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

