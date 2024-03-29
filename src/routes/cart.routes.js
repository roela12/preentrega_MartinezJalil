import { Router } from "express";
import CartManagerDb from "../dao/mongoDb/managers/cartManager.js";

const CartRouter = Router();
const cartsDb = new CartManagerDb();

// Rutas

// Crear carrito
CartRouter.post("/", async (req, res) => {
  res.send(await cartsDb.createCart());
});

//  Mostrar carrito por id
CartRouter.get("/:cid", async (req, res) => {
  const id = req.params.cid;
  res.send(await cartsDb.getCartById(id));
});

// Agregar producto al carrito de compras
CartRouter.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  res.send(await cartsDb.addProduct(cartId, productId, 1));
});

// Borrar un producto de un carrito de compras
CartRouter.delete("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  res.send(await cartsDb.deleteProduct(cartId, productId));
});

// Borrar todos los productos de un carrito de compras
CartRouter.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  res.send(await cartsDb.deleteAllProductsFromCart(cartId));
});

// Actualizo todo el array de productos de un carrito
CartRouter.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const productsArray = req.body;
  res.send(await cartsDb.updateCart(cartId, productsArray));
});

// Actualizo la cantidad de un producto seleccionado
CartRouter.put("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  res.send(await cartsDb.updateQuantity(cartId, productId, quantity));
});

export default CartRouter;
