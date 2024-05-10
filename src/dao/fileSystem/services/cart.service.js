import { promises as fs } from "fs";

// Creamos la clase principal
class CartManager {
  constructor() {
    this.path = "./src/dao/fileSystem/models/carts.json"; // Indicamos el path del fichero JSON donde guardaremos los carritos
  }

  // Mostramos los carritos
  getCarts = async () => {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return data;
  };

  // Agregamos un carrito
  createCart = async () => {
    const data = await this.getCarts();
    // Verificamos que el id no se repita
    let count = 1;
    while (data.find((cart1) => cart1.id === count)) {
      count++;
    }
    const cart = {
      id: count,
      products: [],
    };
    data.push(cart);
    await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
    return "Carrito creado con exito";
  };

  // Buscamos el carrito por su id
  getCartById = async (id) => {
    const data = await this.getCarts();
    const cart = data.find((cart1) => cart1.id === id);
    if (cart) {
      return cart;
    } else {
      return "Carrito no encontrado";
    }
  };

  //  Agregar un producto al carrito
  addProduct = async (cartId, productId) => {
    let data = await this.getCarts();
    const cart = data.find((cart1) => cart1.id === parseInt(cartId));
    if (cart) {
      let productExist = cart.products.find(
        (product) => product.product === parseInt(productId)
      );
      if (productExist) {
        productExist.quantity++;
        await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
        return "Se agrego correctamente al carrito";
      } else {
        data = data.filter((carts) => carts.id != parseInt(cartId));
        cart.products.push({ product: parseInt(productId), quantity: 1 });
        data.push(cart);
        await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
        return "Se agrego correctamente al carrito";
      }
    } else {
      return "El carrito no existe";
    }
  };
}

export default CartManager;
