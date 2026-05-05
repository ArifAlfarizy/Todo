import express from "express";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
