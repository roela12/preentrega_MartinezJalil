import { Products } from "../dao/factory.js";

const products = new Products();

const productController = {
  addProduct: async (req, res) => {
    const product = req.body;
    res.send(await products.addProduct(product));
  },
  getAll: async (req, res) => {
    res.send(await products.getAll(req, res));
  },
  getById: async (req, res) => {
    const id = req.params.pid;
    res.send(await products.getById(id));
  },
  deleteProduct: async (req, res) => {
    const id = req.params.pid;
    res.send(await products.deleteProduct(id));
  },
  updateProduct: async (req, res) => {
    const id = req.params.pid;
    let product = req.body;
    res.send(await products.updateProduct(id, product));
  },
};

export default productController;
