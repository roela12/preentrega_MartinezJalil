import mongoose from "mongoose";

const collection = "tickets";

const schema = new mongoose.Schema({
  code: {
    type: String,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
  },
});

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;
