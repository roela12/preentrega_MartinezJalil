import { Router } from "express";
import productsModel from "../DAOs/mongo/models/product.model.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// Renderizo la pagina
router.get("/", isAdmin, async (req, res) => {
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
    res.send(error);
  }
});

export default router;
