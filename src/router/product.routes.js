import { Router } from "express";
import ProductManager from "../components/ProductManager.js";

const ProductRouter = Router();
const products = new ProductManager();

// Rutas

// Agregar producto
ProductRouter.post("/", async (req, res) => {
  let product = req.body;
  res.send(await products.addProduct(product));
});

// Mostrar productos
ProductRouter.get("/", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await products.getProducts());
  let allProducts = await products.getProducts();
  let limitProducts = allProducts.slice(0, limit);
  res.send(limitProducts);
});

//  Buscar un producto por id
ProductRouter.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  res.send(await products.getProductById(id));
});

// Borrar un producto por id
ProductRouter.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  res.send(await products.deleteProduct(id));
});

// Actualizar un parametro de un producto
ProductRouter.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  let product = req.body;
  res.send(
    await products.updateProduct(
      id,
      Object.keys(product)[0],
      Object.values(product)[0]
    )
  );
});

export default ProductRouter;
