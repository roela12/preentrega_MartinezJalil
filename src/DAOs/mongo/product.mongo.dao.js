import productsModel from "./models/product.model.js";
import cartsModel from "./models/cart.model.js";
import userModel from "./models/user.model.js";

import { entorno } from "../../config/dotenv.config.js";
import MailingService from "../../services/mailing.js";

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
      return null;
    }
  };
  // Busco por id
  getById = async (id) => {
    try {
      const result = await productsModel.findById(id);
      return result;
    } catch (error) {
      return null;
    }
  };

  // Agrego un producto
  addProduct = async (product) => {
    try {
      const result = await productsModel.create(product);
      return result;
    } catch (error) {
      return null;
    }
  };
  // Actualizo un producto
  updateProduct = async (id, product) => {
    try {
      const result = await productsModel.updateOne(
        { _id: id },
        { $set: product }
      );
      return result;
    } catch (error) {
      return null;
    }
  };
  // Borro un producto
  deleteProduct = async (id) => {
    try {
      const carts = await cartsModel.find({});
      carts.forEach((cart) => {
        cart.products.forEach(async (product) => {
          if (product.product == id) {
            cart.products.splice(product, 1);
            await cart.save();
            const user = await userModel.findOne({ cart: cart._id });
            if (user.role == "premium") {
              const completeProduct = await productsModel.findById(
                product.product
              );
              const mailingService = new MailingService();
              const mail = await mailingService.sendSimpleMail({
                from: "Preentrega Martinez",
                to: user.email,
                subject: "Eliminacion de producto de tu carrito",
                html: `
            <div>
              <h1>Un producto de su carrito ha sido eliminado.</h1>
              <br>
              <p>Se le informa que el producto ${completeProduct.title} ha sido eliminado de nuestra tienda y por lo tanto se ha borrado de su carrito de compras.</p>
            </div>`,
              });
            }
          }
        });
      });
      await productsModel.deleteOne({ _id: id });
      return "Producto eliminado";
    } catch (error) {
      return null;
    }
  };
  // Busco por marca
  getByBrand = async (brand) => {
    try {
      const result = await productsModel.find({ brand: brand });
      return result;
    } catch (error) {
      return null;
    }
  };
}
