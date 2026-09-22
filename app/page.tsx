import { BarChart3, LineChart, ShieldCheck, Users, BellRing, Download } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 p-8 text-white shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary-100">
              <BarChart3 className="h-4 w-4" />
              Dashboard executivo
            </span>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Indicadores gerais</h1>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium text-primary-100">Exportar relatório</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Servidores ativos', value: '148', icon: Users, tone: 'blue' },
          { label: 'Benefícios vigentes', value: '63', icon: ShieldCheck, tone: 'green' },
          { label: 'Alertas', value: '08', icon: BellRing, tone: 'amber' },
          { label: 'Lotações', value: '12', icon: LineChart, tone: 'violet' },
        ].map(({ label, value, icon: Icon, tone }) => (
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
    </main>
  );
}
