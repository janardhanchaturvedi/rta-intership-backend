const Order = require('../models/orders.model');
const mongoose = require('mongoose');

const bookOrder = (req, res) => {
    // const { productsId, buyerId, totalPrice } = req.body;
    const { products, buyerId, totalPrice } = req.body;
    console.log("Products in order:", buyerId);
    try {
        const newProducts = products.map((product) => {
            return new mongoose.Types.ObjectId(product);
        });
        const order = new Order({
            products: newProducts,
            buyerId,
            totalAmount: totalPrice
        });
        const orderResponse = order.save();
        return res.json({
            message: "Order Placed Successfully",
            data: orderResponse,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error placing order",
            error: error.message
        });
    }

}
module.exports = {
    bookOrder
}