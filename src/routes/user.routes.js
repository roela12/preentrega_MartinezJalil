import { Router } from "express";
import passport from "passport";
import userController from "../controllers/user.controller.js";
import { admin } from "../middlewares/admin.js";

const router = Router();

// Logica de registro
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  userController.register
);

// Ruta de error de registro
router.get("/failregister", userController.registerError);

// Logica de inicio de sesion con passport
router.post(
  "/login",
  admin,
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  userController.login
);

// Ruta de error de inicio de sesion
router.get("/faillogin", userController.loginError);

// Logica de inicio de sesion con passport y github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  userController.loginGithub
);

// Ruta de callback de inicio de sesion con github
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  userController.callbackGithub
);

// Logica de cierre de sesion
router.delete("/logout", userController.logout);

// Renderizo la vista que muestra el usuario actual
router.get("/current", userController.current);

export default router;
