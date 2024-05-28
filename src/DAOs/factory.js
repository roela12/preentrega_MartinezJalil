import { entorno } from "../config/dotenv.config.js";
import connectDB from "../config/db.config.js";

export let Products;
export let Carts;

switch (entorno.persistence) {
  case "MONGO":
    connectDB();
    const { default: ProductsMongo } = await import(
      "../DAOs/mongo/product.mongo.dao.js"
    );
    Products = ProductsMongo;
    const { default: CartsMongo } = await import(
      "../DAOs/mongo/cart.mongo.dao.js"
    );
    Carts = CartsMongo;
    break;
  case "FS":
    const { default: ProductsMemory } = await import(
      "../DAOs/fileSystem/product.fileSystem.dao.js"
    );
    Products = ProductsMemory;
    const { default: CartsMemory } = await import(
      "../DAOs/fileSystem/cart.fileSystem.dao.js"
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
