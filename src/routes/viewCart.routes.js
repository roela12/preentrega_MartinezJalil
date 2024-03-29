import { Router } from "express";
import CartManagerDb from "../dao/mongoDb/managers/cartManager.js";

const ViewCartRouter = Router();
const cartsDb = new CartManagerDb();

// Renderizo la pagina con el carrito
ViewCartRouter.get("/", async (req, res) => {
  try {
    const cid = req.query.cid;
    const result = await cartsDb.getCartById(cid);
    const result2 = JSON.parse(JSON.stringify(result));
    res.render("cart", { title: "Cart", result2 });
  } catch (error) {
    console.log(error);
  }
});

export default ViewCartRouter;
