import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const backend = process.env.BACKEND_URL || 'http://localhost:8000';
  const r = await fetch(`${backend}/analysis/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });
  const data = await r.json();
  res.status(200).json(data);
}
