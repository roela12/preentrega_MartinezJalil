import cartsModel from "./models/cart.model.js";
import productsModel from "./models/product.model.js";
import ticketsModel from "./models/ticket.model.js";
import { generateRandomCode } from "../../utils.js";

export default class CartMongoDao {
  constructor() {}

  // Mostramos los carritos
  getCarts = async () => {
    try {
      const result = await cartsModel.find({});
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Creo un nuevo carrito
  createCart = async () => {
    try {
      const result = await cartsModel.create({});
      console.log("Carrito creado");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Busco por id
  getCartById = async (id) => {
    try {
      const result = await cartsModel.findById(id).populate("products.product");
      return result;
    } catch (error) {
      console.log(error);
      return null;
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
      return null;
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
      return null;
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
      return null;
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
      return null;
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
      return null;
    }
  };

  // Compramos los productos del carrito
  purchaseCart = async (cid, uEmail) => {
    try {
      const cart = await cartsModel.findById(cid);
      const products = cart.products;
      let nonPurchased = [];
      let nonPurchasedId = [];
      let amount = 0;
      // Actualizamos el stock de los productos
      products.forEach(async (element) => {
        const product = await productsModel.findById(element.product);
        if (product.stock >= element.quantity) {
          amount += element.quantity * product.price;
          product.stock -= element.quantity;
          await product.save();
        } else {
          nonPurchased.push(element);
          nonPurchasedId.push(element.product);
        }
      });
      // Generamos el ticket de compra
      const tickets = await ticketsModel.find({});
      let randomCode = generateRandomCode(7);
      tickets.forEach((element) => {
        if (element.code == randomCode) {
          randomCode = generateRandomCode(7);
        }
      });
      const ticket = {
        code: randomCode,
        amount: amount,
        purchaser: uEmail,
      };
      await ticketsModel.create(ticket);
      await this.deleteAllProductsFromCart(cid);
      if (nonPurchased) {
        await this.updateCart(cid, nonPurchased);
        return nonPurchasedId;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}