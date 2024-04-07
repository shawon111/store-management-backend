const mongoose = require('mongoose');
const {Schema} = mongoose;

const profitSchema = new Schema({
    totalProfit: {
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
    }
});

module.exports= profitSchema;