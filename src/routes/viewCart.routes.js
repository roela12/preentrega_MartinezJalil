import { Router } from "express";
import CartManager from "../dao/mongoDb/services/cart.service.js";

const router = Router();
const carts = new CartManager();

// Renderizo la pagina con el carrito
router.get("/", async (req, res) => {
  try {
    const cid = req.query.cid;
    const result = await carts.getCartById(cid);
    const result2 = JSON.parse(JSON.stringify(result));
    res.render("cart", { title: "Cart", result2 });
  } catch (error) {
    console.log(error);
  }
});

export default router;
