import mongoose from "mongoose";
const { Schema } = mongoose;

const collection = "carts";

const schema = new Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;
