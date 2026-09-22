import { Activity, ArrowUpRight, BellRing, FileSpreadsheet, GraduationCap, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

const summaryCards = [
  { label: 'Servidores ativos', value: '148', detail: '+12% este mês', icon: Users, tone: 'primary' },
  { label: 'Benefícios vigentes', value: '63', detail: 'em análise', icon: ShieldCheck, tone: 'emerald' },
  { label: 'Alertas gerais', value: '08', detail: 'pendências', icon: BellRing, tone: 'amber' },
  { label: 'Importações', value: '24', detail: 'processadas', icon: FileSpreadsheet, tone: 'slate' },
];

const workflowSteps = [
  { title: 'Cadastro', description: 'Cadastro de servidores, vínculo, lotação e dados pessoais.', accent: 'bg-primary-500' },
  { title: 'Regras', description: 'Configuração de categorias, benefícios e direito funcional.', accent: 'bg-emerald-500' },
  { title: 'Histórico', description: 'Acompanhamento do histórico e observações por funcionário.', accent: 'bg-violet-500' },
  { title: 'Relatórios', description: 'Dashboard executivo com indicadores e alertas.', accent: 'bg-amber-500' },
];

export default function DashboardPage() {
  return (
    <main className="space-y-8">
      <section className="overflow-hidden rounded-[30px] bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 p-8 text-white shadow-[0_24px_70px_rgba(79,70,229,0.35)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary-100">
              <Activity className="h-4 w-4" />
              Dashboard executivo
            </span>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Gestão escolar em um só painel</h1>
            <p className="max-w-xl text-sm text-primary-50 md:text-base">
              Acompanhe servidores, regras, benefícios, histórico e indicadores institucionais de forma centralizada.
            </p>
          </div>

          <Link
            href="/relatorios"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Ver relatórios
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(({ label, value, detail, icon: Icon, tone }) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  tone === 'primary'
                    ? 'bg-primary-50 text-primary-700'
                    : tone === 'emerald'
                      ? 'bg-emerald-50 text-emerald-700'
                      : tone === 'amber'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-xs font-medium text-slate-500">{detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Fluxo principal</h2>
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">Operação</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {workflowSteps.map(({ title, description, accent }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className={`${accent} mb-3 h-2.5 w-12 rounded-full`} />
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Resumo institucional</h2>
            <GraduationCap className="h-5 w-5 text-primary-600" />
          </div>

          <div className="space-y-4 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Objetivo</p>
              <p className="mt-2 leading-6">Centralizar o controle administrativo, funcional e documental dos servidores da escola.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Cobertura</p>
              <p className="mt-2 leading-6">Cadastros, regras por categoria, histórico funcional, importação, relatórios e alertas.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Status</p>
              <p className="mt-2 leading-6">Base funcional pronta para acompanhamento institucional e refinamento final de regras.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
