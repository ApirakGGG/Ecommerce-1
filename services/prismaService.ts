// services/prismaService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateUserName = async (userId: string, newUserName: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { name: newUserName },
  });
};
