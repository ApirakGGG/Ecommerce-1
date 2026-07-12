// services/prismaService.ts
import prisma from "@/libs/prismadb";

export const updateUserName = async (userId: string, newUserName: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { name: newUserName },
  });
};
