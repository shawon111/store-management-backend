const mongoose = require("mongoose");
const profitSchema = require("../schemas/profitSchema");

const profitModel = mongoose.model('Profit', profitSchema)

module.exports = profitModel;