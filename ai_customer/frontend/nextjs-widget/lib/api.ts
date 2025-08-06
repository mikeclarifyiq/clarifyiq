export async function askCustomer(mode: 'my' | 'market', question: string) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode, question }),
  });
  if (!res.ok) {
    throw new Error('Request failed');
  }
  return res.json();
}
