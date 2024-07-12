import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { useMulter } from "../utils.js";

const router = Router();

// Rutas

// Recuperar contrasena
router.post("/recover-password", userController.recoverPassword);
router.get("/rescue-password/:token", userController.recoverPasswordToken);
router.post("/rescue-password", userController.updatePassword);
router.put("/premium/:uid", userController.changeToPremium);
router.post(
  "/:uid/documents",
  useMulter("documents").fields([
    { name: "identificacion", maxCount: 1 },
    { name: "comprobanteDomicilio", maxCount: 1 },
    { name: "comprobanteCuenta", maxCount: 1 },
  ]),
  userController.uploadDocument
);

export default router;
