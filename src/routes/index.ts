import { Router } from "express";
import { mahasiswaRoutes } from "./mahasiswaRoutes";

const router = Router();

// Mount all routes
router.use("/mahasiswa", mahasiswaRoutes);

export { router };
