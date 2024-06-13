export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }
  // Devuelvo todos los productos
  getAll(req, res) {
    return this.dao.getAll(req, res);
  }
  // Busco por id
  getById(id) {
    return this.dao.getById(id);
  }
  // Agrego un producto
  addProduct(product) {
    return this.dao.addProduct(product);
  }
  // Actualizo un producto
  updateProduct(id, product) {
    return this.dao.updateProduct(id, product);
  }
  // Borro un producto
  deleteProduct(id) {
    return this.dao.deleteProduct(id);
  }
}
