"use client";

import { AlertTriangle, BadgeCheck, FileSpreadsheet, Upload, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

import {
  expectedColumns,
  findColumnMap,
  sanitizeServerRow,
  validateServerRow,
} from '@/lib/validation';

type ValidationRecord = ReturnType<typeof validateServerRow>;

const fallbackHeaders = expectedColumns;

export default function ImportarPage() {
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [report, setReport] = useState<ValidationRecord[]>([]);
  const [headers, setHeaders] = useState<string[]>(fallbackHeaders);
  const [fileName, setFileName] = useState<string>('');

  const summary = useMemo(() => {
    return {
      total: report.length,
      success: report.filter((item) => item.status === 'success').length,
      warnings: report.filter((item) => item.status === 'warning').length,
      errors: report.filter((item) => item.status === 'error').length,
    };
  }, [report]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFileName(file.name);

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

    if (!jsonRows.length) {
      setRows([]);
      setReport([]);
      setHeaders(fallbackHeaders);
      return;
    }

    const extractedHeaders = Object.keys(jsonRows[0] ?? {});
    const allHeaders = extractedHeaders.length ? extractedHeaders : fallbackHeaders;
    setHeaders(allHeaders);

    const columnMap = findColumnMap(allHeaders);
    const normalizedRows = jsonRows
      .map((rawRow) => sanitizeServerRow(rawRow, columnMap))
      .filter((row) => Object.values(row).some((value) => value !== ''));

    const seenCpfs = new Set<string>();
    const currentReport = normalizedRows.map((row, index) => validateServerRow(row, index + 2, seenCpfs));

    setRows(normalizedRows);
    setReport(currentReport);
  };

  const missingColumns = expectedColumns.filter((key) => !headers.some((header) => header.toLowerCase() === key));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary-700">Importação</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Planilha de cadastro</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-3xl border border-dashed border-primary-300 bg-primary-50 p-8 text-center shadow-soft">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-primary-700 shadow-sm">
            <Upload className="h-10 w-10" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-slate-900">Arraste ou selecione a planilha</h2>
          <p className="mt-2 text-sm text-slate-600">Arquivos .xlsx ou .xls com colunas padronizadas.</p>

          <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700">
            <FileSpreadsheet className="h-4 w-4" />
            Selecionar arquivo
            <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleUpload} />
          </label>

          {fileName ? (
            <div className="mt-5 rounded-2xl border border-primary-200 bg-white px-4 py-3 text-sm font-medium text-primary-700">
              Arquivo: {fileName}
            </div>
          ) : null}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-slate-900">Validação inteligente</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Linhas lidas</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{summary.total}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Válidas</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">{summary.success}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="text-sm text-amber-700">Avisos</p>
              <p className="mt-2 text-2xl font-bold text-amber-700">{summary.warnings}</p>
            </div>
            <div className="rounded-2xl bg-rose-50 p-4">
              <p className="text-sm text-rose-700">Erros</p>
              <p className="mt-2 text-2xl font-bold text-rose-700">{summary.errors}</p>
            </div>
          </div>

          {missingColumns.length > 0 ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Colunas ausentes: {missingColumns.join(', ')}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              Estrutura da planilha compatível com o sistema.
            </div>
          )}
        </div>
      </div>

      {report.length > 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Resultado da importação</h3>
            <button className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
              Confirmar importação
            </button>
          </div>

          <div className="space-y-3">
            {report.map((item) => (
              <div key={item.index} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {item.status === 'success' ? (
                      <BadgeCheck className="h-5 w-5 text-emerald-600" />
                    ) : item.status === 'warning' ? (
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-600" />
                    )}
                    <span className="text-sm font-medium text-slate-700">Linha {item.index}</span>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      item.status === 'success'
                        ? 'bg-emerald-50 text-emerald-700'
                        : item.status === 'warning'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {item.status === 'success' ? 'Válida' : item.status === 'warning' ? 'Aviso' : 'Erro'}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  {item.nome ? <p>Nome: {item.nome}</p> : null}
                  {item.cpf ? <p>CPF: {item.cpf}</p> : null}

                  {item.errors.length > 0 ? (
                    <ul className="list-disc space-y-1 pl-5 text-rose-700">
                      {item.errors.map((error) => <li key={error}>{error}</li>)}
                    </ul>
                  ) : null}

                  {item.warnings.length > 0 ? (
                    <ul className="list-disc space-y-1 pl-5 text-amber-700">
                      {item.warnings.map((warning) => <li key={warning}>{warning}</li>)}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
