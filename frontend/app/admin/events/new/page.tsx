'use client';

import { useState, FormEvent } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const JSON_PLACEHOLDERS = {
  organizers: `[{ "name": "...", "title": "..." }]`,
  speakers:   `[{ "name": "...", "title": "..." }]`,
  partners:   `[{ "name": "...", "title": "..." }]`,
  schedule:   `[{ "time": "1:00 PM - 1:30 PM", "activity": "..." }]`,
};

export default function NewEventPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = new FormData(e.currentTarget);

    const parseJSON = (key: string) => {
      const raw = form.get(key) as string;
      if (!raw.trim()) return undefined;
      try { return JSON.parse(raw); }
      catch { throw new Error(`Invalid JSON in "${key}"`); }
    };

    try {
      const body = {
        title:       form.get('title'),
        date:        form.get('date'),
        month:       form.get('month'),
        type:        form.get('type'),
        brief:       form.get('brief'),
        description: form.get('description'),
        location:    form.get('location'),
        capacity:    form.get('capacity') ? Number(form.get('capacity')) : undefined,
        duration:    form.get('duration') || undefined,
        timeframe:   form.get('timeframe') || undefined,
        lumaUrl:     form.get('lumaUrl') || undefined,
        organizers:  parseJSON('organizers'),
        speakers:    parseJSON('speakers'),
        partners:    parseJSON('partners'),
        schedule:    parseJSON('schedule'),
      };

      const res = await fetch(`${API}/events/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail ?? `HTTP ${res.status}`);
      }

      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  }

  const field = (label: string, name: string, type = 'text', required = false) => (
    <div>
      <label>{label}{required && ' *'}</label><br />
      <input name={name} type={type} required={required} style={{ width: '100%' }} />
    </div>
  );

  const textarea = (label: string, name: string, placeholder?: string) => (
    <div>
      <label>{label} (JSON)</label><br />
      <textarea name={name} rows={4} placeholder={placeholder} style={{ width: '100%', fontFamily: 'monospace' }} />
    </div>
  );

  return (
    <main style={{ maxWidth: 640, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>New Event</h1>

      {status === 'success' && <p style={{ color: 'green' }}>Event created.</p>}
      {status === 'error'   && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {field('Title', 'title', 'text', true)}
        {field('Date (e.g. April, 2026)', 'date', 'text', true)}
        {field('Month', 'month', 'text', true)}
        {field('Type', 'type', 'text', true)}
        {field('Brief', 'brief', 'text', true)}

        <div>
          <label>Description *</label><br />
          <textarea name="description" rows={3} required style={{ width: '100%' }} />
        </div>

        {field('Location', 'location', 'text', true)}
        {field('Capacity', 'capacity', 'number')}
        {field('Duration', 'duration')}
        {field('Timeframe', 'timeframe')}
        {field('Luma URL', 'lumaUrl')}

        {textarea('Organizers', 'organizers', JSON_PLACEHOLDERS.organizers)}
        {textarea('Speakers',   'speakers',   JSON_PLACEHOLDERS.speakers)}
        {textarea('Partners',   'partners',   JSON_PLACEHOLDERS.partners)}
        {textarea('Schedule',   'schedule',   JSON_PLACEHOLDERS.schedule)}

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting…' : 'Create Event'}
        </button>
      </form>
    </main>
  );
}
