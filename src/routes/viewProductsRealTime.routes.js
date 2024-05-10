import { Router } from "express";
import productsModel from "../dao/mongoDb/models/product.model.js";

const router = Router();

// Renderizo la pagina
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || 50);
    const page = parseInt(req.query.page || 1);
    const result = await productsModel.paginate(
      {},
      { page, limit: limit, lean: true }
    );
    res.render("realTimeProducts", {
      title: "tienda de productos",
      result,
    });
  } catch (error) {
    console.log("Error al renderizar el listado de productos", error);
    return res.status(404).send({ message: "Error en el servidor" });
  }
});

export default router;
