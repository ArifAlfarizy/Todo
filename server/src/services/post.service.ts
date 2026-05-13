import { prisma } from "../lib/prisma.js";
import type { Todo } from "../types/todo.type.js";

export const getAllTodo = async (authorId: string) => {
  return prisma.post.findMany({
    where: {
      authorId,
    },
  });
};

export const getTodoById = async (id: number, authorId: string) => {
  return prisma.post.findFirst({
    where: {
      id,
      authorId,
    },
  });
};

export const createTodo = async (data: Todo) => {
  return prisma.post.create({ data });
};

export const updateTodo = async (
  id: number,
  title: string,
  content: string,
) => {
  return prisma.post.update({
    where: {
      id,
    },
    data: { title, content },
  });
};

export const deleteTodo = async (id: number,) => {
  return prisma.post.delete({
    where: {
      id,
    },
  });
};
