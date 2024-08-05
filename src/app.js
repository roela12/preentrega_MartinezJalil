import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import __dirname from "./utils.js";
import connectDB from "./config/db.config.js";
import { entorno } from "./config/dotenv.config.js";
import initilizePassport from "./config/passport.config.js";
import errorHandler from "./middlewares/errorHandler.js";
import { addLogger, logger } from "./utils/logger.js";

import ProductRouter from "./routes/product.routes.js";
import CartRouter from "./routes/cart.routes.js";
import ViewProductRouter from "./routes/viewProducts.routes.js";
import ViewProductRealTimeRouter from "./routes/viewProductsRealTime.routes.js";
import ViewChatRouter from "./routes/viewChat.routes.js";
import ViewCartRouter from "./routes/viewCart.routes.js";
import SessionRouter from "./routes/session.routes.js";
import ViewSessionRouter from "./routes/viewSession.routes.js";
import LoggerTestRouter from "./routes/loggerTest.routes.js";
import UserRouter from "./routes/user.routes.js";
import ViewRecoverPasswordRouter from "./routes/viewRecoverPassword.routes.js";
import ViewEditUsersRouter from "./routes/viewEditUsers.routes.js";

const app = express();
const PORT = entorno.port;

// config docum
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API proyecto coderhouse",
      description:
        "API pensada para realizar las preentregas de coderhouse la cual cuenta con endpoints destinados a un ecommerce ficticio",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use(
  "/apidocs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(specs, {
    customCss: ".swagger-ui .topbar {display: none}",
  })
);

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
      mongoUrl: entorno.mongoUrl,
      ttl: 3600,
    }),
    secret: entorno.secretSession,
    resave: false,
    saveUninitialized: false,
  })
);
// Passport
initilizePassport();
app.use(passport.initialize());
app.use(passport.session());
// Logger
app.use(addLogger);
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
app.use("/loggerTest", LoggerTestRouter);
app.use("/api/users", UserRouter);
app.use("/", ViewRecoverPasswordRouter);
app.use("/editUsers", ViewEditUsersRouter);
// Errors
app.use(errorHandler);

// Listeners
const server = app.listen(PORT, () =>
  logger.info(`Servidor corriendo en el puerto ${PORT}`)
);

// WebSocket
const io = new Server(server);
import ProductsModel from "./DAOs/mongo/models/product.model.js";
import MessageMongoDao from "./DAOs/mongo/message.mongo.dao.js";
const messages = new MessageMongoDao();
const msg = [];
// Socket events
io.on("connection", (socket) => {
  logger.info("Usuario conectado");

  // Agregar producto en tiempo real
  socket.on("addProductData", async (product) => {
    await ProductsModel.create(product);
    const updatedProducts = await ProductsModel.find({});
    socket.emit("products", updatedProducts);
  });

  // Borrar producto en tiempo real
  socket.on("deleteProductData", async (id) => {
    await ProductsModel.findByIdAndDelete(id);
    const updatedProducts = await ProductsModel.find({});
    socket.emit("products", updatedProducts);
  });

  // Agregar mensaje en tiempo real
  socket.on("message", async (data) => {
    msg.push(data);
    await messages.addMessage(data);
    io.emit("messageLogs", msg);
  });

  socket.on("disconnect", () => {
    logger.info("Usuario desconectado");
  });
});
