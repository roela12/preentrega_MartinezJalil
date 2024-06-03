import productsModel from "./models/product.model.js";
import { entorno } from "../../config/dotenv.config.js";

export default class ProductMongoDao {
  constructor() {}

  // Devuelvo todos los productos
  getAll = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit || 10);
      const page = parseInt(req.query.page || 1);
      const { category, brand, sort } = req.query;

      let query = {};

      if (category) {
        query.category = category;
      }

      if (brand) {
        query.brand = brand;
      }

      const result = await productsModel.paginate(query, {
        page,
        limit: limit,
        lean: true,
        sort: { price: sort === "asc" ? 1 : -1 },
      });

      const PORT = entorno.port;
      const link = `http://localhost:${PORT}/?limit=${limit}`;
      result.nextLink = result.hasNextPage
        ? `${link}&page=${result.nextPage}`
        : "";
      result.prevLink = result.hasPrevPage
        ? `${link}&page=${result.prevPage}`
        : "";

      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Busco por id
  getById = async (id) => {
    try {
      const result = await productsModel.findById(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Agrego un producto
  addProduct = async (product) => {
    try {
      await productsModel.create(product);
      return "Producto agregado";
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Actualizo un producto
  updateProduct = async (id, product) => {
    try {
      await productsModel.updateOne({ _id: id }, { $set: product });
      return "Producto actualizado";
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Borro un producto
  deleteProduct = async (id) => {
    try {
      await productsModel.deleteOne({ _id: id });
      return "Producto eliminado";
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Busco por marca
  getByBrand = async (brand) => {
    try {
      const result = await productsModel.find({ brand: brand });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
