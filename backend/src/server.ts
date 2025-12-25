import express from "express";
import cors from "cors";
import userRoutes from "./routes/users";

const app = express();
const port = 3000;

// Middleqware
app.use(express.json());

// Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
/* (Optional but safe) Express CORS middleware */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`app on port ${port}`);
});
