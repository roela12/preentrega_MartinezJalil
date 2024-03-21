import { Router } from "express";

const ViewChatRouter = Router();

ViewChatRouter.get("/", (req, res) => {
  res.render("chat", { title: "Chat" });
});

export default ViewChatRouter;
