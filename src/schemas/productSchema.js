const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
    title: {
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
    stock: {
        type: Number
    }
});

module.exports = productSchema;