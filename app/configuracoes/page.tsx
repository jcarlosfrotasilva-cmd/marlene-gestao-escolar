import { BellRing, ChevronDown, MoonStar } from 'lucide-react';

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary-700">Configurações</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Parâmetros do sistema</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Preferências do painel</h2>
          <div className="mt-5 space-y-4">
            {[ 'Tema escuro', 'Notificações', 'Acesso de auditoria', 'Exportação automática' ].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                <span>{item}</span>
                <div className="flex items-center gap-3">
                  <MoonStar className="h-4 w-4 text-slate-400" />
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Notificações</h2>
          <div className="mt-5 space-y-4">
            {[
              'Importação concluída com avisos',
              'Servidor com vencimento de licença-prêmio',
              'Dados incompletos pendentes de revisão',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <BellRing className="h-4 w-4" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
