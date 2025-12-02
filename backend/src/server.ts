import express from "express";
import userRouter from "./routes/users.js";

const app = express();

app.use(express.json());

const port = 3000;

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`app on port ${port}`);
});
