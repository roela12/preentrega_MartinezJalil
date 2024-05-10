import productsModel from "../models/product.model.js";
import { entorno } from "../../../config/dotenv.config.js";

export default class ProductService {
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
      res.status(500).send({ message: "Error en el servidor" });
    }
  };
  // Busco por id
  getById = async (id) => {
    try {
      const result = await productsModel.findById(id);
      return result;
    } catch (error) {
      console.log("No se ha encontrado el producto con ese ID", error);
      return null;
    }
  };

  // Agrego un producto
  addProduct = async (product) => {
    try {
      const result = await productsModel.create(product);
      console.log("Producto agregado");
      return result;
    } catch (error) {
      console.log("Error en el servidor", error);
    }
  };
  // Actualizo un producto
  updateProduct = async (id, product) => {
    try {
      const result = await productsModel.updateOne(
        { _id: id },
        { $set: product }
      );
      console.log("Producto actualizado");
      return result;
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  };
  // Borro un producto
  deleteProduct = async (id) => {
    try {
      const result = await productsModel.deleteOne({ _id: id });
      console.log("Producto eliminado");
      return result;
    } catch (error) {
      console.log("No se ha podido eliminar el producto");
    }
  };
  // Busco por marca
  getByBrand = async (brand) => {
    try {
      const result = await productsModel.find({ brand: brand });
      return result;
    } catch (error) {
      console.log("Ha ocurrido un error intentando buscar por marca", error);
      return [];
    }
  };
}
