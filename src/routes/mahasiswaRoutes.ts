import { Router } from "express";
import { MahasiswaController } from "@/controllers/mahasiswaController";
import { asyncHandler } from "@/middlewares/asyncHandler";

const mahasiswaRoutes = Router();

mahasiswaRoutes.get("/", asyncHandler(MahasiswaController.getAll));

mahasiswaRoutes.get("/:id", asyncHandler(MahasiswaController.getById));

mahasiswaRoutes.post("/", asyncHandler(MahasiswaController.create));

mahasiswaRoutes.put("/:id", asyncHandler(MahasiswaController.update));

mahasiswaRoutes.delete("/:id", asyncHandler(MahasiswaController.delete));

export { mahasiswaRoutes };
