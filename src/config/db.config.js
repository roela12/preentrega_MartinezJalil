import mongoose from "mongoose";

// MongoDb
const connectDB = async () => {
  const password = "q7eVnTKYLe10HQSs";
  const DB_URL = `mongodb+srv://roela:${password}@cluster0.vyrxwok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(DB_URL);
    console.log("conectado a mongo");
  } catch (error) {
    console.error("no se conecto a mongo");
    process.exit();
  }
};

export default connectDB;
