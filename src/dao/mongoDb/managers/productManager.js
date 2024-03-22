import productsModel from "../models/products.js";

export default class ProductManagerDb {
  constructor() {
    console.log("trabajando en productManager");
  }

  // Devuelvo todos los productos
  getAll = async (limit) => {
    const result = await productsModel.find().limit(limit);
    return result;
  };
  // Busco por id
  getById = async (id) => {
    const result = await productsModel.findById(id);
    return result;
  };
  // Busco por marca
  getByBrand = async (brand) => {
    const result = await productsModel.find({ brand: brand });
    return result;
  };
  // Agrego un producto
  addProduct = async (product) => {
    const result = await productsModel.create(product);
    console.log("Producto agregado");
    return result;
  };
  // Actualizo un producto
  updateProduct = async (id, product) => {
    const result = await productsModel.updateOne(
      { _id: id },
      { $set: product }
    );
    console.log("Producto actualizado");
    return result;
  };
  // Borro un producto
  deleteProduct = async (id) => {
    const result = await productsModel.deleteOne({ _id: id });
    console.log("Producto eliminado");
    return result;
  };
}
