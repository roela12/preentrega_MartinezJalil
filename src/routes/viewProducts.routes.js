import { Router } from "express";
import ProductDaoMongo from "../DAOs/mongo/product.mongo.dao.js";
import { auth } from "../middlewares/auth.js";
import userDTO from "../DTOs/user.dto.js";
import { generateProduct } from "../utils.js";

const router = Router();
const products = new ProductDaoMongo();

// Renderizo la pagina con todos los productos
router.get("/", auth, async (req, res) => {
  try {
    const user = new userDTO(req.session.user);
    const result = await products.getAll(req, res);
    let admin = false;
    if (req.session.user.role == "admin") {
      admin = true;
    }
    res.render("home", {
      title: "Tienda de productos",
      result,
      user,
      admin,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/mockingproducts", (req, res) => {
  try {
    let products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateProduct());
    }
    res.send(products);
  } catch (error) {
    res.send(error);
    return null;
  }
});

export default router;
