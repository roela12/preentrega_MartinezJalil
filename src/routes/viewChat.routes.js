import { Router } from "express";

const ViewChatRouter = Router();

// Renderizo la pagina con el chat
ViewChatRouter.get("/", (req, res) => {
  try {
    res.render("chat", { title: "Chat" });
  } catch (error) {
    console.log("Error al renderizar la vista de Chat", error);
    res.status(500).send({ message: "Error Interno del Servidor" });
  }
});

export default ViewChatRouter;
