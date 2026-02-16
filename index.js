const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3001;

app.use(express.json());
app.use(cors());
const { Schema } = mongoose;
const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
});

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

const user = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

app.get("/products", (req, res) => {
  console.log("producst waala end point trigger hua");
  res.json([
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      rating: {
        rate: 4.1,
        count: 259,
      },
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
      rating: {
        rate: 4.7,
        count: 500,
      },
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
      rating: {
        rate: 2.1,
        count: 430,
      },
    },
  ]);
});

app.post("/register", async (req, res) => {
  const { fullName, email, password } = req?.body;
  const response = await user.create({
    fullName,
    email,
    password,
  });
  return res.json({
    message: "User Created succefully",
  });
});
app.get("/user", (req, res) => {
  const user = user.find();
  return res.json({
    data: user,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await user.findOne({
      email: email,
    });

    if (!users) {
      return res.json({
        message: "User not registered Please SignUp",
      });
    }

    if (users.password === password) {
      return res.json({
        message: "User Logged In Successfully",
      });
    }
    console.log("users", users);
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: "Something went wrong",
    });
  }
  return res.json({
    message: "ok",
  });
});

/**
 * ADD PRODUCT API
 */

app.post("/products", async (req, res) => {
  const { name, price, category, description } = req.body;
  if (!name || !price || !category || !description) {
    return res.json({
      message: "Please provide all required fields",
    });
  }

  try {
    const productResponse = await Product.create({
      name,
      price,
      category,
      description,
    });

    if (productResponse) {
      return res.json({
        data: productResponse,
        message: "Product Added Succesfully",
      });
    }
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
    });
  }
});
/**
 * CRUD
 * C : Create
 * R : Read
 * U : Update
 * D : Delete
 * GET ALL PRODUCTS
 */

app.get("/products", async (req, res) => {
  const productsData = await Product.find();
  if (productsData) {
    return res.json({
      message: "Data fetched Successfully",
      data: productsData,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server Shuru ho gya listen karna ${PORT}`);
});
mongoose
  .connect(
    "mongodb+srv://jana11111_db_user:cgizEnhhw72bfoyK@cluster0.sxofbex.mongodb.net/janardhan12",
  )
  // jana11111_db_user
  //cgizEnhhw72bfoyK
  .then(() => {
    console.log("Database Connexted Suscessfully");
  })
  .catch((error) => {
    console.log("Database connect karte waqt", error);
  });
