import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import { isUser } from "../middlewares/isUser.js";

const router = Router();

// Rutas

// Crear carrito
router.post("/", cartController.createCart);

//  Mostrar carrito por id
router.get("/:cid", cartController.getCartById);

// Agregar producto al carrito de compras
router.post("/:cid/product/:pid", isUser, cartController.addProduct);

// Borrar un producto de un carrito de compras
router.delete("/:cid/product/:pid", cartController.deleteProduct);

// Borrar todos los productos de un carrito de compras
router.delete("/:cid", cartController.deleteAllProductsFromCart);

// Actualizo todo el array de productos de un carrito
router.put("/:cid", cartController.updateCart);

// Actualizo la cantidad de un producto seleccionado
router.put("/:cid/product/:pid", cartController.updateQuantity);

// Realizo la compra del carrito
router.post("/:cid/purchase", cartController.purchaseCart);

export default router;
