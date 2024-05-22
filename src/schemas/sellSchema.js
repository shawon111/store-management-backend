const mongoose = require('mongoose');
const { Schema } = mongoose;

const sellSchema = new Schema({
    products: [
        {
            title: {
                type: String,
                required: true
            },
            productId: {
                type: String,
                required: true
            },
            purchasePrice: {
                type: Number,
                required: true
            },
            sellingPrice: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        }
    ],
    discount: {
        type: Number,
        required: true
    },
    totalPurchasePrice: {
        type: Number,
        required: true
    },
    totalSellingPrice: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ["BDT", "USD", "EUR"],
        required: true
    },
    timeOfSell: {
        type: Date,
        default: Date.now
    }
})

module.exports = sellSchema;