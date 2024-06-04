import userDTO from "../DTOs/user.dto.js";
import CustomError from "../errors/customError.js";
import errorTypes from "../errors/errorTypes.js";
import userService from "../services/user.service.js";

const user = new userService();

const userController = {
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
      res.status(200).send({ status: "success", payload: req.user });
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
  // Mostrar usuarios
  getUsers: async (req, res, next) => {
    try {
      const result = await user.getUsers();
      if (!result) {
        CustomError.createError(
          "Users not found",
          "something went wrong",
          errorTypes.NOT_FOUND
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Mostrar usuarios por id
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await user.getById(id);
      if (!result) {
        CustomError.createError(
          "User not found",
          "invalid user id",
          errorTypes.NOT_FOUND
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
