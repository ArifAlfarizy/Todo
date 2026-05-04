import express from "express";
import userRouter from "./routes/user.route.js";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("tes");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
