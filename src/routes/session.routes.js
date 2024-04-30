import { Router } from "express";
import passport from "passport";
import { admin } from "../middlewares/admin.js";

const SessionRouter = Router();

// Logica de registro
SessionRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.status(201).send({ status: "success", message: "Usuario registrado" });
  }
);
// Ruta de error de registro
SessionRouter.get("/failregister", async (req, res) => {
  console.log("error");
  res.send({ error: "Falló" });
});

// Logica de inicio de sesion con passport
SessionRouter.post(
  "/login",
  admin,
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user) return res.status(400).send("error");
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      cart: req.user.cart,
    };
    res.status(200).send({ status: "success", payload: req.user });
  }
);
// Ruta de error de inicio de sesion
SessionRouter.get("/faillogin", async (req, res) => {
  console.log("error");
  res.send({ error: "Fallo" });
});

// Logica de inicio de sesion con passport y github
SessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    res.status(200).send({ status: "success" });
  }
);
// Ruta de callback de inicio de sesion con github
SessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      cart: req.user.cart,
    };

    res.redirect("/");
  }
);

// Logica de cierre de sesion
SessionRouter.delete("/logout", async (req, res) => {
  try {
    req.session.destroy;
    console.log("sesion cerrada");
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(400).send({ status: "error" });
  }
});

// Renderizo la vista que muestra el usuario actual
SessionRouter.get("/current", (req, res) => {
  const user = req.session.user;
  res.render("current", {
    title: "Sesion actual",
    user,
  });
});

export default SessionRouter;
