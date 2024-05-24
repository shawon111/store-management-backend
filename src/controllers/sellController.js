const express = require('express');
const sellModel = require('../models/sellModel');
const handleStock = require('./functions/handleStock');
const calculateProfitOfThisMonth = require('./functions/calculateProfitOfThisMonth');
const calculateSelingOfThisMonth = require('./functions/calculateSellingOfThisMonth');
const calculatePurchasingOfThisMonth = require('./functions/calculatePurchsingOfThisMonth');
const router = express.Router();

// get all sells count
router.get('/count', async (req, res) => {
    try {
        const count = await sellModel.countDocuments();
        res.status(200).json(count);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// get all sells
router.get('/:page', async (req, res) => {
    const pageNumber = req.params.page;
    try {
        const sells = await sellModel.find({}).skip(12 * (pageNumber - 1)).limit(12);
        res.status(200).json(sells);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get recent sells
router.get('/recent', async (req, res) => {
    const pageNumber = req.params.page;
    try {
        const sells = await sellModel.find({}).limit(5);
        res.status(200).json(sells);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get single sell
router.get('/single/:id', async (req, res) => {
    const sellId = req.params.id;
    try {
        const sell = await sellModel.findOne({ _id: sellId });
        res.status(200).json(sell);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// post single sell
router.post('/add', async (req, res) => {
    const sellData = req.body;
    try {
        const checkStock = await handleStock(sellData);
        if (checkStock.status === true) {
            const sell = new sellModel(sellData);
            const result = await sell.save();
            res.status(200).json(result);
        } else {
            res.status(403).json({ error: checkStock.msg });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// post multiple sell
router.post('/add-many', async (req, res) => {
    const sellsData = req.body;
    try {
        const sells = await sellModel.insertMany(sellsData)
        res.status(200).json(sells);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// update sell
router.put('/update', async (req, res) => {
    const { sellId, updatedSell } = req.body;
    try {
        const filter = { _id: sellId };
        const update = { $set: updatedSell };
        const options = { new: true };

        const result = await sellModel.findOneAndUpdate(filter, update, options);

        if (!result) {
            return res.status(404).json({ error: 'sell not found' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// profit of this month from sell
router.get('/month/profit', async (req, res) => {
    try {
        const profit = await calculateProfitOfThisMonth();
        res.status(200).json(profit);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/month/selling', async (req, res) => {
    try {
        const sellingPrice = await calculateSelingOfThisMonth();
        res.status(200).json(sellingPrice);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/month/purchasing', async (req, res) => {
    try {
        const purchasingPrice = await calculatePurchasingOfThisMonth();
        res.status(200).json(purchasingPrice);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;