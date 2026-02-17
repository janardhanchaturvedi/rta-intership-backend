const { Product } = require("./../models/product.model");

const getProducts = async (req, res) => {
  const productsData = await Product.find();
  if (productsData) {
    return res.json({
      message: "Data fetched Successfully",
      data: productsData,
    });
  }
};

const addProducts = async (req, res) => {
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
    console.log("error", error);
    return res.json({
      message: "Internal Server Error",
    });
  }
};

const deleteProduct = (req, res) => {};

const updateProduct = (req, res) => {};

module.exports = {
  getProducts,
  addProducts,
  deleteProduct,
  updateProduct,
};
