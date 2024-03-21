import { Router } from "express";
//import ProductManager from "../dao/fileSystem/managers/productManager.js";
import ProductManagerDb from "../dao/mongoDb/managers/productManager.js";

const ProductRouter = Router();
//const products = new ProductManager();
const productsDb = new ProductManagerDb();

// Rutas

// Agregar producto
ProductRouter.post("/", async (req, res) => {
  let product = req.body;
  //res.send(await products.addProduct(product));
  res.send(await productsDb.addProduct(product));
});

// Mostrar productos
ProductRouter.get("/", async (req, res) => {
  let limit = parseInt(req.query.limit);
  //if (!limit) return res.send(await products.getProducts());
  //let allProducts = await products.getProducts();
  //let limitProducts = allProducts.slice(0, limit);
  //res.send(limitProducts);
  res.send(await productsDb.getAll(limit));
});

//  Buscar un producto por id
ProductRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  //res.send(await products.getProductById(id));
  res.send(await productsDb.getById(id));
});

// Borrar un producto por id
ProductRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  //res.send(await products.deleteProduct(id));
  res.send(await productsDb.deleteProduct(id));
});

// Actualizar un producto
ProductRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  let product = req.body;
  //res.send(await products.updateProduct(id, product));
  res.send(await productsDb.updateProduct(id, product));
});

export default ProductRouter;
