import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import ProductRouter from "./routes/product.routes.js";
import CartRouter from "./routes/cart.routes.js";
import ViewProductRouter from "./routes/viewProducts.routes.js";
import ViewProductRealTimeRouter from "./routes/viewProductsRealTime.routes.js";
import ViewChatRouter from "./routes/viewChat.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

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
app.use("/realtimeproducts", ViewProductRealTimeRouter);
app.use("/chat", ViewChatRouter);

const server = app.listen(PORT, () =>
  console.log("Servidor corriendo en el puerto", PORT)
);
export const io = new Server(server);

const connectMongoDB = async () => {
  const DB_URL =
    "mongodb+srv://roela:q7eVnTKYLe10HQSs@cluster0.vyrxwok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(DB_URL);
    console.log("conectado a mongo");
  } catch (error) {
    console.error("no se conecto a mongo");
    process.exit();
  }
};
connectMongoDB();

import ProductManager from "./dao/fileSystem/managers/productManager.js";
//import ProductManagerDb from "./dao/mongoDb/managers/productManager.js";
import ChatManager from "./dao/mongoDb/managers/messageManager.js";
const products = new ProductManager();
//const productsDb = new ProductManagerDb();
const messages = new ChatManager();
const msg = [];

// Socket events
io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("addProductData", async (product) => {
    await products.addProduct(product);
    socket.emit("products", await products.getProducts());
    //await productsDb.addProduct(product);
    //socket.emit("products", await productsDb.getAll(50));
  });

  socket.on("deleteProductData", async (id) => {
    await products.deleteProduct(id);
    socket.emit("products", await products.getProducts());
    //await productsDb.deleteProduct(id);
    //socket.emit("products", await productsDb.getAll(50));
  });

  socket.on("message", async (data) => {
    msg.push(data);
    await messages.addMessage(data);
    io.emit("messageLogs", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});
