import type { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
