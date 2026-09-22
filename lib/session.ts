import 'server-only';

import { cookies } from 'next/headers';

export async function createSessionToken(user: { id: string; email: string; role: string }) {
  const token = Buffer.from(`${user.id}:${user.email}:${user.role}`).toString('base64');
  cookies().set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return token;
}

export function deleteSessionToken() {
  cookies().delete('session_token');
}
