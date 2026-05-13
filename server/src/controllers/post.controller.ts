import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
} from "../services/post.service.js";
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

export const updateTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const id = Number(req.params.id);
    const { title, content } = req.body;

    const checkTodo = await getTodoById(id, userId);

    if (!checkTodo) {
      return res.status(409).json({
        message: "Forbidden",
      });
    }

    const updatedTodo = await updateTodo(id, title, content);

    res.status(200).json({
      success: true,
      data: updatedTodo,
    });
  } catch (err) {
    console.error("error", err);
  }
};

export const deleteTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const id = Number(req.params.id);

    const todo = await getTodoById(id, userId);

    if (!todo) {
      return res.status(409).json({
        message: "Forbidden",
      });
    }

    await deleteTodo(id);

    res.status(201).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.error("error", err);
  }
};

// Add user id validation
