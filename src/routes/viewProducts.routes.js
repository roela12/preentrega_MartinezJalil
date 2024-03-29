import { Router } from "express";
import productsModel from "../dao/mongoDb/models/products.js";

const ViewProductRouter = Router();

// Renderizo la pagina con todos los productos
ViewProductRouter.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || 10);
    const page = parseInt(req.query.page || 1);
    const { category, brand, sort } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    const result = await productsModel.paginate(query, {
      page,
      limit: limit,
      lean: true,
      sort: { price: sort === "asc" ? 1 : -1 },
    });

    const PORT = 8080;
    const link = `http://localhost:${PORT}/?limit=${limit}`;
    result.nextLink = result.hasNextPage
      ? `${link}&page=${result.nextPage}`
      : "";
    result.prevLink = result.hasPrevPage
      ? `${link}&page=${result.prevPage}`
      : "";

    res.render("home", {
      title: "Tienda de productos",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
});

export default ViewProductRouter;
