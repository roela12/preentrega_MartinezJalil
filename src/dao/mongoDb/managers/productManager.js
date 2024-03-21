import productsModel from "../models/products.js";

export default class ProductManagerDb {
  constructor() {
    console.log("trabajando en productManager");
  }

  getAll = async (limit) => {
    const result = await productsModel.find().limit(limit);
    return result;
  };
  getById = async (id) => {
    const result = await productsModel.findById(id);
    return result;
  };
  getByBrand = async (brand) => {
    const result = await productsModel.find({ brand: brand });
    return result;
  };
  addProduct = async (product) => {
    const result = await productsModel.create(product);
    console.log("Producto agregado");
    return result;
  };
  updateProduct = async (id, product) => {
    const result = await productsModel.updateOne(
      { _id: id },
      { $set: product }
    );
    console.log("Producto actualizado");
    return result;
  };
  deleteProduct = async (id) => {
    const result = await productsModel.deleteOne({ _id: id });
    console.log("Producto eliminado");
    return result;
  };
}
