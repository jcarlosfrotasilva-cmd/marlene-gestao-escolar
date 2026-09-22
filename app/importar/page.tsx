export const expectedColumns = [
  'nome',
  'cpf',
  'rgcin',
  'dtnasc',
  'sexo',
  'tel',
  'email',
  'cargo',
  'categoria',
  'faixa',
  'nivel',
  'jornada',
  'lotacao',
  'situacao',
];

export const columnAliases: Record<string, string[]> = {
  nome: ['nome', 'nome completo', 'nome_completo'],
  cpf: ['cpf'],
  rgcin: ['rgcin', 'rg', 'cin'],
  dtnasc: ['dtnasc', 'data nascimento', 'dt_nasc'],
  sexo: ['sexo'],
  tel: ['tel', 'telefone', 'celular'],
  email: ['email', 'e-mail'],
  cargo: ['cargo', 'cargo atual'],
  categoria: ['categoria', 'vinculo', 'tipo de vínculo'],
  faixa: ['faixa'],
  nivel: ['nivel', 'nível'],
  jornada: ['jornada'],
  lotacao: ['lotacao', 'unidade', 'lotação'],
  situacao: ['situacao', 'status'],
};

export function normalizeText(value: unknown): string {
  return String(value ?? '').trim();
}

export function normalizeCpf(value: unknown): string {
  return normalizeText(value).replace(/\D/g, '');
}

export function normalizeEmail(value: unknown): string {
  return normalizeText(value).toLowerCase();
}

export function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function canonicalizeHeader(value: string): string {
  return normalizeText(value).toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function findColumnMap(headers: string[]): Record<string, string> {
  const map: Record<string, string> = {};

  for (const header of headers) {
    const normalizedHeader = canonicalizeHeader(header);

    for (const [target, aliases] of Object.entries(columnAliases)) {
      const aliasSet = aliases.map((alias) => canonicalizeHeader(alias));

      if (aliasSet.includes(normalizedHeader)) {
        map[target] = header;
        break;
      }
    }
  }

  return map;
}

export function sanitizeServerRow(row: Record<string, unknown>, columnMap: Record<string, string>) {
  const result: Record<string, string> = {};

  for (const key of Object.keys(columnMap)) {
    const sourceKey = columnMap[key];
    const rawValue = row[sourceKey] ?? '';
    const text = normalizeText(rawValue);
    result[key] = text;
  }

  result.nome = toTitleCase(result.nome || '');
  result.cpf = normalizeCpf(result.cpf);
  result.email = normalizeEmail(result.email);
  result.categoria = toTitleCase(result.categoria || '');
  result.cargo = toTitleCase(result.cargo || '');
  result.lotacao = toTitleCase(result.lotacao || '');
  result.situacao = normalizeText(result.situacao || 'Ativo').replace(/^\w/, (char) => char.toUpperCase());
  result.jornada = toTitleCase(result.jornada || '');

  return result;
}

export function validateServerRow(
  row: Record<string, string>,
  index: number,
  seenCpfs: Set<string>,
) {
  const errors: string[] = [];
  const warnings: string[] = [];

  const nome = normalizeText(row.nome);
  const cpf = normalizeCpf(row.cpf);
  const cargo = normalizeText(row.cargo);
  const categoria = normalizeText(row.categoria);
  const situacao = normalizeText(row.situacao) || 'Ativo';

  if (!nome) {
    errors.push('Nome ausente');
  }

  if (!cpf || cpf.length !== 11) {
    errors.push('CPF inválido ou vazio');
  } else if (seenCpfs.has(cpf)) {
    errors.push('CPF duplicado');
  } else {
    seenCpfs.add(cpf);
  }

  if (!cargo) {
    errors.push('Cargo ausente');
  }

  if (!categoria) {
    errors.push('Categoria ausente');
  }

  if (!row.email) {
    warnings.push('E-mail não informado');
  }

  if (!row.jornada) {
    warnings.push('Jornada não informada');
  }

  if (!row.lotacao) {
    warnings.push('Lotação não informada');
  }

  if (!['Ativo', 'Inativo'].includes(situacao)) {
    warnings.push('Situação fora do padrão: Ativo ou Inativo');
  }

  return {
    index,
    nome,
    cpf,
    cargo,
    categoria,
    situacao,
    warnings,
    errors,
    status: errors.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'success',
  };
}
