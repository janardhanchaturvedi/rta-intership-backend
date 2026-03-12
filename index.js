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
  getSellerStats,
  getSellerProducts
} = require("./controllers/user.controller");
const {
  getProducts,
  addProducts,
  deleteProduct,
  getProductById,
} = require("./controllers/product.controller");
const { bookOrder } = require("./controllers/order.controller");
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

/**
 * APPROVE PRODUCT (PENDING)
 */


/**
 * GET SELLER STATS
 */

app.get("/seller-stats", getSellerStats);

/**
 * GET SELLER'S PRODUCTS
 */
app.get("/seller-products", getSellerProducts);

/**
 * DELETE PRODUCT
 */

app.delete("/products/:id", deleteProduct);

/*GET PRODUCT BY ID */
app.get("/products/:id", getProductById);

/**
 * Order k endpoints bhi yaha add kar dena
 */

app.post("/order", bookOrder);
/**
 * GET ALL ORDERS (PENDING)
 */
app.get("/orders",)

/**
 * GET ALL USERS (PENDING)
 */

/**
 * GET ALL SELLERS (PENDING)
 */


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
