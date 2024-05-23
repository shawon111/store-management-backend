const mongoose = require('mongoose');
const { Schema } = mongoose;

const profitSchema = new Schema({
    totalProfit: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

module.exports = profitSchema;