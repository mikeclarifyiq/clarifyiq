interface Params {
  email: string;
  market_id: string;
}

export async function fetchGMB({ email, market_id }: Params): Promise<{ rating: number }> {
  const key = process.env.GMB_API_KEY;
  try {
    const url = `https://example.com/gmb?email=${encodeURIComponent(email)}&market=${encodeURIComponent(market_id)}&key=${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Request failed');
    const json = await res.json();
    return { rating: json.rating ?? 4.5 };
  } catch {
    return { rating: 4.5 };
  }
}

