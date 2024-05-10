import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = Router();

// Rutas

// Agregar producto
router.post("/", productController.addProduct);

// Mostrar productos
router.get("/", productController.getAll);

//  Buscar un producto por id
router.get("/:pid", productController.getById);

// Borrar un producto por id
router.delete("/:pid", productController.deleteProduct);

// Actualizar un producto
router.put("/:pid", productController.updateProduct);

export default router;
