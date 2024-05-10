import mongoose from "mongoose";
import { entorno } from "./dotenv.config.js";

// MongoDb
const connectDB = async () => {
  try {
    await mongoose.connect(entorno.mongoUrl);
    console.log("conectado a mongo");
  } catch (error) {
    console.error("no se conecto a mongo");
    process.exit();
  }
};

export default connectDB;
