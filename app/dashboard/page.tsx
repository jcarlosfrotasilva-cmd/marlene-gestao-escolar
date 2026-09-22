const servidores = [
  { nome: 'Ana Souza', cargo: 'Professor de Ensino Médio', categoria: 'Efetivo', lotacao: 'Ensino Médio', situacao: 'Ativo' },
  { nome: 'Carlos Mendes', cargo: 'Agente de Organização Escolar', categoria: 'ACT-F', lotacao: 'Secretaria', situacao: 'Ativo' },
  { nome: 'Patrícia Alves', cargo: 'Secretário de Escola', categoria: 'Efetivo', lotacao: 'Diretoria', situacao: 'Ativo' },
  { nome: 'João Pereira', cargo: 'Auxiliar de Serviços', categoria: 'CTD', lotacao: 'Administração', situacao: 'Inativo' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary-700">Painel</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Dashboard operacional</h1>
        </div>
        <button className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
          Novo cadastro
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Ativos', value: '148' },
          { label: 'Inativos', value: '27' },
          { label: 'Efetivos', value: '92' },
          { label: 'ACT-F', value: '21' },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm text-slate-500">{label}</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Últimos servidores cadastrados</h2>
          <button className="text-sm font-medium text-primary-700">Ver todos</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-600">
              <tr>
                <th className="pb-3 pr-4 font-medium">Nome</th>
                <th className="pb-3 pr-4 font-medium">Cargo</th>
                <th className="pb-3 pr-4 font-medium">Categoria</th>
                <th className="pb-3 pr-4 font-medium">Lotação</th>
                <th className="pb-3 font-medium">Situação</th>
              </tr>
            </thead>
            <tbody>
              {servidores.map((servidor) => (
                <tr key={servidor.nome} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-800">{servidor.nome}</td>
                  <td className="py-3 pr-4 text-slate-600">{servidor.cargo}</td>
                  <td className="py-3 pr-4 text-slate-600">{servidor.categoria}</td>
                  <td className="py-3 pr-4 text-slate-600">{servidor.lotacao}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${servidor.situacao === 'Ativo' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                      {servidor.situacao}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
