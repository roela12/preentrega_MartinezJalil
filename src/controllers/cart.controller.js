import CartService from "../services/cart.service.js";

const carts = new CartService();

const cartController = {
  // Crear un nuevo carrito de compras
  createCart: async (req, res) => {
    res.send(await carts.createCart());
  },
  // Obtener un carrito de compras por su ID
  getCartById: async (req, res) => {
    const id = req.params.cid;
    res.send(await carts.getCartById(id));
  },
  // Agregar un producto a un carrito de compras
  addProduct: async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    res.send(await carts.addProduct(cartId, productId));
  },
  // Eliminar un producto de un carrito de compras
  deleteProduct: async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    res.send(await carts.deleteProduct(cartId, productId));
  },
  // Eliminar todos los productos de un carrito de compras
  deleteAllProductsFromCart: async (req, res) => {
    const cartId = req.params.cid;
    res.send(await carts.deleteAllProductsFromCart(cartId));
  },
  // Actualizar un carrito de compras con nuevos productos
  updateCart: async (req, res) => {
    const cartId = req.params.cid;
    const productsArray = req.body;
    res.send(await carts.updateCart(cartId, productsArray));
  },
  // Actualizar la cantidad de un producto en un carrito de compras
  updateQuantity: async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    res.send(await carts.updateQuantity(cartId, productId, quantity));
  },
  // Comprar un carrito de compras
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
