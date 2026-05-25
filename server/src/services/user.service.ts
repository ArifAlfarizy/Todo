import { prisma } from "../lib/prisma.js";
import type { User, CreateUser } from "../types/user.type.js";

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany({});
};

export const createUser = async (data: CreateUser) => {
  return prisma.user.create({ data });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};