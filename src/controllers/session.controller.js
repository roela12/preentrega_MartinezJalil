const sessionController = {
  register: async (req, res) => {
    res.status(201).send({ status: "success", message: "Usuario registrado" });
  },
  registerError: async (req, res) => {
    console.log("error");
    res.send({ error: "Falló" });
  },
  login: async (req, res) => {
    if (!req.user) return res.status(400).send("error");
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      cart: req.user.cart,
    };
    res.status(200).send({ status: "success", payload: req.user });
  },
  loginError: async (req, res) => {
    console.log("error");
    res.send({ error: "Fallo" });
  },
  loginGithub: async (req, res) => {
    res.status(200).send({ status: "success" });
  },
  callbackGithub: async (req, res) => {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      cart: req.user.cart,
    };

    res.redirect("/");
  },
  logout: async (req, res) => {
    try {
      req.session.destroy();
      console.log("sesion cerrada");
      res.status(200).send({ status: "success" });
    } catch (error) {
      res.status(400).send({ status: "error" });
    }
  },
  current: (req, res) => {
    const user = req.session.user;
    res.render("current", {
      title: "Sesion actual",
      user,
    });
  },
};

export default sessionController;
