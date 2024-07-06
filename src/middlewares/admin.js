import { generateToken } from "../utils.js";

export function admin(req, res, next) {
  const { email, password } = req.body;
  if (email == "adminCoder@coder.com" && password === "adminCod3er123") {
    req.session.user = {
      first_name: "Admin",
      last_name: "",
      email: "adminCoder@coder.com",
      age: "edad de admin",
      role: "admin",
    };
    const token = generateToken(req.session.user);
    res
      .header("authorization", token)
      .status(200)
      .send({ status: "success", payload: req.session.user });
  } else {
    next();
  }
}
