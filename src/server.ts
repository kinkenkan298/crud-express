import express, { type Express } from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import path from "path";

const app: Express = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api", router);

app.use(errorHandler);

export { app };
