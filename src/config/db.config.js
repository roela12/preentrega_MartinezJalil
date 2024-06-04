import mongoose from "mongoose";
import { entorno } from "./dotenv.config.js";
import { logger } from "../utils/logger.js";

// MongoDb
const connectDB = async () => {
  try {
    await mongoose.connect(entorno.mongoUrl);
    logger.info("conectado a mongo");
  } catch (error) {
    logger.error("no se conecto a mongo");
    process.exit();
  }
};

export default connectDB;
