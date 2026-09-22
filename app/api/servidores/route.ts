import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

import { findColumnMap, sanitizeServerRow, validateServerRow } from '@/lib/validation';

export async function POST(request: Request) {
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
    return NextResponse.json(
      { message: 'Não foi possível importar a planilha.', error: String(error) },
      { status: 500 },
    );
  }
}
