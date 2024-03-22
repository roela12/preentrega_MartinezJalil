import cartsModel from "../models/carts.js";

export default class CartManagerDb {
  constructor() {
    console.log("trabajando en cartManager");
  }

  getCartById = async (id) => {
    const result = await cartsModel.findById(id);
    return result;
  };
  //Creo un nuevo carrito
  createCart = async () => {
    const result = await cartsModel.create({});
    console.log("Carrito creado");
    return result;
  };
  // Agrego un producto a un carrito
  addProduct = async (cid, pid, quantity) => {
    const cart = await cartsModel.findById(cid);
    let product = cart.products.find(
      (product) => product.product.toString() === pid
    );

    if (product) {
      product.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }
    console.log("Producto agregado");
    return await cart.save();
  };
  // Borro un producto de un carrito
  deleteProduct = async (cid, pid) => {
    const cart = await cartsModel.findById(cid);
    let product = cart.products.findIndex(
      (product) => product.product.toString() === pid
    );

    if (product === 0) {
      console.log("Producto no encontrado");
    } else {
      cart.product.splice(product, 1);
    }
    console.log("Producto eliminado");
    return await cart.save();
  };
}
