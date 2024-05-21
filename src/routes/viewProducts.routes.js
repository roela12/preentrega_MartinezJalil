import { Router } from "express";
import ProductManager from "../dao/mongoDb/services/product.service.js";
import { auth } from "../middlewares/auth.js";
import userRepository from "../repositories/user.repository.js";

const router = Router();
const products = new ProductManager();

// Renderizo la pagina con todos los productos
router.get("/", auth, async (req, res) => {
  try {
    const user = userRepository.createUser(req.session.user);
    const result = await products.getAll(req, res);
    res.render("home", {
      title: "Tienda de productos",
      result,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
});

export default router;
