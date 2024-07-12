import { productService } from "../repositories/services.js";
import CustomError from "../errors/customError.js";
import errorTypes from "../errors/errorTypes.js";

const productController = {
  // Agregar un producto
  addProduct: async (req, res, next) => {
    try {
      const product = req.body;
      // const images = req.files;
      // images.forEach((file) => {
      //   product.thumbnails.push(file.path);
      // });
      const result = await productService.addProduct(product);
      if (!result) {
        CustomError.createError(
          "Produt not added",
          "something went wrong",
          errorTypes.INTERNAL_SERVER_ERROR
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Mostrar todos los productos
  getAll: async (req, res, next) => {
    try {
      const result = await productService.getAll(req, res);
      if (!result) {
        CustomError.createError(
          "Produts not found",
          "something went wrong",
          errorTypes.NOT_FOUND
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Mostrar producto por id
  getById: async (req, res, next) => {
    try {
      const id = req.params.pid;
      const product = await productService.getById(id);
      if (!product) {
        CustomError.createError(
          "Produt not found",
          "invalid product id",
          errorTypes.NOT_FOUND
        );
      }
      res.send(product).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Borrar producto por id
  deleteProduct: async (req, res, next) => {
    try {
      const id = req.params.pid;
      const result = await productService.deleteProduct(id);
      if (!result) {
        CustomError.createError(
          "Produt not deleted",
          "invalid product id",
          errorTypes.NOT_FOUND
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
  // Actualizar producto por uno pasado por el req body
  updateProduct: async (req, res, next) => {
    try {
      const id = req.params.pid;
      let product = req.body;
      // const images = req.files;
      // images.forEach((file) => {
      //   product.thumbnails.push(file.path);
      // });
      const result = await productService.updateProduct(id, product);
      if (!result) {
        CustomError.createError(
          "Produt not updated",
          "invalid product id",
          errorTypes.NOT_FOUND
        );
      }
      res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  },
};

export default productController;
