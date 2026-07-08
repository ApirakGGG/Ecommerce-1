import { User } from "@/prisma/generated/client";

export type SafeUser = Omit<User, "createAt" | "updateAT" | "emailVerified">
& {
    createAt: string;
    updateAT: string;
    emailVerified: string | null;
}