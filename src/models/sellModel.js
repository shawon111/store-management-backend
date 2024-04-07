const mongoose = require('mongoose');
const sellSchema = require('../schemas/sellSchema');
const profitModel = require('./profitModel');

// update profit after saving the sell//
sellSchema.post('save', async function(doc){
    try{
        const updateProfit = await profitModel.findOneAndUpdate({
            _id: "660d8eb1b84ed71e5911013b"
        },
        {$inc: {
            totalProfit:doc.profit, 
            totalPurchasePrice:doc.totalPurchasePrice,
            totalSellingPrice:doc.totalSellingPrice}}
        )
    }catch(error){
        console.log(error)
        throw new Error("error")
    }
})

const sellModel = mongoose.model('Sell', sellSchema);

module.exports= sellModel;