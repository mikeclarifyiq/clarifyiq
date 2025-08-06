'use client';

import { useState } from 'react';
import { askCustomer } from '../lib/api';

export default function ChatDock() {
  const [mode, setMode] = useState<'my' | 'market'>('my');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input) return;
    setLoading(true);
    try {
      const res = await askCustomer(mode, input);
      setMessages((m) => [...m, `You: ${input}`, `AI (${mode}): ${res.answer}`]);
      setInput('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border p-2">
      <div className="mb-2 space-x-2">
        <button onClick={() => setMode('my')} disabled={mode === 'my'}>My Customer</button>
        <button onClick={() => setMode('market')} disabled={mode === 'market'}>Market</button>
      </div>
      <div className="h-48 overflow-y-auto mb-2">
        {messages.map((m, i) => (<p key={i}>{m}</p>))}
      </div>
      <div className="flex space-x-2">
        <input className="flex-1 border" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={send} disabled={loading}>{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  );
}
