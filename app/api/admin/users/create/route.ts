import { compare, hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');
    const name = String(body.name ?? '').trim();
    const role = String(body.role ?? 'admin');

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Nome, e-mail e senha são obrigatórios.' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return NextResponse.json({ message: 'Usuário já existe.' }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Não foi possível criar o usuário.' }, { status: 500 });
  }
}
