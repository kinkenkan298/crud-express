import { Router } from "express";
import { MahasiswaController } from "@/controllers/mahasiswaController";
import { asyncHandler } from "@/middlewares/asyncHandler";

const mahasiswaRoutes = Router();

// GET /mahasiswa - Get all mahasiswa
mahasiswaRoutes.get("/", asyncHandler(MahasiswaController.getAll));

// GET /mahasiswa/:id - Get mahasiswa by ID
mahasiswaRoutes.get("/:id", asyncHandler(MahasiswaController.getById));

// POST /mahasiswa - Create new mahasiswa
mahasiswaRoutes.post("/", asyncHandler(MahasiswaController.create));

// PUT /mahasiswa/:id - Update mahasiswa
mahasiswaRoutes.put("/:id", asyncHandler(MahasiswaController.update));

// DELETE /mahasiswa/:id - Delete mahasiswa
mahasiswaRoutes.delete("/:id", asyncHandler(MahasiswaController.delete));

export { mahasiswaRoutes };
