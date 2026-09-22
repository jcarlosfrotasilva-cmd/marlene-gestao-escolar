import { ArrowRight, Building2, FileSpreadsheet, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';

const stats = [
  { label: 'Servidores ativos', value: '148', icon: Users, tone: 'blue' },
  { label: 'Efetivos', value: '92', icon: ShieldCheck, tone: 'green' },
  { label: 'Importações', value: '24', icon: FileSpreadsheet, tone: 'amber' },
  { label: 'Lotações', value: '08', icon: Building2, tone: 'violet' },
];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 p-8 text-white shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary-100">
              <LayoutDashboard className="h-4 w-4" />
              Visão geral
            </span>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Marlene Gestão Escolar</h1>
            <p className="max-w-xl text-sm text-primary-100 md:text-base">
              Sistema profissional para gestão de servidores, cargos, lotações, importação em Excel e controle de dados administrativos da EE Profa. Marlene Frattini.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary-100">Acessar painel</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
              </div>
              <div className={`rounded-xl p-3 ${tone === 'blue' ? 'bg-primary-50 text-primary-700' : tone === 'green' ? 'bg-emerald-50 text-emerald-700' : tone === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-violet-50 text-violet-700'}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Resumo de servidores</h3>
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">Últimos 30 dias</span>
          </div>

          <div className="space-y-5">
            {[
              { label: 'Efetivos', value: 92, percent: 62 },
              { label: 'ACT-F', value: 21, percent: 14 },
              { label: 'CTD', value: 15, percent: 10 },
              { label: 'Terceirizados', value: 12, percent: 8 },
              { label: 'Estagiários', value: 8, percent: 6 },
            ].map(({ label, value, percent }) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-primary-500" style={{ width: `${percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-slate-900">Ações rápidas</h3>
          <div className="mt-5 space-y-3">
            {[
              'Novo cadastro',
              'Importar planilha',
              'Relatórios',
              'Configurar vantagens',
            ].map((action) => (
              <button
                key={action}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
              >
                {action}
                <ArrowRight className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
