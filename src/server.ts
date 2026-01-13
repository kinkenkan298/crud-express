import express, { type Express } from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CRUD Mahasiswa",
  });
});

app.use("/api", router);

app.use(errorHandler);

export { app };
