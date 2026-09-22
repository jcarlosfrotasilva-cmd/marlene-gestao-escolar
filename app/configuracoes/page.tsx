"use client";

import { useEffect, useState } from 'react';

const defaultRules = [
  {
    codigo: 'ATS',
    nome: 'Adicional por Tempo de Serviço',
    descricao: 'Vantagem suplementar para servidores efetivos e ACT-F conforme normativa.',
    tipo: 'beneficio',
    ativo: true,
    obrigatorio: true,
    valor: 'Conforme legislação',
    unidade: 'regra',
    categoria: 'Efetivo',
  },
  {
    codigo: 'LICENCA_PREMIO',
    nome: 'Licença-prêmio',
    descricao: 'Direito a licença-prêmio para servidores efetivos e componentes legais.',
    tipo: 'beneficio',
    ativo: true,
    obrigatorio: true,
    valor: 'Conforme período',
    unidade: 'periodo',
    categoria: 'Efetivo',
  },
  {
    codigo: 'EVOLUCAO_FUNCIONAL',
    nome: 'Evolução funcional',
    descricao: 'Progressão funcional por méritos e critérios administrativos.',
    tipo: 'beneficio',
    ativo: true,
    obrigatorio: true,
    valor: 'Conforme escala',
    unidade: 'escala',
    categoria: 'Efetivo',
  },
];

export default function ConfiguracoesPage() {
  const [rules, setRules] = useState(defaultRules);
  const [categoria, setCategoria] = useState('Efetivo');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [codigo, setCodigo] = useState('');
  const [tipo, setTipo] = useState('beneficio');
  const [obrigatorio, setObrigatorio] = useState(true);
  const [valor, setValor] = useState('Conforme normativa');

  useEffect(() => {
    async function loadRules() {
      try {
        const response = await fetch('/api/configuracoes');
        const data = await response.json();

        if (Array.isArray(data)) {
          setRules(data);
        }
      } catch {
        setRules(defaultRules);
      }
    }

    void loadRules();
  }, []);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      codigo: codigo.trim() || `REG_${Date.now()}`,
      nome: nome.trim() || 'Nova regra',
      descricao: descricao.trim() || 'Regra funcional administrativa.',
      categoria,
      tipo,
      obrigatorio,
      valor,
      ativo: true,
    };

    try {
      const response = await fetch('/api/configuracoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Erro ao salvar regra.');
      }

      setRules((current) => [data, ...current]);
      setNome('');
      setDescricao('');
      setCodigo('');
      setValor('Conforme normativa');
      setTipo('beneficio');
      setObrigatorio(true);
    } catch {
      setRules((current) => [payload as any, ...current]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary-700">Configurações</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Regras funcionais e vantagens</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <form onSubmit={handleSave} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Adicionar regra</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Categoria</label>
              <select
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
              >
                <option value="Efetivo">Efetivo</option>
                <option value="ACT-F">ACT-F</option>
                <option value="CTD">CTD</option>
                <option value="Terceirizado">Terceirizado</option>
                <option value="Estagiário">Estagiário</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Código</label>
              <input
                value={codigo}
                onChange={(event) => setCodigo(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
                placeholder="ATS, LICENCA_PREMIO..."
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nome da regra</label>
              <input
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
                placeholder="Adicional por tempo de serviço"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Descrição</label>
              <textarea
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                className="min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
                placeholder="Descreva a regra, o direito, a condição de concessão ou a norma aplicada."
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Tipo</label>
              <select
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
              >
                <option value="beneficio">Benefício</option>
                <option value="restricao">Restrição</option>
                <option value="norma">Norma</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Valor / observação</label>
              <input
                value={valor}
                onChange={(event) => setValor(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-400"
                placeholder="Conforme legislação, ou valor/periodo"
              />
            </div>

            <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <span>Obrigatório</span>
              <input
                type="checkbox"
                checked={obrigatorio}
                onChange={(event) => setObrigatorio(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Salvar regra
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Regras vigentes</h2>

          <div className="mt-5 space-y-4">
            {rules.map((rule) => (
              <div key={`${rule.codigo}-${rule.categoria}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{rule.codigo}</p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900">{rule.nome}</h3>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      rule.ativo ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {rule.ativo ? 'Ativa' : 'Inativa'}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-600">{rule.descricao}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-primary-50 px-2.5 py-1 text-primary-700">{rule.categoria}</span>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">{rule.tipo}</span>
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-violet-700">
                    {rule.obrigatorio ? 'Obrigatório' : 'Opcional'}
                  </span>
                </div>

                <div className="mt-3 text-sm text-slate-700">
                  <strong>Valor:</strong> {rule.valor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
