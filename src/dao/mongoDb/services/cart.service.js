import cartsModel from "../models/cart.model.js";

export default class CartService {
  constructor() {}

  // Creo un nuevo carrito
  createCart = async () => {
    try {
      const result = await cartsModel.create({});
      console.log("Carrito creado");
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // Busco por id
  getCartById = async (id) => {
    try {
      const result = await cartsModel.findById(id).populate("products.product");
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // Agrego un producto a un carrito
  addProduct = async (cid, pid, quantity) => {
    try {
      const cart = await cartsModel.findById(cid);
      const product = cart.products.find(
        (product) => product.product.toString() === pid
      );

      if (product) {
        product.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }
      console.log("Producto agregado");
      return await cart.save();
    } catch (error) {
      console.log(error);
    }
  };

  // Borro un producto de un carrito
  deleteProduct = async (cid, pid) => {
    try {
      const cart = await cartsModel.findById(cid);
      const product = cart.products.findIndex(
        (product) => product.product.toString() === pid
      );
      cart.products.splice(product, 1);
      console.log("Producto eliminado");
      return await cart.save();
    } catch (error) {
      console.log(error);
    }
  };

  // Borro todos los productos de un carrito
  deleteAllProductsFromCart = async (cid) => {
    try {
      const cart = await cartsModel.findById(cid);
      cart.products = [];
      return await cart.save();
    } catch (error) {
      console.log(error);
    }
  };

  // Actualizo los productos de el carrito por uno pasado por req.body
  updateCart = async (cid, data) => {
    try {
      const cart = await cartsModel.findById(cid);
      cart.products = data;
      return await cart.save();
    } catch (error) {
      console.log(error);
    }
  };

  // Actualizo la cantidad de un producto seleccionado
  updateQuantity = async (cid, pid, quantity) => {
    try {
      const cart = await cartsModel.findById(cid);
      const product = cart.products.findIndex(
        (product) => product.product.toString() === pid
      );
      cart.products[product].quantity = quantity;
      return await cart.save();
    } catch (error) {
      console.log(error);
    }
  };
}
