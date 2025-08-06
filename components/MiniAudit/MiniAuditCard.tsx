"use client";
import React, { useState } from 'react';
import ReviewsCard from './ReviewsCard';
import SEOCart from './SEOCart';
import UXCard from './UXCard';
import { ReviewsInputs, SEOInputs, UXInputs } from './variables';

type CardType = 'reviews' | 'seo' | 'ux';

export default function MiniAuditCard({ type }: { type: CardType }) {
  const [email, setEmail] = useState('');
  const [marketId, setMarketId] = useState('');
  const [unit, setUnit] = useState<'monthly' | 'annual'>('monthly');

  const common = { email, market_id: marketId, revenue_unit: unit };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col space-y-4">
      {/* Email Input */}
      <input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-400 transition placeholder-gray-400 outline-none"
      />

      {/* Market Selector */}
      <select
        value={marketId}
        onChange={e => setMarketId(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
      >
        <option value="">Select Your Market</option>
      </select>

      {/* Revenue Unit Toggle */}
      <div className="flex space-x-2">
        {['monthly', 'annual'].map(opt => (
          <button
            key={opt}
            onClick={() => setUnit(opt as 'monthly' | 'annual')}
            className={`flex-1 text-sm font-semibold py-1 rounded-lg transition ${
              unit === opt ? 'bg-gradient-to-r from-purple-500 to-blue-400 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>

      {/* Card Body */}
      {type === 'reviews' && (
        <ReviewsCard
          {...(common as ReviewsInputs)}
          auto_detect={false}
          star_rating={3}
          review_velocity={0}
          response_rate={0}
        />
      )}
      {type === 'seo' && (
        <SEOCart
          {...(common as SEOInputs)}
          run_live_audit={false}
          gmb_profile={false}
          schema_markup={false}
          citations={false}
          keywords={false}
        />
      )}
      {type === 'ux' && (
        <UXCard
          {...(common as UXInputs)}
          fetch_cwv={false}
          lcp_ms={2000}
          taps_to_book={3}
          image_quality={60}
        />
      )}
    </div>
  );
}
