export default function ServidoresPage() {
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
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
              placeholder="Buscar por nome, cargo ou lotação"
            />
          </div>
          <button className="rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700">
            Novo servidor
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Nome', 'Ana Souza'],
            ['CPF', '123.456.789-00'],
            ['Cargo', 'Professor de Ensino Médio'],
            ['Categoria', 'Efetivo'],
            ['Faixa', 'Faixa 3'],
            ['Nível', 'Nível 1'],
            ['Jornada', 'Integral'],
            ['Lotação', 'EE Profa. Marlene Frattini'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
