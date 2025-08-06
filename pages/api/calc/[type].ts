import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supa = createClient(process.env.NEXT_PUBLIC_SUPA_URL!, process.env.SUPA_SERVICE_ROLE!);
const schema = z.object({ email: z.string().email(), market_id: z.string(), revenue_unit: z.enum(['monthly', 'annual']) }).passthrough();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.format() });
  const { type } = req.query;
  const body = parse.data as Record<string, unknown>;
  const { data: bench } = await supa.from('markets').select('*').eq('market_id', body.market_id).single();
  let features: number[] = [];
  let weights: number[] = [];
  if (type === 'reviews') {
    features = [
      (body.star_rating as number) - bench.avg_star_rating,
      (body.review_velocity as number) - bench.avg_review_velocity,
      (body.response_rate as number) - bench.avg_response_rate,
    ];
    weights = [bench.weight_reviews * bench.lever_star, bench.weight_reviews * bench.lever_velocity, bench.weight_reviews * bench.lever_response];
  } else if (type === 'seo') {
    features = [
      Number(body.gmb_profile) - bench.avg_GMB_completion,
      Number(body.schema_markup) - bench.avg_schema_markup,
      Number(body.citations) - bench.avg_citations,
      Number(body.keywords) - bench.avg_keywords,
    ];
    weights = [
      bench.weight_seo * bench.lever_gmb,
      bench.weight_seo * bench.lever_schema,
      bench.weight_seo * bench.lever_citations,
      bench.weight_seo * bench.lever_keywords,
    ];
  } else if (type === 'ux') {
    features = [
      (body.lcp_ms as number) - bench.avg_LCP_ms,
      (body.taps_to_book as number) - bench.avg_taps_to_book,
      (body.image_quality as number) - bench.avg_image_quality,
    ];
    weights = [
      bench.weight_ux * bench.lever_lcp,
      bench.weight_ux * bench.lever_taps,
      bench.weight_ux * bench.lever_image,
    ];
  }
  const deltaRaw = features.reduce((a, v, i) => a + v * (weights[i] || 0), 0);
  const delta = Math.round(deltaRaw * (body.revenue_unit === 'annual' ? 12 : 1));
  res.status(200).json({ delta_revenue: delta });
}

