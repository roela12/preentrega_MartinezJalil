export function isUser(req, res, next) {
  try {
    if (req.user) {
      if (req.user.role == "user") {
        next();
      } else {
        console.log("acceso no autorizado");
        res.status(401).send({ status: "error" });
      }
    } else {
      console.log("acceso no autorizado");
    }
  } catch (error) {
    console.log(error);
  }
}
