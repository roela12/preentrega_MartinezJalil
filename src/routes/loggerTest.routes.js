import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.logger.fatal("FATAL message test");
  req.logger.error("ERROR message test");
  req.logger.warn("WARN message test");
  req.logger.info("INFO message test");
  req.logger.http("HTTP message test");
  req.logger.debug("DEBUG message test");
  res.status(200).send("Logs test executed");
});

export default router;
