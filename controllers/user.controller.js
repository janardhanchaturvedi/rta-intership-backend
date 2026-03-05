const { Product } = require("../models/product.model");
const { User } = require("./../models/user.model");

const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req?.body;
  const response = await User.create({
    fullName,
    email,
    password,
    role
  });
  return res.json({
    message: "User Created succefully",
  });
};

const getUser = (req, res) => {
  const user = User.find();
  return res.json({
    data: user,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await User.findOne({
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
        data: users,
        success: true
      });
    }
    console.log("users", users);
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: "Something went wrong",
    });
  }
};


const getSellerStats = async (req, res) => {
  const { sellerId } = req.query;
  try {
    const products = await Product.find({ sellerId: sellerId });
    const totalProducts = products.length;
    const totalRevenue = products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    const totalInStock = products.reduce((acc, product) => {
      return acc + (product.inStock ? 1 : 0);
    }, 0);
    return res.json({
      data: {
        totalProducts,
        totalRevenue,
        totalInStock,
      },
      message: "Seller Stats fetched successfully",
      success: true
    });
  } catch (error) {
    return res.json({
      message: "Something went wrong",
      success: false
    });
  }
}
module.exports = {
  registerUser,
  loginUser,
  getUser,
  getSellerStats
};
