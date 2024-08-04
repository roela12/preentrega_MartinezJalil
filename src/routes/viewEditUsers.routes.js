import { Router } from "express";
import usersModel from "../DAOs/mongo/models/user.model.js";
import { entorno } from "../config/dotenv.config.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// Renderizo la pagina para editar los usuarios
router.get("/", isAdmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || 10);
    const page = parseInt(req.query.page || 1);
    const result = await usersModel.paginate(
      {},
      { page, limit: limit, lean: true }
    );
    const PORT = entorno.port;
    const link = `http://localhost:${PORT}/editUsers/?limit=${limit}`;
    result.nextLink = result.hasNextPage
      ? `${link}&page=${result.nextPage}`
      : "";
    result.prevLink = result.hasPrevPage
      ? `${link}&page=${result.prevPage}`
      : "";

    res.render("editUsers", { title: "Users", result });
  } catch (error) {
    res.send(error);
  }
});

export default router;
