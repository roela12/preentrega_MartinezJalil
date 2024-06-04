import { Router } from "express";
import CartMongoDao from "../DAOs/mongo/cart.mongo.dao.js";

const router = Router();
const carts = new CartMongoDao();

// Renderizo la pagina con el carrito
router.get("/", async (req, res) => {
  try {
    const cid = req.query.cid;
    const result = await carts.getCartById(cid);
    const result2 = JSON.parse(JSON.stringify(result));
    res.render("cart", { title: "Cart", result2 });
  } catch (error) {
    res.send(error);
  }
});

export default router;
