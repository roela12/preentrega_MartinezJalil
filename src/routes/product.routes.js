import { Router } from "express";
import ProductManagerDb from "../dao/mongoDb/managers/productManager.js";

const ProductRouter = Router();
const productsDb = new ProductManagerDb();

// Rutas

// Agregar producto
ProductRouter.post("/", async (req, res) => {
  const product = req.body;
  res.send(await productsDb.addProduct(product));
});

// Mostrar productos
ProductRouter.get("/", async (req, res) => {
  res.send(await productsDb.getAll(req, res));
});

//  Buscar un producto por id
ProductRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  res.send(await productsDb.getById(id));
});

// Borrar un producto por id
ProductRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  res.send(await productsDb.deleteProduct(id));
});

// Actualizar un producto
ProductRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  let product = req.body;
  res.send(await productsDb.updateProduct(id, product));
});

export default ProductRouter;
