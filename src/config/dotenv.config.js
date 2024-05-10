import dotenv from "dotenv";

dotenv.config();

export const entorno = {
  port: process.env.PORT,
  mongoUrl: process.env.URL_MONGO,
  persistence: process.env.PERSISTENCE,
  secretSession: process.env.SECRET_SESSION,
};
