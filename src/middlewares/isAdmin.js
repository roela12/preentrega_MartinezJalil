export function isAdmin(req, res, next) {
  try {
    if (req.user) {
      if (req.user.role == "admin") {
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
