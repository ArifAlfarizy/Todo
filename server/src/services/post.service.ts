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

export const updateTodo = async (id: number, data: Todo) => {
  return prisma.post.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteTodo = async (id: number) => {
  return prisma.post.delete({
    where: {
      id,
    },
  });
};
