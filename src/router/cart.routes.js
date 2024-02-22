import { Router } from "express";
import CartManager from "../components/CartManager.js";

const CartRouter = Router();
const carts = new CartManager();

// Rutas

// Crear carrito
CartRouter.post("/", async (req, res) => {
  res.send(await carts.addCart());
});

//  Mostrar carrito por id
CartRouter.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  res.send(await carts.getCartById(id));
});

// Agregar producto al carrito de compras
CartRouter.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await carts.addProductToCart(cartId, productId));
});

export default CartRouter;
