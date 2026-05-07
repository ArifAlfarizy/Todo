import { createTodo, getAllTodo } from "../services/post.service.js";
import type { Request, Response } from "express";
import type { Todo } from "../types/todo.type.js";

export const getAllTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User not found!" });
    }

    const todos = await getAllTodo(userId);
    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (err) {
    console.error("error", err);
  }
};

export const createTodoController = async (
  req: Request<{}, {}, Todo>,
  res: Response,
) => {
  try {
    const userId = req.user.userId;
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const todo = await createTodo({
      title,
      content,
      authorId: userId,
    });

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (err) {
    console.error("error", err);
  }
};
