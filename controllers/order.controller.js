const Order = require('../models/orders.model');

const bookOrder = (req, res) => {
    const { productsId, buyerId, totalPrice } = req.body;
    try {
        const orderResponse = Order.create({
            productsId,
            buyerId,
            totalPrice
        });
        return res.json({
            message: "Order Placed Successfully",
            data: orderResponse
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