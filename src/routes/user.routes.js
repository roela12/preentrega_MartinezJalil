import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { useMulter } from "../utils.js";

const router = Router();

// Rutas

// Mostrar un usuario
router.get("/", userController.getUsers);

// Borrar un usuario
router.delete("/:uid", userController.deleteUser);

// Modificar el rol de un usuario
router.put("/modifyRole/:uid/role/:role", userController.modifyRole);

// Borrar usuarios inactivos por mas de dos dias
router.delete("/", userController.deleteInactiveUsers);

// Mejorar rol a premium
router.put("/premium/:uid", userController.changeToPremium);

// Subir documentos de usuario
router.post(
  "/:uid/documents",
  useMulter("documents").fields([
    { name: "identificacion", maxCount: 1 },
    { name: "comprobanteDomicilio", maxCount: 1 },
    { name: "comprobanteCuenta", maxCount: 1 },
  ]),
  userController.uploadDocument
);

// Recuperar contrasena
router.post("/recover-password", userController.recoverPassword);
router.get("/rescue-password/:token", userController.recoverPasswordToken);
router.post("/rescue-password", userController.updatePassword);

export default router;
