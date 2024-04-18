import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import connectDB from "./config/db.config.js";
import passport from "passport";
import initilizePassport from "./config/passport.config.js";
import ProductRouter from "./routes/product.routes.js";
import CartRouter from "./routes/cart.routes.js";
import ViewProductRouter from "./routes/viewProducts.routes.js";
import ViewProductRealTimeRouter from "./routes/viewProductsRealTime.routes.js";
import ViewChatRouter from "./routes/viewChat.routes.js";
import ViewCartRouter from "./routes/viewCart.routes.js";
import SessionRouter from "./routes/session.routes.js";
import ViewSessionRouter from "./routes/viewSession.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Settings
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Conecto la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Session
app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://roela:q7eVnTKYLe10HQSs@cluster0.vyrxwok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      ttl: 3600,
    }),
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);
//usando passport
initilizePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/", ViewProductRouter);
app.use("/products", ViewProductRouter);
app.use("/realtimeproducts", ViewProductRealTimeRouter);
app.use("/chat", ViewChatRouter);
app.use("/cart", ViewCartRouter);
app.use("/", ViewSessionRouter);
app.use("/api/sessions", SessionRouter);

// Listeners
const server = app.listen(PORT, () =>
  console.log("Servidor corriendo en el puerto", PORT)
);

// WebSocket
const io = new Server(server);
import ProductManagerDb from "./dao/mongoDb/managers/productManager.js";
import ChatManager from "./dao/mongoDb/managers/messageManager.js";
const productsDb = new ProductManagerDb();
const messages = new ChatManager();
const msg = [];

// Socket events
io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("addProductData", async (product) => {
    await productsDb.addProduct(product);
    socket.emit("products", await productsDb.getAll(50));
  });

  socket.on("deleteProductData", async (id) => {
    await productsDb.deleteProduct(id);
    socket.emit("products", await productsDb.getAll(50));
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
