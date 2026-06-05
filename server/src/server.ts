import express from "express";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";
import cors from "cors";
import { verifyToken } from "./middlewares/jwt.middleware.js";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(
  cors({
   origin: ['http://localhost:3000', 'http://192.168.110.242:3000'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/post", verifyToken, postRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
