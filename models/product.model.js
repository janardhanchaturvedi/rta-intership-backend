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
});

const Product = mongoose.model("Product", productSchema);
module.export = {
  Product,
};
