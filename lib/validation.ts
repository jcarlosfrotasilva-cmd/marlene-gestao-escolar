import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
  const servidores = await prisma.servidor.findMany({
    include: {
      cargo: true,
      categoria: true,
      lotacao: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(servidores);
}

export async function POST(request: Request) {
  const body = await request.json();

  const servidor = await prisma.servidor.create({
    data: {
      nome: String(body.nome ?? '').trim(),
      cpf: String(body.cpf ?? '').replace(/\D/g, ''),
      rgcin: body.rgcin ? String(body.rgcin) : null,
      dtnasc: body.dtnasc ? new Date(body.dtnasc) : null,
      sexo: body.sexo ? String(body.sexo) : null,
      tel: body.tel ? String(body.tel) : null,
      email: body.email ? String(body.email) : null,
      faixa: body.faixa ? String(body.faixa) : null,
      nivel: body.nivel ? String(body.nivel) : null,
      jornada: body.jornada ? String(body.jornada) : null,
      situacao: body.situacao ? String(body.situacao) : 'Ativo',
    },
  });

  return NextResponse.json(servidor, { status: 201 });
}
