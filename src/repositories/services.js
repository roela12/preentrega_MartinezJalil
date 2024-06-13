import User from "../DAOs/mongo/user.mongo.dao.js";
import Product from "../DAOs/mongo/product.mongo.dao.js";
import Cart from "../DAOs/mongo/cart.mongo.dao.js";
import Ticket from "../DAOs/mongo/ticket.mongo.dao.js";

import UserRepository from "./user.repository.js";
import ProductRepository from "./product.repository.js";
import CartRepository from "./cart.repository.js";
import TicketRepository from "./ticket.repository.js";

const userDao = new User();
const productDao = new Product();
const cartDao = new Cart();
const ticketDao = new Ticket();

export const userService = new UserRepository(userDao);
export const productService = new ProductRepository(productDao);
export const cartService = new CartRepository(cartDao);
export const ticketService = new TicketRepository(ticketDao);
