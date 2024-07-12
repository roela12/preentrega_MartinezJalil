import userDTO from "../DTOs/user.dto.js";
import CustomError from "../errors/customError.js";
import errorTypes from "../errors/errorTypes.js";
import { generateToken } from "../utils.js";
import userModel from "../DAOs/mongo/models/user.model.js";

const sessionController = {
  // Registro
  register: async (req, res) => {
    res.status(201).send({ status: "success", message: "Usuario registrado" });
  },
  registerError: async (req, res) => {
    res.send({ error: "Falló" });
  },
  // Inicio de sesion
  login: async (req, res, next) => {
    try {
      if (!req.user) {
        CustomError.createError(
          "User not found",
          "invalid credentials",
          errorTypes.NOT_FOUND
        );
      }
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        cart: req.user.cart,
      };
      const user = await userModel.findOne({ email: req.user.email });
      user.last_connection = new Date();
      await user.save();
      const token = generateToken(req.session.user);
      res
        .header("authorization", token)
        .status(200)
        .send({ status: "success", payload: req.session.user });
    } catch (error) {
      next(error);
    }
  },
  loginError: async (req, res) => {
    res.send({ error: "Fallo" });
  },
  // Inicio de sesion con github
  loginGithub: async (req, res) => {
    res.status(200).send({ status: "success" });
  },
  callbackGithub: async (req, res) => {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      cart: req.user.cart,
    };

    res.redirect("/");
  },
  // Cierre de sesion
  logout: async (req, res) => {
    try {
      // const user = await userModel.findOne({ email: req.user.email });
      // user.last_connection = new Date();
      // await user.save();
      req.session.destroy();
      res.status(200).send({ status: "success" });
    } catch (error) {
      res.status(400).send({ status: "error" });
    }
  },
  current: (req, res) => {
    const user = new userDTO(req.session.user);
    res.render("current", {
      title: "Sesion actual",
      user,
    });
  },
};

export default sessionController;
