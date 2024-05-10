import { Router } from "express";

const router = Router();

// Renderizo la pagina con el chat
router.get("/", (req, res) => {
  try {
    res.render("chat", { title: "Chat" });
  } catch (error) {
    console.log("Error al renderizar la vista de Chat", error);
    res.status(500).send({ message: "Error Interno del Servidor" });
  }
});

export default router;
