import { entorno } from "../config/dotenv.config.js";
import connectDB from "../config/db.config.js";

export let Products;
export let Carts;

switch (entorno.persistence) {
  case "MONGO":
    connectDB();
    const { default: ProductsMongo } = await import(
      "../dao/mongoDb/services/product.service.js"
    );
    Products = ProductsMongo;
    const { default: CartsMongo } = await import(
      "../dao/mongoDb/services/cart.service.js"
    );
    Carts = CartsMongo;
    break;
  case "FS":
    const { default: ProductsMemory } = await import(
      "../dao/fileSystem/services/product.service.js"
    );
    Products = ProductsMemory;
    const { default: CartsMemory } = await import(
      "../dao/fileSystem/services/cart.service.js"
    );
    Carts = CartsMemory;
    break;
  case "MYSQL":
    break;
  case "MEMORY":
    break;
  default:
    break;
}
