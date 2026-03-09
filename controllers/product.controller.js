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
  const { name, price, category, description, inStock, sellerId, image } = req.body;
  if (!name || !price || !category || !description || !sellerId) {
    return res.json({
      message: "Please provide all required fields",
      sucess: false
    });
  }

  try {
    const productResponse = await Product.create({
      name,
      price,
      category,
      description,
      inStock,
      sellerId,
      image
    });

    if (productResponse) {
      return res.json({
        data: productResponse,
        message: "Product Added Succesfully",
        sucess: true
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResponse = await Product.findByIdAndDelete(id);
    return res.json({
      message: "Product deleted successfully",
      data: deleteResponse
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: "Internal Server Error",
    });
  }
};

const updateProduct = (req, res) => { };
      
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productData = await Product.findOne({ _id: id });
    if (productData) {
      return res.json({
        message: "Product fetched successfully",
        data: productData
      });
    } else {
      return res.json({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: "Internal Server Error",
    });
  }
};


module.exports = {
  getProducts,
  addProducts,
  deleteProduct,
  updateProduct,
  getProductById
};
