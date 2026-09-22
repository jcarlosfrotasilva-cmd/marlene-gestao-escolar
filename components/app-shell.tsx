import { BarChart3, Building2, Database, FileSpreadsheet, LayoutDashboard, ShieldCheck, Users, Settings, ArrowLeftRight } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Servidores', path: '/servidores', icon: Users },
  { label: 'Importar', path: '/importar', icon: FileSpreadsheet },
  { label: 'Relatórios', path: '/relatorios', icon: BarChart3 },
  { label: 'Configurações', path: '/configuracoes', icon: Settings },
  { label: 'Login', path: '/login', icon: ShieldCheck },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden min-h-[calc(100vh-3rem)] w-72 shrink-0 rounded-3xl border border-slate-200 bg-slate-900 p-5 text-slate-200 shadow-soft lg:block">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-500 text-lg font-bold text-white">
              M
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Marlene</p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Gestão Escolar</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map(({ label, path, icon: Icon }) => (
              <Link
                key={label}
                href={path}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/80 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary-500/20 p-2 text-primary-300">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Lotação</p>
                <p className="text-sm font-medium text-white">EE Profa. Marlene Frattini</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-3 text-sm text-slate-300">
            <Database className="h-4 w-4 text-primary-300" />
            Status: em desenvolvimento
          </div>
        </aside>

        <div className="w-full rounded-3xl bg-slate-50 p-3 md:p-5">
          <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <ArrowLeftRight className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Sistema</p>
                <h2 className="text-lg font-semibold text-slate-900">Marlene Gestão Escolar</h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                Perfil
              </button>
              <button className="rounded-xl bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700">
                Sair
              </button>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
