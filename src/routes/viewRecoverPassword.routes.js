import { Router } from "express";

const router = Router();

// Renderizo la vista de cambio de contrasena
router.get("/recover-password", (req, res) => {
  res.render("recoverPassword");
});

// Renderizo la vista de cambio de contrasena
router.get("/rescue-password", (req, res) => {
  res.render("rescuePassword");
});

export default router;
