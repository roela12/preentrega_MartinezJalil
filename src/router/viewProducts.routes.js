import { Router } from "express";
import ProductManager from "../components/ProductManager.js";

const ViewProductRouter = Router();
const products = new ProductManager();

// Renderizo la pagina con todos los productos
ViewProductRouter.get("/", async (req, res) => {
  let allProducts = await products.getProducts();
  res.render("home", {
    title: "tienda de productos",
    products: allProducts,
  });
});

export default ViewProductRouter;
