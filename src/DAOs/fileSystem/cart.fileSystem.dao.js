import { promises as fs } from "fs";

// Creamos la clase principal
class CartManager {
  constructor() {
    this.path = "./src/dao/fileSystem/files/carts.json"; // Indicamos el path del fichero JSON donde guardaremos los carritos
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
  addProduct = async (cid, pid, quantity) => {
    let data = await this.getCarts();
    const cart = data.find((cart1) => cart1.id === parseInt(cid));
    if (cart) {
      let productExist = cart.products.find(
        (product) => product.product === parseInt(pid)
      );
      if (productExist) {
        productExist.quantity += quantity;
        await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
        return "Se agrego correctamente al carrito";
      } else {
        data = data.filter((carts) => carts.id != parseInt(cid));
        cart.products.push({ product: parseInt(pid), quantity: quantity });
        data.push(cart);
        await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
        return "Se agrego correctamente al carrito";
      }
    } else {
      return "El carrito no existe";
    }
  };

  // Borro un producto del carrito
  deleteProduct = async (cid, pid) => {
    let data = await this.getCarts();
    const cart = data.find((cart1) => cart1.id === parseInt(cid));
    if (cart) {
      let productExist = cart.products.find(
        (product) => product.product === parseInt(pid)
      );
      if (productExist) {
        data = data.filter((carts) => carts.id != parseInt(cid));
        cart.products = cart.products.filter(
          (product) => product.product != parseInt(pid)
        );
        data.push(cart);
        await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
        return "Se elimino correctamente del carrito";
      } else {
        return "El producto no existe en el carrito";
      }
    } else {
      return "El carrito no existe";
    }
  };

  // Borro todos los productos de un carrito
  deleteAllProductsFromCart = async (cid) => {
    let data = await this.getCarts();
    const cart = data.find((cart1) => cart1.id === parseInt(cid));
    if (cart) {
      data = data.filter((carts) => carts.id != parseInt(cid));
      cart.products = [];
      data.push(cart);
      await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
      return "Se elimino correctamente del carrito";
    } else {
      return "El carrito no existe";
    }
  };

  // Actualizo los productos de el carrito por uno pasado por req.body
  updateCart = async (cid, data) => {
    let dataCart = await this.getCarts();
    const cart = dataCart.find((cart1) => cart1.id === parseInt(cid));
    if (cart) {
      cart.products = data.products;
      dataCart.push(cart);
      await fs.writeFile(this.path, JSON.stringify(dataCart, null, "\t"));
      return "Se actualizo correctamente el carrito";
    } else {
      return "El carrito no existe";
    }
  };

  // Actualizo la cantidad de un producto seleccionado
  updateQuantity = async (cid, pid, quantity) => {
    let dataCart = await this.getCarts();
    const cart = dataCart.find((cart1) => cart1.id === parseInt(cid));
    const product = cart.products.find(
      (product1) => product1.product === parseInt(pid)
    );
    if (cart) {
      if (product) {
        product.quantity = parseInt(quantity);
        dataCart.push(cart);
        await fs.writeFile(this.path, JSON.stringify(dataCart, null, "\t"));
        return "Se actualizo correctamente la cantidad del producto";
      } else {
        return "El producto no existe en el carrito";
      }
    } else {
      return "El carrito no existe";
    }
  };
  // Compramos los productos del carrito
  purchaseCart = async (cid, uEmail) => {
    return "todavia no esta hecho";
  };
}
export default CartManager;
