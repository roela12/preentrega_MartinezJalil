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
      const link = `/?limit=${limit}`;
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
      // reviso cada carrito para ver si alguien tiene el producto
      carts.forEach((cart) => {
        // reviso cada producto del carrito
        cart.products.forEach(async (product) => {
          if (product.product == id) {
            // borro el producto eliminado de los carritos de los usuarios
            cart.products.splice(product, 1);
            await cart.save();
            const user = await userModel.findOne({ cart: cart._id });
            // si es usuario premium le mando un mail para avisarle de la baja del producto
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
      // Busco el producto
      const product2 = await productsModel.findById(id);
      // Busco el usuario dueno de ese producto
      if (product2.owner) {
        const user2 = await userModel.findById(product2.owner);
        // Si es premium le mando un mail de aviso
        if (user2.role == "premium") {
          const mailingService2 = new MailingService();
          const mail2 = await mailingService2.sendSimpleMail({
            from: "Preentrega Martinez",
            to: user2.email,
            subject: "Eliminacion de tu producto de nuestro sistema",
            html: `
            <div>
              <h1>Uno de tus productos ha sido eliminado.</h1>
              <br>
              <p>Se le informa que su producto (${product2.title}) ha sido eliminado de nuestra tienda.</p>
            </div>`,
          });
        }
      }
      // borro el producto
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
