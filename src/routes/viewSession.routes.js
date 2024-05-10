import { Router } from "express";

const router = Router();

// Renderizo la vista de registro
router.get("/register", (req, res) => {
  res.render("register");
});

// Renderizo la vista de inicio de sesion
router.get("/login", (req, res) => {
  res.render("login");
});

export default router;
