import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "Users";

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  role: { type: String, default: "user" },
  documents: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        reference: {
          type: String,
          required: true,
        },
      },
    ],
  },
  last_connection: {
    type: Date,
    default: Date.now,
  },
});

schema.plugin(mongoosePaginate);
const userModel = mongoose.model(collection, schema);

export default userModel;
