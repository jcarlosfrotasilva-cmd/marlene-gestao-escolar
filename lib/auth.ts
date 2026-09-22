import { NextResponse } from 'next/server';

export function withAdminAuth(handler: (request: Request) => Promise<NextResponse>) {
  return async function guarded(request: Request) {
    const token = request.headers.get('cookie')?.match(/session_token=([^;]+)/)?.[1];

    if (!token) {
      return NextResponse.json({ message: 'Não autorizado.' }, { status: 401 });
    }

    return handler(request);
  };
}
