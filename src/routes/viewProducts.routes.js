import { Router } from "express";
import ProductManagerDb from "../dao/mongoDb/managers/productManager.js";
import { auth } from "../middlewares/auth.js";

const ViewProductRouter = Router();
const productsDb = new ProductManagerDb();

// Renderizo la pagina con todos los productos
ViewProductRouter.get("/", auth, async (req, res) => {
  try {
    const user = req.session.user;
    const result = await productsDb.getAll(req, res);
    res.render("home", {
      title: "Tienda de productos",
      result,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
});

export default ViewProductRouter;
