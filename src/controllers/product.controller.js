import ProductService from "../services/product.service.js";

const products = new ProductService();

const productController = {
  // Agregar un producto
  addProduct: async (req, res) => {
    const product = req.body;
    res.send(await products.addProduct(product));
  },
  // Mostrar todos los productos
  getAll: async (req, res) => {
    res.send(await products.getAll(req, res));
  },
  // Mostrar producto por id
  getById: async (req, res) => {
    const id = req.params.pid;
    res.send(await products.getById(id));
  },
  // Borrar productoi por id
  deleteProduct: async (req, res) => {
    const id = req.params.pid;
    res.send(await products.deleteProduct(id));
  },
  // Actualizar producto por uno pasado por el req body
  updateProduct: async (req, res) => {
    const id = req.params.pid;
    let product = req.body;
    res.send(await products.updateProduct(id, product));
  },
};

export default productController;
