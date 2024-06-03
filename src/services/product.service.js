import { Products } from "../DAOs/factory.js";
//import productDTO from "../DTOs/product.dto.js";

const products = new Products();

export default class ProductService {
  constructor() {}

  // Devuelvo todos los productos
  getAll = async (req, res) => {
    await products.getAll(req, res);
  };
  // Busco por id
  getById = async (id) => {
    await products.getById(id);
  };

  // Agrego un producto
  addProduct = async (product) => {
    return await products.addProduct(product);
  };
  // Actualizo un producto
  updateProduct = async (id, product) => {
    return await products.updateProduct(id, product);
  };
  // Borro un producto
  deleteProduct = async (id) => {
    return await products.deleteProduct(id);
  };
}
