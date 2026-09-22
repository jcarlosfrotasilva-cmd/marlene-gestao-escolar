import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAdmin() {
  const existing = await prisma.user.findUnique({
    where: { email: 'admin@marlene.local' },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@marlene.local',
        password: '$2a$10$gH4QvL0.nV2x.IQmEt31ku8ZhYcAaN8yNoYkI4bV7i3mVbNjlXrUa',
        role: 'admin',
      },
    });
  }
}
