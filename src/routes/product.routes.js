import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// Rutas

// Agregar producto
router.post("/", isAdmin, productController.addProduct);

// Mostrar productos
router.get("/", productController.getAll);

//  Buscar un producto por id
router.get("/:pid", productController.getById);

// Borrar un producto por id
router.delete("/:pid", isAdmin, productController.deleteProduct);

// Actualizar un producto
router.put("/:pid", isAdmin, productController.updateProduct);

export default router;
