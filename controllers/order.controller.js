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
const getBuyerOrders = async (req, res) => {
    const { buyerId } = req.params;
    try {
        const orders = await Order.find({ buyerId }).populate('products');

        console.log("Orders for buyer:", orders);
        return res.json({
            message: "Orders fetched successfully",
            data: orders,
            count: orders ? orders.length : 0,
            success: true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
}

module.exports = {
    bookOrder,
    getBuyerOrders
}