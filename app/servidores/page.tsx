import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

import { prisma } from '@/lib/prisma';
import { findColumnMap, sanitizeServerRow, validateServerRow } from '@/lib/validation';

export async function GET() {
  const servidores = await prisma.servidor.findMany({
    include: {
      cargo: true,
      categoria: true,
      lotacao: true,
      beneficios: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(servidores);
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    try {
      const formData = await request.formData();
      const file = formData.get('file');

      if (!(file instanceof File)) {
        return NextResponse.json({ message: 'Arquivo ausente.' }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

      if (!rows.length) {
        return NextResponse.json({ message: 'A planilha não contém registros.' }, { status: 400 });
      }

      const headers = Object.keys(rows[0] ?? {});
      const columnMap = findColumnMap(headers);
      const validRows = rows
        .map((row) => sanitizeServerRow(row, columnMap))
        .filter((row) => Object.values(row).some((value) => value !== ''));

      const seenCpfs = new Set<string>();
      const validations = validRows.map((row, index) =>
        validateServerRow(row, index + 2, seenCpfs),
      );

      return NextResponse.json({
        fileName: file.name,
        rows: validRows.length,
        validations,
        summary: {
          total: validations.length,
          success: validations.filter((item) => item.status === 'success').length,
          warnings: validations.filter((item) => item.status === 'warning').length,
          errors: validations.filter((item) => item.status === 'error').length,
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Não foi possível importar a planilha.', error: String(error) }, { status: 500 });
    }
  }

  try {
    const body = await request.json();

    const nome = String(body.nome ?? '').trim();
    const cpf = String(body.cpf ?? '').replace(/\D/g, '');

    if (!nome || !cpf) {
      return NextResponse.json({ message: 'Nome e CPF são obrigatórios.' }, { status: 400 });
    }

    const servidor = await prisma.servidor.create({
      data: {
        nome,
        cpf,
        rgcin: body.rgcin ? String(body.rgcin) : null,
        dtnasc: body.dtnasc ? new Date(body.dtnasc) : null,
        sexo: body.sexo ? String(body.sexo) : null,
        tel: body.tel ? String(body.tel) : null,
        email: body.email ? String(body.email) : null,
        faixa: body.faixa ? String(body.faixa) : null,
        nivel: body.nivel ? String(body.nivel) : null,
        jornada: body.jornada ? String(body.jornada) : null,
        situacao: body.situacao ? String(body.situacao) : 'Ativo',
        cargo: body.cargo ? { create: { nome: String(body.cargo) } } : undefined,
        categoria: body.categoria ? { create: { nome: String(body.categoria) } } : undefined,
        lotacao: body.lotacao ? { create: { nome: String(body.lotacao) } } : undefined,
      },
      include: {
        cargo: true,
        categoria: true,
        lotacao: true,
      },
    });

    return NextResponse.json(servidor, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Não foi possível cadastrar o servidor.' }, { status: 500 });
  }
}
