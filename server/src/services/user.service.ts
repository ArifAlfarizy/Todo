import { prisma } from "../lib/prisma.js";
import type { User } from "../types/user.type.js";

export const getAllUsers = async () => {
  return prisma.user.findMany({})
}