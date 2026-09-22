import { Users, UserPlus, FileSpreadsheet, Settings } from 'lucide-react';

const actions = [
  { title: 'Cadastro', description: 'Cadastrar e manter dados funcionais e pessoais', icon: UserPlus },
  { title: 'Servidores', description: 'Consultar, filtrar e editar registros', icon: Users },
  { title: 'Planilha', description: 'Importar e validar dados em Excel', icon: FileSpreadsheet },
  { title: 'Configuração', description: 'Gerenciar cargos, categorias e regras', icon: Settings },
];

export default function LoginPage() {
  return (
    <div className="grid min-h-[80vh] gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
          Acesso institucional
        </span>
        <h1 className="mt-5 text-3xl font-bold text-slate-900">Bem-vindo ao sistema</h1>
        <p className="mt-3 text-sm text-slate-600">
          Gerencie servidores, lotações, cargos, vantagens e dados cadastrais com segurança e organização.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {actions.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-base font-semibold text-slate-900">{title}</h2>
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-slate-900">Acessar painel</h2>
        <p className="mt-2 text-sm text-slate-500">Use suas credenciais para continuar.</p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">E-mail institucional</label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:bg-white"
              placeholder="usuario@escola.gov.br"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Senha</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-700">
            Entrar no sistema
          </button>
        </form>
      </div>
    </div>
  );
}
