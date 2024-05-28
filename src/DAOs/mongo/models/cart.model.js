import mongoose from "mongoose";
const { Schema } = mongoose;

const collection = "carts";

const schema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
  },
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;
