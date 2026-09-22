import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'marlene-gestao-escolar',
    status: 'online',
    timestamp: new Date().toISOString(),
  });
}
