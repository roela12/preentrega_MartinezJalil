export default (error, req, res, next) => {
  if (error) {
    if (error.code) {
      req.logger.error(
        `${error.name}: ${
          error.message
        } - ${new Date().toLocaleTimeString()}, user: ${
          req.session.user
        }, url: ${req.url}, http method: ${req.method}`
      );
      res.setHeader("Content-Type", "application/json");
      return res.status(error.code).json({ error: error.message });
    } else {
      req.logger.error(
        `Unexpected error - ${new Date().toLocaleTimeString()}, user: ${
          req.session.user
        }, url: ${req.url}, http method: ${req.method}`
      );
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ error: "Unexpected error" });
    }
  }

  next();
};
