import express from "express";
import { createTodoController, getAllTodoController } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.get("/", getAllTodoController);
postRouter.post("/", createTodoController);

export default postRouter;
