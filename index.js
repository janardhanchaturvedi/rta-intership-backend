const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { Product } = require("./models/product.model");
const { User } = require("./models/user.model");
const {
  registerUser,
  getUser,
  loginUser,
} = require("./controllers/user.controller");
const {
  getProducts,
  addProducts,
} = require("./controllers/product.controller");
const PORT = 3001;

app.use(express.json());
app.use(cors());

/**
 * Users k saare endpoints
 */

app.post("/register", registerUser);

app.get("/user", getUser);

app.post("/login", loginUser);

/**
 * Products k saare endpoints
 */

/**
 * ADD PRODUCT API
 */

app.post("/products", addProducts);

/**
 * GET ALL PRODUCTS
 */

app.get("/products", getProducts);
app.listen(PORT, () => {
  console.log(`Server Shuru ho gya listen karna ${PORT}`);
});
mongoose
  .connect("mongodb://localhost:27017/janardhan12")
  .then(() => {
    console.log("Database Connexted Suscessfully");
  })
  .catch((error) => {
    console.log("Database connect karte waqt", error);
  });
