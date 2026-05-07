import express from "express";
import { getAllTodoController } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.get("/:userId", getAllTodoController);

export default postRouter;
