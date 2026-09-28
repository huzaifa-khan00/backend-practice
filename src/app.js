import express from "express";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome from the backend server!");
});
app.use("/users", usersRoutes);

export default app;
