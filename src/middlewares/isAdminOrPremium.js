import CustomError from "../errors/customError.js";
import errorTypes from "../errors/errorTypes.js";
import { validateToken } from "../utils.js";

export function isAdminOrPremium(req, res, next) {
  try {
    if (req.user || req.session.user) {
      if (
        req.session.user.role == "admin" ||
        req.user.role == "admin" ||
        req.session.user.role == "premium" ||
        req.user.role == "premium"
      ) {
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
      if (decoded.item.role == "admin" || decoded.item.role == "premium") {
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
