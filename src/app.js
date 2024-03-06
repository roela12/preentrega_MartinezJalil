import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";
import ViewProductRouter from "./router/viewProducts.routes.js";

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () =>
  console.log("Servidor corriendo en el puerto", PORT)
);
export const io = new Server(server);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/", ViewProductRouter);

import ProductManager from "./components/ProductManager.js";
const products = new ProductManager();

// Renderizo la pagina
app.get("/realtimeproducts", async (req, res) => {
  let allProducts = await products.getProducts();
  res.render("realTimeProducts", {
    title: "tienda de productos",
    products: allProducts,
  });
});

// Socket events
io.on("connection", (socket) => {
  console.log("Conectado");

  socket.on("addProductData", async (product) => {
    await products.addProduct(product);
    socket.emit("products", await products.getProducts());
  });

  socket.on("deleteProductData", async (id) => {
    await products.deleteProduct(id);
    socket.emit("products", await products.getProducts());
  });

  socket.on("disconnect", () => {
    console.log("Desconectado");
  });
});
