export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  // Creo un nuevo carrito
  createCart() {
    return this.dao.createCart();
  }
  // Busco por id
  getCartById(id) {
    return this.dao.getCartById(id);
  }
  // Agrego un producto a un carrito
  addProduct(cid, pid) {
    return this.dao.addProduct(cid, pid, 1);
  }
  // Borro un producto de un carrito
  deleteProduct(cid, pid) {
    return this.dao.deleteProduct(cid, pid);
  }
  // Borro todos los productos de un carrito
  deleteAllProductsFromCart(cid) {
    return this.dao.deleteAllProductsFromCart(cid);
  }
  // Actualizo los productos de el carrito por uno pasado por req.body
  updateCart(cid, data) {
    return this.dao.updateCart(cid, data);
  }
  // Actualizo la cantidad de un producto seleccionado
  updateQuantity(cid, pid, quantity) {
    return this.dao.updateQuantity(cid, pid, quantity);
  }
  // Compramos los productos del carrito
  purchaseCart(cid, uEmail) {
    return this.dao.purchaseCart(cid, uEmail);
  }
}
