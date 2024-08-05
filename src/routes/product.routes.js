import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAdminOrPremium } from "../middlewares/isAdminOrPremium.js";
import { useMulter } from "../utils.js";

const router = Router();

// Rutas

// Agregar producto
router.post(
  "/",
  isAdminOrPremium,
  useMulter("products").array("product", 10),
  productController.addProduct
);

// Mostrar productos
router.get("/", productController.getAll);

//  Buscar un producto por id
router.get("/:pid", productController.getById);

// Borrar un producto por id
router.delete("/:pid", isAdmin, productController.deleteProduct);

// Actualizar un producto
router.put(
  "/:pid",
  isAdmin,
  useMulter("products").array("product", 10),
  productController.updateProduct
);

export default router;
