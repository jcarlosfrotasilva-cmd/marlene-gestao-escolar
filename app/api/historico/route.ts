'use client';

import { useEffect, useMemo, useState } from 'react';

type Servidor = {
  id: string;
  nome: string;
  cpf: string;
  categoria?: { nome: string } | null;
};

type Beneficio = {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string | null;
  ativo: boolean;
  adquiridoEm?: string | null;
  observacao?: string | null;
  servidor?: {
    id: string;
    nome: string;
    cpf: string;
  } | null;
};

const initialForm = {
  servidorId: '',
  codigo: 'ATS',
  nome: 'Adicional por Tempo de Serviço',
  descricao: 'Direito adquirido conforme o tempo de serviço e a categoria do servidor.',
  ativo: true,
  adquiridoEm: '',
  observacao: '',
};

export default function HistoricoPage() {
  const [servidores, setServidores] = useState<Servidor[]>([]);
  const [beneficios, setBeneficios] = useState<Beneficio[]>([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [servidoresResponse, historicoResponse] = await Promise.all([
          fetch('/api/servidores'),
          fetch('/api/historico'),
        ]);

        const servidoresData = await servidoresResponse.json();
        const historicoData = await historicoResponse.json();

        setServidores(Array.isArray(servidoresData) ? servidoresData : []);
        setBeneficios(Array.isArray(historicoData) ? historicoData : []);
      } catch {
        setServidores([]);
        setBeneficios([]);
      }
    }

    void loadData();
  }, []);

  const summary = useMemo(() => {
    return {
      total: beneficios.length,
      ativos: beneficios.filter((item) => item.ativo).length,
      inativos: beneficios.filter((item) => !item.ativo).length,
    };
  }, [beneficios]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/historico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          servidorId: form.servidorId,
          adquiridoEm: form.adquiridoEm || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Erro ao registrar histórico.');
      }

      setStatus('Histórico registrado com sucesso.');
      setForm(initialForm);

      const refresh = await fetch('/api/historico');
      const refreshed = await refresh.json();
      setBeneficios(Array.isArray(refreshed) ? refreshed : []);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Erro inesperado.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary-700">Histórico</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Histórico funcional e benefícios</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Registrar vantagem ou benefício</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Servidor</label>
              <select
                value={form.servidorId}
                onChange={(event) => setForm((current) => ({ ...current, servidorId: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
                required
              >
                <option value="">Selecione um servidor</option>
                {servidores.map((servidor) => (
                  <option key={servidor.id} value={servidor.id}>
                    {servidor.nome} — {servidor.cpf}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Código</label>
              <input
                value={form.codigo}
                onChange={(event) => setForm((current) => ({ ...current, codigo: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
                placeholder="ATS, LICENCA_PREMIO, EVOLUCAO_FUNCIONAL"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nome</label>
              <input
                value={form.nome}
                onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Descrição</label>
              <textarea
                value={form.descricao}
                onChange={(event) => setForm((current) => ({ ...current, descricao: event.target.value }))}
                className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Adquirido em</label>
                <input
                  type="date"
                  value={form.adquiridoEm}
                  onChange={(event) => setForm((current) => ({ ...current, adquiridoEm: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Ativo</label>
                <select
                  value={String(form.ativo)}
                  onChange={(event) => setForm((current) => ({ ...current, ativo: event.target.value === 'true' }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
                >
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Observação</label>
              <textarea
                value={form.observacao}
                onChange={(event) => setForm((current) => ({ ...current, observacao: event.target.value }))}
                className="min-h-[90px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
                placeholder="Detalhe a observação, normativa ou situação administrativa."
              />
            </div>

            {status ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {status}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Registrar histórico
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Resumo funcional</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{summary.total}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Ativos</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">{summary.ativos}</p>
            </div>
            <div className="rounded-2xl bg-slate-200 p-4">
              <p className="text-sm text-slate-700">Inativos</p>
              <p className="mt-2 text-2xl font-bold text-slate-700">{summary.inativos}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {beneficios.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Nenhum histórico registrado.</div>
            ) : (
              beneficios.map((beneficio) => (
                <div key={beneficio.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{beneficio.codigo}</p>
                      <h3 className="mt-1 text-base font-semibold text-slate-900">{beneficio.nome}</h3>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        beneficio.ativo ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {beneficio.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-slate-600">
                    <p>
                      <strong>Servidor:</strong> {beneficio.servidor?.nome ?? '—'}
                    </p>
                    <p>
                      <strong>CPF:</strong> {beneficio.servidor?.cpf ?? '—'}
                    </p>
                    {beneficio.adquiridoEm ? (
                      <p>
                        <strong>Adquirido em:</strong> {new Date(beneficio.adquiridoEm).toLocaleDateString('pt-BR')}
                      </p>
                    ) : null}
                    {beneficio.observacao ? (
                      <p>
                        <strong>Obs.:</strong> {beneficio.observacao}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
