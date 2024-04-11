import { Router } from "express";
import userModel from "../dao/mongoDb/models/users.js";

const SessionRouter = Router();

// Logica de registro
SessionRouter.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const exist = await userModel.findOne({ email: email });
  if (exist) {
    return res
      .status(400)
      .send({ status: "error", error: "el correo ya existe" });
  }
  const user = {
    first_name,
    last_name,
    email,
    age,
    password,
  };
  const result = await userModel.create(user);
  res.status(201).send({ staus: "success", payload: result });
});

// Logica de inicio de sesion
SessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email == "adminCoder@coder.com" && password === "adminCod3er123") {
    req.session.user = {
      name: "Admin",
      email: "adminCoder@coder.com",
      age: "edad de admin",
      role: "admin",
    };
  } else {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ status: "error", error: "error de credenciales" });
    }
    const validarPass = user.password == password;
    if (!validarPass)
      return res
        .status(401)
        .send({ error: "error", message: "error de credenciales" });

    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: "user",
    };
  }
  res.send({
    status: "success",
    payload: req.session.user,
    message: "Inicio exitoso",
  });
});

// Logica de cierre de sesion
SessionRouter.get("/logout", async (req, res) => {
  req.session.destroy();
});

export default SessionRouter;
