import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
  const rules = await prisma.regraVantagem.findMany({
    include: { categoria: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(
    rules.map((rule) => ({
      id: rule.id,
      codigo: rule.codigo,
      nome: rule.nome,
      descricao: rule.descricao,
      categoria: rule.categoria?.nome ?? 'Sem categoria',
      tipo: rule.tipo,
      ativo: rule.ativo,
      obrigatorio: rule.obrigatorio,
      valor: rule.valor,
      unidade: rule.unidade,
    })),
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const codigo = String(body.codigo ?? '').trim();
    const nome = String(body.nome ?? '').trim();
    const descricao = String(body.descricao ?? '').trim();
    const categoriaNome = String(body.categoria ?? '').trim();
    const tipo = String(body.tipo ?? 'beneficio');
    const valor = String(body.valor ?? '').trim();
    const obrigatorio = Boolean(body.obrigatorio);
    const ativo = Boolean(body.ativo ?? true);

    if (!nome || !codigo) {
      return NextResponse.json({ message: 'Código e nome são obrigatórios.' }, { status: 400 });
    }

    let categoria = null;

    if (categoriaNome) {
      categoria = await prisma.categoria.upsert({
        where: { nome: categoriaNome },
        update: {},
        create: { nome: categoriaNome },
      });
    }

    const regra = await prisma.regraVantagem.create({
      data: {
        codigo,
        nome,
        descricao: descricao || 'Regra funcional configurada pelo sistema.',
        categoriaId: categoria?.id ?? null,
        tipo,
        ativo,
        obrigatorio,
        valor: valor || 'Conforme normativa',
      },
      include: { categoria: true },
    });

    return NextResponse.json({
      id: regra.id,
      codigo: regra.codigo,
      nome: regra.nome,
      descricao: regra.descricao,
      categoria: regra.categoria?.nome ?? 'Sem categoria',
      tipo: regra.tipo,
      ativo: regra.ativo,
      obrigatorio: regra.obrigatorio,
      valor: regra.valor,
      unidade: regra.unidade,
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Não foi possível salvar a regra.' }, { status: 500 });
  }
}
