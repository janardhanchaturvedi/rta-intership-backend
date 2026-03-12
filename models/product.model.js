const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  image: String,
  rating: {
    rate: String,
    count: Number,
  },
  inStock: Boolean,
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  image: {
    type: String
  },
  isApproved: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = {
  Product,
};
