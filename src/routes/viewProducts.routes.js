import { Router } from "express";
import ProductManager from "../dao/fileSystem/managers/productManager.js";
//import ProductManagerDb from "../dao/mongoDb/managers/productManager.js";

const ViewProductRouter = Router();
const products = new ProductManager();
//const productsDb = new ProductManagerDb();

// Renderizo la pagina con todos los productos
ViewProductRouter.get("/", async (req, res) => {
  let allProducts = await products.getProducts();
  //let allProducts = await productsDb.getAll(50);
  res.render("home", {
    title: "tienda de productos",
    products: allProducts,
  });
});

export default ViewProductRouter;
