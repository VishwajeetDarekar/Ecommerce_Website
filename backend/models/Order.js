const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            product: { type: Object, required: true },
            qty: Number
        }
    ],
    total: Number
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
