const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        }],
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    totalAmount: Number,
}
    , {
        timestamps: true
    });
const Order = mongoose.model("Order", orderSchema);
module.exports = Order
