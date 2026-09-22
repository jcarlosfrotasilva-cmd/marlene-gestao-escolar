'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { ServidorForm } from '@/components/servidor-form';

type Servidor = {
  id: string;
  nome: string;
  cpf: string;
  rgcin?: string | null;
  email?: string | null;
  cargo?: { nome: string } | null;
  categoria?: { nome: string } | null;
  lotacao?: { nome: string } | null;
  jornada?: string | null;
  situacao?: string | null;
  beneficios?: Array<{ codigo: string; nome: string; ativo: boolean; adquiridoEm?: string | null }>;
};

export default function ServidoresPage() {
  const [servidores, setServidores] = useState<Servidor[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadServidores() {
    try {
      const response = await fetch('/api/servidores');
      const data = await response.json();
      setServidores(Array.isArray(data) ? data : []);
    } catch {
      setServidores([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadServidores();
  }, []);

  const filteredServidores = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return servidores;

    return servidores.filter((servidor) => {
      const haystack = [
        servidor.nome,
        servidor.cpf,
        servidor.rgcin ?? '',
        servidor.email ?? '',
        servidor.cargo?.nome ?? '',
        servidor.categoria?.nome ?? '',
        servidor.lotacao?.nome ?? '',
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [query, servidores]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary-700">Cadastro</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Servidores</h1>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
              placeholder="Buscar por nome, cargo, lotação ou CPF"
            />
          </div>
          <Link
            href="/historico"
            className="rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Histórico funcional
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Lista de servidores</h2>
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
              {filteredServidores.length} registros
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Carregando servidores...</div>
          ) : filteredServidores.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Nenhum servidor encontrado para os critérios informados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Nome</th>
                    <th className="pb-3 pr-4 font-medium">CPF</th>
                    <th className="pb-3 pr-4 font-medium">Cargo</th>
                    <th className="pb-3 pr-4 font-medium">Categoria</th>
                    <th className="pb-3 pr-4 font-medium">Lotação</th>
                    <th className="pb-3 font-medium">Vantagens</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServidores.map((servidor) => (
                    <tr key={servidor.id} className="border-b border-slate-100 last:border-0 align-top">
                      <td className="py-3 pr-4 font-medium text-slate-800">{servidor.nome}</td>
                      <td className="py-3 pr-4 text-slate-600">{servidor.cpf}</td>
                      <td className="py-3 pr-4 text-slate-600">{servidor.cargo?.nome ?? '—'}</td>
                      <td className="py-3 pr-4 text-slate-600">{servidor.categoria?.nome ?? '—'}</td>
                      <td className="py-3 pr-4 text-slate-600">{servidor.lotacao?.nome ?? '—'}</td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {(servidor.beneficios ?? []).slice(0, 3).map((beneficio) => (
                            <span
                              key={`${servidor.id}-${beneficio.codigo}`}
                              className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                                beneficio.ativo ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {beneficio.codigo}
                            </span>
                          ))}
                          {!servidor.beneficios?.length ? (
                            <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-medium text-slate-700">
                              Sem benefício
                            </span>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <ServidorForm onCreated={loadServidores} />
        </div>
      </div>
    </div>
  );
}
