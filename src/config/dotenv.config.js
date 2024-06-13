import dotenv from "dotenv";

dotenv.config();

export const entorno = {
  port: process.env.PORT,
  mongoUrl: process.env.URL_MONGO,
  persistence: process.env.PERSISTENCE,
  secretSession: process.env.SECRET_SESSION,
  secretJwt: process.env.SECRET_JWT,
  environment: process.env.ENVIRONMENT,
  mailing_user: process.env.MAILING_USER,
  mailing_password: process.env.MAILING_PASSWORD,
  mailing_service: process.env.MAILING_SERVICE,
  mailing_host: process.env.MAILING_HOST,
};
