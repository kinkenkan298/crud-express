import express, { type Express } from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "REST API CRUD - Express + Prisma + MongoDB",
    version: "1.0.0",
  });
});

// API Routes
app.use("/api", router);

// Error Handler (harus di paling bawah)
app.use(errorHandler);

export { app };
