import { PrismaClient } from "@prisma/client";

declare global { 
    // allow global `var` declarations
    var prisma: PrismaClient | undefined;
 }

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
