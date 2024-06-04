import { Router } from "express";

const router = Router();

// Renderizo la pagina con el chat
router.get("/", (req, res) => {
  try {
    res.render("chat", { title: "Chat" });
  } catch (error) {
    res.send(error);
  }
});

export default router;
