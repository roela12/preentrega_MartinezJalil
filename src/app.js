import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import __dirname from "./utils.js";
import { entorno } from "./config/dotenv.config.js";
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
const PORT = process.env.PORT || entorno.port;

// Settings
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Session
app.use(
  session({
    store: new MongoStore({
      mongoUrl: entorno.mongoUrl,
      ttl: 3600,
    }),
    secret: entorno.secretSession,
    resave: false,
    saveUninitialized: false,
  })
);
// Usando passport
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
import ProductService from "./dao/mongoDb/services/product.service.js";
import ChatService from "./dao/mongoDb/services/message.service.js";
import { isUser } from "./middlewares/isUser.js";
const products = new ProductService();
const messages = new ChatService();
const msg = [];

// Socket events
io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("addProductData", async (product) => {
    await products.addProduct(product);
    socket.emit("products", await products.getAll());
  });

  socket.on("deleteProductData", async (id) => {
    await products.deleteProduct(id);
    socket.emit("products", await products.getAll());
  });

  socket.on("message", isUser, async (data) => {
    msg.push(data);
    await messages.addMessage(data);
    io.emit("messageLogs", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});
