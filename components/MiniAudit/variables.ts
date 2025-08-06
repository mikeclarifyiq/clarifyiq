export interface BaseInputs {
  email: string;
  market_id: string;
  revenue_unit: 'monthly' | 'annual';
}
export interface ReviewsInputs extends BaseInputs {
  auto_detect: boolean;
  star_rating: number;
  review_velocity: number;
  response_rate: number;
}
export interface SEOInputs extends BaseInputs {
  run_live_audit: boolean;
  gmb_profile: boolean;
  schema_markup: boolean;
  citations: boolean;
  keywords: boolean;
}
export interface UXInputs extends BaseInputs {
  fetch_cwv: boolean;
  lcp_ms: number;
  taps_to_book: number;
  image_quality: number;
}
