import { prisma } from "../lib/prisma.js";
import type { Todo } from "../types/todo.type.js";

export const getAllTodo = async (authorId: string) => {
  return prisma.post.findMany({
    where: {
      authorId,
    },
  });
};

export const createTodo = async (data: Todo) => {
  return prisma.post.create({ data });
};

