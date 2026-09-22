import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
  const historico = await prisma.beneficioServidor.findMany({
    include: { servidor: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(historico);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const servidorId = String(body.servidorId ?? '').trim();
    const codigo = String(body.codigo ?? '').trim();
    const nome = String(body.nome ?? '').trim();

    if (!servidorId || !codigo || !nome) {
      return NextResponse.json({ message: 'Servidor, código e nome são obrigatórios.' }, { status: 400 });
    }

    const beneficio = await prisma.beneficioServidor.create({
      data: {
        servidorId,
        codigo,
        nome,
        descricao: body.descricao ? String(body.descricao) : null,
        ativo: body.ativo !== false,
        adquiridoEm: body.adquiridoEm ? new Date(body.adquiridoEm) : null,
        observacao: body.observacao ? String(body.observacao) : null,
      },
      include: { servidor: true },
    });

    return NextResponse.json(beneficio, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Não foi possível registrar o histórico.' }, { status: 500 });
  }
}
