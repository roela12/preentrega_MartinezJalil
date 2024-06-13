import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

// Rutas

// Recuperar contrasena
router.post("/recover-password", userController.recoverPassword);
router.get("/rescue-password/:token", userController.recoverPasswordToken);
router.post("/rescue-password", userController.updatePassword);

export default router;
