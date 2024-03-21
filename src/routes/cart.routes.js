import { Router } from "express";
//import CartManager from "../dao/fileSystem/managers/cartManager.js";
import CartManagerDb from "../dao/mongoDb/managers/cartManager.js";

const CartRouter = Router();
//const carts = new CartManager();
const cartsDb = new CartManagerDb();

// Rutas

// Crear carrito
CartRouter.post("/", async (req, res) => {
  //res.send(await carts.addCart());
  res.send(await cartsDb.createCart());
});

//  Mostrar carrito por id
CartRouter.get("/:cid", async (req, res) => {
  const id = req.params.cid;
  //res.send(await carts.getCartById(id));
  res.send(await cartsDb.getCartById(id));
});

// Agregar producto al carrito de compras
CartRouter.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  //res.send(await carts.addProductToCart(cartId, productId));
  res.send(await cartsDb.addProduct(cartId, productId, 1));
});

export default CartRouter;
