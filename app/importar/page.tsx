import { FileSpreadsheet, Upload, AlertTriangle, BadgeCheck } from 'lucide-react';

const checklist = [
  { label: 'Campos obrigatórios validados', icon: BadgeCheck },
  { label: 'Células vazias identificadas', icon: AlertTriangle },
  { label: 'CPFs duplicados detectados', icon: BadgeCheck },
];

export default function ImportarPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary-700">Importação</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Planilha de cadastro</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-dashed border-primary-300 bg-primary-50 p-8 text-center shadow-soft">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-primary-700 shadow-sm">
            <Upload className="h-10 w-10" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-slate-900">Arraste ou selecione a planilha</h2>
          <p className="mt-2 text-sm text-slate-600">Arquivos .xlsx ou .xls com colunas padronizadas.</p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700">
            <FileSpreadsheet className="h-4 w-4" />
            Selecionar arquivo
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-slate-900">Validação inteligente</h3>
          <div className="mt-5 space-y-4">
            {checklist.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary-700">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
