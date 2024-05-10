import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";
import { admin } from "../middlewares/admin.js";

const router = Router();

// Logica de registro
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  sessionController.register
);

// Ruta de error de registro
router.get("/failregister", sessionController.registerError);

// Logica de inicio de sesion con passport
router.post(
  "/login",
  admin,
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  sessionController.login
);

// Ruta de error de inicio de sesion
router.get("/faillogin", sessionController.loginError);

// Logica de inicio de sesion con passport y github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  sessionController.loginGithub
);

// Ruta de callback de inicio de sesion con github
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  sessionController.callbackGithub
);

// Logica de cierre de sesion
router.delete("/logout", sessionController.logout);

// Renderizo la vista que muestra el usuario actual
router.get("/current", sessionController.current);

export default router;
