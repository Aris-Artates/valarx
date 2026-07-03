'use client';

import { useState, FormEvent } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const JSON_PLACEHOLDERS = {
  organizers: `[{ "name": "...", "title": "..." }]`,
  speakers:   `[{ "name": "...", "title": "..." }]`,
  partners:   `[{ "name": "...", "title": "..." }]`,
  schedule:   `[{ "time": "1:00 PM - 1:30 PM", "activity": "..." }]`,
};

const inputClass =
  'w-full rounded-lg border border-deepest bg-secondary px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink/70';

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
        startDate:   form.get('startDate') || undefined,
        endDate:     form.get('endDate') || undefined,
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
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="text-ink/40"> *</span>}
      </label>
      <input id={name} name={name} type={type} required={required} className={inputClass} />
    </div>
  );

  const textarea = (label: string, name: string, placeholder?: string) => (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label} <span className="text-ink/40">(JSON)</span>
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        className={`${inputClass} font-mono text-xs leading-5`}
      />
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-ink">New event</h1>
        <p className="text-sm text-ink/50">
          Creates an event through the backend API. Fields marked * are required.
        </p>
      </div>

      {status === 'success' && (
        <p role="status" className="mb-6 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-accent">
          Event created.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mb-6 rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm font-medium text-error">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {field('Title', 'title', 'text', true)}
        {field('Date (e.g. April, 2026)', 'date', 'text', true)}

        <div className="grid gap-5 sm:grid-cols-2">
          {field('Start date (enables countdown + live status)', 'startDate', 'date')}
          {field('End date (defaults to end of start day)', 'endDate', 'date')}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {field('Month', 'month', 'text', true)}
          {field('Type', 'type', 'text', true)}
        </div>

        {field('Brief', 'brief', 'text', true)}

        <div>
          <label htmlFor="description" className={labelClass}>
            Description<span className="text-ink/40"> *</span>
          </label>
          <textarea id="description" name="description" rows={3} required className={inputClass} />
        </div>

        {field('Location', 'location', 'text', true)}

        <div className="grid gap-5 sm:grid-cols-3">
          {field('Capacity', 'capacity', 'number')}
          {field('Duration', 'duration')}
          {field('Timeframe', 'timeframe')}
        </div>

        {field('Luma URL', 'lumaUrl')}

        {textarea('Organizers', 'organizers', JSON_PLACEHOLDERS.organizers)}
        {textarea('Speakers',   'speakers',   JSON_PLACEHOLDERS.speakers)}
        {textarea('Partners',   'partners',   JSON_PLACEHOLDERS.partners)}
        {textarea('Schedule',   'schedule',   JSON_PLACEHOLDERS.schedule)}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-lift mt-2 self-start rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-hover disabled:opacity-50"
        >
          {status === 'loading' ? 'Submitting…' : 'Create event'}
        </button>
      </form>
    </div>
  );
}
