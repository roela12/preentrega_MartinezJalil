import CustomError from "../errors/customError.js";
import errorTypes from "../errors/errorTypes.js";
import { validateToken } from "../utils.js";

export function isUser(req, res, next) {
  try {
    if (req.user) {
      if (req.user.role == "user") {
        next();
      } else {
        CustomError.createError(
          "Not authorized user",
          "invalid role",
          errorTypes.UNAUTHORIZED
        );
      }
    } else if (req.headers.authorization) {
      const token = req.headers.authorization;
      const decoded = validateToken(token);
      if (decoded.item.role == "user") {
        next();
      } else {
        CustomError.createError(
          "Not authorized user",
          "invalid role",
          errorTypes.UNAUTHORIZED
        );
      }
    } else {
      CustomError.createError(
        "Not authorized user",
        "invalid role",
        errorTypes.UNAUTHORIZED
      );
    }
  } catch (error) {
    next(error);
  }
}
