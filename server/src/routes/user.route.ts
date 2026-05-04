import express from "express";
import {
  createUserController,
  getUsersController,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getUsersController);
userRouter.post("/", createUserController);
export default userRouter;
