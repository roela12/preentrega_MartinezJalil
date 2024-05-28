import { Router } from "express";
import ProductDaoMongo from "../DAOs/mongo/product.mongo.dao.js";
import { auth } from "../middlewares/auth.js";
import userDTO from "../DTOs/user.dto.js";

const router = Router();
const products = new ProductDaoMongo();

// Renderizo la pagina con todos los productos
router.get("/", auth, async (req, res) => {
  try {
    const user = new userDTO(req.session.user);
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
