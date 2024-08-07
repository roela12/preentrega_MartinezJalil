import { userService } from "../repositories/services.js";
import { generateToken, validateToken, createHash } from "../utils.js";
import MailingService from "../services/mailing.js";
import CustomError from "../errors/customError.js";
import errorTypes from "../errors/errorTypes.js";
import userDTO from "../DTOs/user.dto.js";

const userController = {
  // Mostrar usuarios
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      let usersWithDto = [];
      users.forEach((user) => {
        usersWithDto.push(new userDTO(user));
      });
      if (!users) {
        CustomError.createError(
          "Users not found",
          "something went wrong",
          errorTypes.NOT_FOUND
        );
      }
      res.send(usersWithDto).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Mostrar usuarios por id
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await userService.getById(id);
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
  // Mostrar usuarios por email
  getByEmail: async (req, res, next) => {
    try {
      const email = req.params.email;
      const result = await userService.getByEmail(email);
      if (!result) {
        CustomError.createError(
          "User not found",
          "invalid user email",
          errorTypes.NOT_FOUND
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Recuperacion de contrasena
  recoverPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.getByEmail(email);
      if (!user) {
        CustomError.createError(
          "User not found",
          "invalid user email",
          errorTypes.NOT_FOUND
        );
      }
      const token = generateToken(user._id);
      const mailingService = new MailingService();
      const mail = await mailingService.sendSimpleMail({
        from: "Preentrega Martinez",
        to: user.email,
        subject: "Recuperacion de contraseña",
        html: `
          <div>
            <h1>Haz click en el siguiente enlace para recuperar tu contraseña</h1>
            <a href="http://localhost:8080/api/users/rescue-password/${token}">Recuperar contraseña</a>
          </div>`,
      });

      res.send(mail).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Recibo el token del usuario
  recoverPasswordToken: async (req, res, next) => {
    try {
      const token = req.params.token;
      const decoded = validateToken(token);
      if (!decoded) {
        CustomError.createError(
          "token expired",
          "token expired",
          errorTypes.BAD_REQUEST
        );
      }
      req.session.userId = decoded.userId;
      res.redirect("/rescue-password");
      res.status(200);
    } catch (error) {
      next(error);
    }
  },
  // Actualizar contrasena
  updatePassword: async (req, res, next) => {
    try {
      const { password } = req.body;
      const userId = req.session.userId;
      await userService.updatePassword(userId, createHash(password));
      res.send({ status: "success", message: "Password updated" }).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Mejorar rol a premium
  changeToPremium: async (req, res, next) => {
    try {
      const userId = req.params.uid;
      const user = await userService.changeToPremium(userId);
      if (user) {
        res
          .send({ status: "success", message: "User changed to premium" })
          .status(200);
      } else {
        CustomError.createError(
          "role not changed",
          "some documents are not uploaded",
          errorTypes.UNAUTHORIZED
        );
      }
    } catch (error) {
      next(error);
    }
  },
  // Subir documentos de usuario
  uploadDocument: async (req, res, next) => {
    try {
      const userId = req.params.uid;
      const files = req.files;
      const result = await userService.uploadDocument(userId, files);
      if (result) {
        res.send({ status: "success" }).status(200);
      } else {
        CustomError.createError(
          "User not found",
          "invalid user id",
          errorTypes.NOT_FOUND
        );
      }
      res.send({ status: "success" }).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Modificar rol
  modifyRole: async (req, res, next) => {
    try {
      const uid = req.params.uid;
      const newRole = req.params.role;
      const result = await userService.modifyRole(uid, newRole);
      if (result) {
        res.send({ status: "success" }).status(200);
      } else {
        CustomError.createError(
          "User not found",
          "invalid user id",
          errorTypes.NOT_FOUND
        );
      }
    } catch (error) {
      next(error);
    }
  },
  // Borrar usuario
  deleteUser: async (req, res, next) => {
    try {
      const uid = req.params.uid;
      const result = await userService.deleteUser(uid);
      if (result) {
        res.send({ status: "success" }).status(200);
      } else {
        CustomError.createError(
          "User not found",
          "invalid user id",
          errorTypes.NOT_FOUND
        );
      }
    } catch (error) {
      next(error);
    }
  },
  // Borrar usuarios inactivos por mas de dos dias
  deleteInactiveUsers: async (req, res, next) => {
    try {
      const result = await userService.deleteInactiveUsers();
      if (result) {
        res.send({ status: "success" }).status(200);
      } else {
        CustomError.createError(
          "User not found",
          "invalid user parameters",
          errorTypes.NOT_FOUND
        );
      }
    } catch (error) {
      next(error);
    }
  },
};
export default userController;
