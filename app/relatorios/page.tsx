export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary-700">Relatórios</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Panorama administrativo</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          ['Servidores por categoria', 'Efetivo / ACT-F / CTD / Terceirizado'],
          ['Lotação por unidade', 'Diretoria, secretaria, ensino e apoio'],
          ['Vantagens e benefícios', 'ATS, licença-prêmio e evolução funcional'],
        ].map(([title, description]) => (
          <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-sm text-slate-600">{description}</p>
            <button className="mt-5 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700">
              Exportar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
