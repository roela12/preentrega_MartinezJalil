import { Carts } from "../DAOs/factory.js";
//import cartDTO from "../DTOs/cart.dto.js";

const carts = new Carts();

export default class CartService {
  constructor() {}

  // Creo un nuevo carrito
  createCart = async () => {
    return await carts.createCart();
  };

  // Busco por id
  getCartById = async (id) => {
    await carts.getCartById(id);
  };

  // Agrego un producto a un carrito
  addProduct = async (cid, pid) => {
    return await carts.addProduct(cid, pid, 1);
  };

  // Borro un producto de un carrito
  deleteProduct = async (cid, pid) => {
    return await carts.deleteProduct(cid, pid);
  };

  // Borro todos los productos de un carrito
  deleteAllProductsFromCart = async (cid) => {
    return await carts.deleteAllProductsFromCart(cid);
  };

  // Actualizo los productos de el carrito por uno pasado por req.body
  updateCart = async (cid, data) => {
    return await carts.updateCart(cid, data);
  };

  // Actualizo la cantidad de un producto seleccionado
  updateQuantity = async (cid, pid, quantity) => {
    return await carts.updateQuantity(cid, pid, quantity);
  };

  // Compramos los productos del carrito
  purchaseCart = async (cid, uEmail) => {
    await carts.purchaseCart(cid, uEmail);
  };
}
