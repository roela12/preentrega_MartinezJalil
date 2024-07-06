import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import { entorno } from "./config/dotenv.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export function generateRandomCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateProduct() {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: generateRandomCode(10),
    category: faker.commerce.department(),
    brand: faker.company.name(),
    price: faker.commerce.price(),
    stock: faker.number.int(1000),
    status: true,
    thumbnails: [],
  };
}

export const generateToken = (item) => {
  return jwt.sign({ item }, entorno.secretJwt, { expiresIn: "1h" });
};

export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, entorno.secretJwt);
    return decoded;
  } catch (error) {
    return null;
  }
};

export default __dirname;
