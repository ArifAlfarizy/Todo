import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodoController,
  updateTodoController,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.get("/", getAllTodoController);
postRouter.post("/", createTodoController);
postRouter.delete("/:id", deleteTodoController);
postRouter.patch("/:id", updateTodoController);

export default postRouter;
