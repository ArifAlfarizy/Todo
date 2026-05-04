import { prisma } from "../lib/prisma.js";
import type { User, createUser } from "../types/user.type.js";

export const getAllUsers = async () => {
  return prisma.user.findMany({});
};

export const createUsers = async (data: createUser) => {
  return prisma.user.create({ data });
};
