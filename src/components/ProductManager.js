import { promises as fs } from "fs";

// Creamos la clase principal
class ProductManager {
  constructor() {
    this.path = "./src/models/products.json"; // Indicamos el path del fichero JSON donde guardaremos los productos
  }

  // Mostramos los productos
  getProducts = async () => {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return data;
  };

  // Agregamos un nuevo producto
  addProduct = async (product) => {
    const data = await this.getProducts();
    // Verificamos que el id no se repita
    let count = 1;
    while (data.find((product1) => product1.id === count)) {
      count++;
    }
    product.id = count;
    product.status = true;
    // Verificamos que el codigo no se repita
    if (data.find((product1) => product1.code === product.code)) {
      return `El codigo ${product.code} ya existe, el producto no se ha agregado`;
    }
    // Verificamos que no haya campos vacios u otros tipos de datos
    if (
      product.title &&
      product.description &&
      product.price &&
      product.code &&
      product.stock &&
      product.category
    ) {
      if (
        typeof product.title === "string" &&
        typeof product.description === "string" &&
        typeof product.price === "number" &&
        typeof product.code === "string" &&
        typeof product.stock === "number" &&
        typeof product.category === "string"
      ) {
        data.push(product);
        await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
        return "Producto agregado correctamente";
      } else {
        return "Revise que los valores ingresados en cada campo sean correctos";
      }
    } else {
      return "Todos los campos son obligatorios, excepto thumbnail";
    }
  };

  // Buscamos el producto por su id
  getProductById = async (id) => {
    const data = await this.getProducts();
    const product = data.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return "Producto no encontrado";
    }
  };

  // Actualizamos un producto en base a su id
  updateProduct = async (id, property, value) => {
    let data = await this.getProducts();
    const product = data.find((product) => product.id === id);
    if (product) {
      data = data.filter((products) => products.id != id);
      product[property] = value;
      data.push(product);
      await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
      return "Producto actualizado con exito";
    } else {
      return "Producto no encontrado";
    }
  };

  // Borramos un producto en base a su id
  deleteProduct = async (id) => {
    const data = await this.getProducts();
    const product = data.find((product) => product.id === id);
    if (product) {
      const newData = data.filter((products) => products.id != id);
      await fs.writeFile(this.path, JSON.stringify(newData, null, "\t"));
      return "Producto borrado con exito";
    } else {
      return "Producto no encontrado";
    }
  };
}

export default ProductManager;
