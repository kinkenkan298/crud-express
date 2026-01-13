import { Router } from "express";
import { mahasiswaRoutes } from "./mahasiswaRoutes";

const router = Router();

router.use("/mahasiswa", mahasiswaRoutes);

export { router };
