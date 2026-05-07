import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodoController,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.get("/", getAllTodoController);
postRouter.post("/", createTodoController);
postRouter.delete("/:id", deleteTodoController);

export default postRouter;
