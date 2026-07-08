import { PrismaClient } from "@/prisma/generated/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client =
  globalThis.prisma ||
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;