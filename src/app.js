import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";

const app = express();
const port = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

app.listen(port, () => console.log("Servidor corriendo en el puerto", port));
