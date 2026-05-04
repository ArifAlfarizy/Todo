import type { Request, Response, NextFunction } from "express";
import type { createUsers } from "../services/user.service.js";
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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req.body;

    const newUser = await userService.createUsers(user);

    res.send(200).json(newUser);
  } catch (err) {}
};
