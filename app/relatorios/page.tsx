"use client";

import { useEffect, useMemo, useState } from 'react';

type Summary = {
  total: number;
  ativos: number;
  inativos: number;
  categorias: Record<string, number>;
  jornadas: Record<string, number>;
  alertas: Array<{ titulo: string; descricao: string; nivel: 'alto' | 'medio' | 'baixo' }>; 
};

export default function RelatoriosPage() {
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    ativos: 0,
    inativos: 0,
    categorias: {},
    jornadas: {},
    alertas: [],
  });

  useEffect(() => {
    async function loadSummary() {
      try {
        const [servidoresResponse, historicoResponse] = await Promise.all([
          fetch('/api/servidores'),
          fetch('/api/historico'),
        ]);

        const servidores = await servidoresResponse.json();
        const historico = await historicoResponse.json();

        const list = Array.isArray(servidores) ? servidores : [];
        const categorias: Record<string, number> = {};
        const jornadas: Record<string, number> = {};

        let ativos = 0;
        let inativos = 0;

        for (const item of list) {
          const categoria = item.categoria?.nome ?? 'Sem categoria';
          const jornada = item.jornada ?? 'Não informada';

          categorias[categoria] = (categorias[categoria] ?? 0) + 1;
          jornadas[jornada] = (jornadas[jornada] ?? 0) + 1;

          if (item.situacao === 'Ativo') ativos += 1;
          else inativos += 1;
        }

        const alertas = [
          {
            titulo: 'Benefícios pendentes',
            descricao: `${historico.length} registros de histórico funcional foram localizados.`,
            nivel: 'medio' as const,
          },
          {
            titulo: 'Dados incompletos',
            descricao: `${list.filter((item) => !item.email || !item.jornada).length} servidores possuem dados incompletos.`,
            nivel: 'alto' as const,
          },
          {
            titulo: 'Categoria predominante',
            descricao: `Maior concentração em ${Object.entries(categorias).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'}.`,
            nivel: 'baixo' as const,
          },
        ];

        setSummary({
          total: list.length,
          ativos,
          inativos,
          categorias,
          jornadas,
          alertas,
        });
      } catch {
        setSummary({
          total: 0,
          ativos: 0,
          inativos: 0,
          categorias: {},
          jornadas: {},
          alertas: [],
        });
      }
    }

    void loadSummary();
  }, []);

  const topCategorias = useMemo(
    () => Object.entries(summary.categorias).sort((a, b) => b[1] - a[1]),
    [summary.categorias],
  );

  const topJornadas = useMemo(
    () => Object.entries(summary.jornadas).sort((a, b) => b[1] - a[1]),
    [summary.jornadas],
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary-700">Relatórios</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Painel executivo</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm text-slate-500">Total de servidores</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{summary.total}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm text-slate-500">Ativos</p>
          <p className="mt-3 text-3xl font-bold text-emerald-700">{summary.ativos}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm text-slate-500">Inativos</p>
          <p className="mt-3 text-3xl font-bold text-slate-700">{summary.inativos}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm text-slate-500">Alertas</p>
          <p className="mt-3 text-3xl font-bold text-amber-700">{summary.alertas.length}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Distribuição por categoria</h2>
          <div className="mt-5 space-y-4">
            {topCategorias.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Sem dados no momento.</div>
            ) : (
              topCategorias.map(([categoria, total]) => {
                const percent = summary.total ? (total / summary.total) * 100 : 0;
                return (
                  <div key={categoria}>
                    <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                      <span>{categoria}</span>
                      <span>{total}</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-primary-500" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Alertas e pendências</h2>
          <div className="mt-5 space-y-3">
            {summary.alertas.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Nenhum alerta pendente.</div>
            ) : (
              summary.alertas.map((alerta) => (
                <div key={alerta.titulo} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-slate-900">{alerta.titulo}</h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        alerta.nivel === 'alto'
                          ? 'bg-rose-50 text-rose-700'
                          : alerta.nivel === 'medio'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {alerta.nivel}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{alerta.descricao}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">Jornada por servidor</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {topJornadas.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Sem dados de jornada.</div>
          ) : (
            topJornadas.map(([jornada, total]) => (
              <div key={jornada} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{jornada}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{total}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
