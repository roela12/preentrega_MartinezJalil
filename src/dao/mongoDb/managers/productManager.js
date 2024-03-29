import productsModel from "../models/products.js";

export default class ProductManagerDb {
  constructor() {}

  // Devuelvo todos los productos
  getAll = async (limit) => {
    try {
      const result = await productsModel.find().limit(limit);
      return result;
    } catch (error) {
      console.log("Error al obtener la lista de productos: ", error);
      throw new Error("Internal Server Error");
    }
  };
  // Busco por id
  getById = async (id) => {
    try {
      const result = await productsModel.findById(id);
      return result;
    } catch (error) {
      console.log("No se ha encontrado el producto con ese ID", error);
      return null;
    }
  };
  // Busco por marca
  getByBrand = async (brand) => {
    try {
      const result = await productsModel.find({ brand: brand });
      return result;
    } catch (error) {
      console.log("Ha ocurrido un error intentando buscar por marca", error);
      return [];
    }
  };
  // Agrego un producto
  addProduct = async (product) => {
    try {
      const result = await productsModel.create(product);
      console.log("Producto agregado");
      return result;
    } catch (error) {
      console.log("Error en el servidor", error);
    }
  };
  // Actualizo un producto
  updateProduct = async (id, product) => {
    try {
      const result = await productsModel.updateOne(
        { _id: id },
        { $set: product }
      );
      console.log("Producto actualizado");
      return result;
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  };
  // Borro un producto
  deleteProduct = async (id) => {
    try {
      const result = await productsModel.deleteOne({ _id: id });
      console.log("Producto eliminado");
      return result;
    } catch (error) {
      console.log("No se ha podido eliminar el producto");
    }
  };
}
