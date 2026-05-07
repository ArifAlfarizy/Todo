import { getAllTodo } from "../services/post.service.js";
import type { Request, Response } from "express";

export const getAllTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    if (userId) {
      return res.status(400).json({ message: "User not found!" });
    }

    const todos = getAllTodo(userId);

    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (err) {
    console.error("error", err);
  }
};
