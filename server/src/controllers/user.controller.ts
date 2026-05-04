import type { Request, Response, NextFunction } from "express";
import { createUsers } from "../services/user.service.js";
import * as userService from "../services/user.service.js";
import { error } from "node:console";

export const getUsersController = async (
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

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await userService.createUsers(req.body);

    res.status(200).json(newUser);
  } catch (err) {
    console.error("error", err);
  }
};
