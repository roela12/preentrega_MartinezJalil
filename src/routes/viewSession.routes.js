import { Router } from "express";

const ViewSessionRouter = Router();

// Renderizo la vista de registro
ViewSessionRouter.get("/register", (req, res) => {
  res.render("register");
});

// Renderizo la vista de inicio de sesion
ViewSessionRouter.get("/login", (req, res) => {
  res.render("login");
});

export default ViewSessionRouter;
