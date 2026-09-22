"use client";

import { useState } from 'react';

import { useAuth } from '@/hooks/use-auth';

export function AdminLogin() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Erro no login.');
      }

      login({
        name: data.name,
        email: data.email,
        role: data.role,
      });

      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao conectar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">E-mail institucional</label>
        <input
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:bg-white"
          placeholder="admin@escola.gov.br"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Senha</label>
        <input
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:bg-white"
          placeholder="••••••••"
        />
      </div>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Entrando...' : 'Entrar no sistema'}
      </button>
    </form>
  );
}
