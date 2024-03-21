import { Router } from "express";
import ProductManager from "../dao/fileSystem/managers/productManager.js";
//import ProductManagerDb from "../dao/mongoDb/managers/productManager.js";

const ViewProductRealTimeRouter = Router();
const products = new ProductManager();
//const productsDb = new ProductManagerDb();

// Renderizo la pagina
ViewProductRealTimeRouter.get("/", async (req, res) => {
  let allProducts = await products.getProducts();
  //let allProducts = await productsDb.getAll(50);
  res.render("realTimeProducts", {
    title: "tienda de productos",
    products: allProducts,
  });
});

export default ViewProductRealTimeRouter;
