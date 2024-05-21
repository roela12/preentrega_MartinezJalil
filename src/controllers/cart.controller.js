import { Carts } from "../dao/factory.js";

const carts = new Carts();

const cartController = {
  createCart: async (req, res) => {
    res.send(await carts.createCart());
  },
  getCartById: async (req, res) => {
    const id = req.params.cid;
    res.send(await carts.getCartById(id));
  },
  addProduct: async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    res.send(await carts.addProduct(cartId, productId, 1));
  },
  deleteProduct: async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    res.send(await carts.deleteProduct(cartId, productId));
  },
  deleteAllProductsFromCart: async (req, res) => {
    const cartId = req.params.cid;
    res.send(await carts.deleteAllProductsFromCart(cartId));
  },
  updateCart: async (req, res) => {
    const cartId = req.params.cid;
    const productsArray = req.body;
    res.send(await carts.updateCart(cartId, productsArray));
  },
  updateQuantity: async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    res.send(await carts.updateQuantity(cartId, productId, quantity));
  },
  purchaseCart: async (req, res) => {
    const cartId = req.params.cid;
    let userEmail;
    if (req.user) {
      userEmail = req.user.email;
    } else {
      userEmail = "no email registered";
    }
    res.send(await carts.purchaseCart(cartId, userEmail));
  },
};

export default cartController;
