const mongoose = require("mongoose");

let cartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId
    },
    amount: {
        type: Number,
        required: [true,'amount required']
    },
    totalPrice: {
        type: Number,
    },
   cartID: {
        type: String,
    }
});

let CartItemModel = mongoose.model("CartItem", cartItemSchema);

module.exports = {
    CartItemModel
}