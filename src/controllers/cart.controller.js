import { cartService } from "../repositories/services.js";
import CustomError from "../errors/customError.js";
import errorTypes from "../errors/errorTypes.js";

const cartController = {
  // Crear un nuevo carrito de compras
  createCart: async (req, res, next) => {
    try {
      const cart = await cartService.createCart();
      if (!cart) {
        CustomError.createError(
          "Cart not created",
          "something went wrong",
          errorTypes.INTERNAL_SERVER_ERROR
        );
      }
      res.send(cart).status(201);
    } catch (error) {
      next(error);
    }
  },
  // Obtener un carrito de compras por su ID
  getCartById: async (req, res, next) => {
    try {
      const id = req.params.cid;
      const cart = await cartService.getCartById(id);
      if (!cart) {
        CustomError.createError(
          "Cart not found",
          "invalid cart id",
          errorTypes.NOT_FOUND
        );
      }
      res.send(cart);
    } catch (error) {
      next(error);
    }
  },
  // Agregar un producto a un carrito de compras
  addProduct: async (req, res, next) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const result = await cartService.addProduct(cartId, productId);
      if (!result) {
        CustomError.createError(
          "Product not added",
          "invalid cart or product id",
          errorTypes.BAD_REQUEST
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Eliminar un producto de un carrito de compras
  deleteProduct: async (req, res, next) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const result = await cartService.deleteProduct(cartId, productId);
      if (!result) {
        CustomError.createError(
          "Product not deleted",
          "invalid cart or product id",
          errorTypes.BAD_REQUEST
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Eliminar todos los productos de un carrito de compras
  deleteAllProductsFromCart: async (req, res, next) => {
    try {
      const cartId = req.params.cid;
      const result = await cartService.deleteAllProductsFromCart(cartId);
      if (!result) {
        CustomError.createError(
          "Products not deleted",
          "invalid cart id",
          errorTypes.BAD_REQUEST
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Actualizar un carrito de compras con nuevos productos
  updateCart: async (req, res, next) => {
    try {
      const cartId = req.params.cid;
      const productsArray = req.body;
      const result = await cartService.updateCart(cartId, productsArray);
      if (!result) {
        CustomError.createError(
          "Cart not updated",
          "invalid cart id",
          errorTypes.BAD_REQUEST
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Actualizar la cantidad de un producto en un carrito de compras
  updateQuantity: async (req, res, next) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const quantity = req.body.quantity;
      const result = await cartService.updateQuantity(
        cartId,
        productId,
        quantity
      );
      if (!result) {
        CustomError.createError(
          "Cart not updated",
          "invalid cart or product id",
          errorTypes.BAD_REQUEST
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Comprar un carrito de compras
  purchaseCart: async (req, res, next) => {
    try {
      const cartId = req.params.cid;
      let userEmail;
      if (req.user) {
        userEmail = req.user.email;
      } else {
        userEmail = "no email registered";
      }
      res.send(await cartService.purchaseCart(cartId, userEmail)).status(200);
    } catch (error) {
      next(error);
    }
  },
};

export default cartController;
