import express from "express";
import { getUsers } from "./controllers/user.controller.js";
const PORT = process.env.PORT || 5000;

const app = express();

app.use("/users", getUsers)

app.get("/", (req, res) => {
  res.send("tes");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
