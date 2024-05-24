const express = require('express');
const productModel = require('../models/productModel');
const router = express.Router();

// get all product count
router.get('/count', async (req, res) => {
    try {
        const count = await productModel.countDocuments();
        res.status(200).json(count);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// get all products
router.get('/:page', async (req, res) => {
    const pageNumber = req.params.page;
    try {
        const products = await productModel.find({}).skip(12 * (pageNumber - 1)).limit(12);
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// recent products
router.get('/recent', async (req, res) => {
    try {
        const products = await productModel.find({}).limit(5);
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get single product
router.get('/single/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productModel.findOne({ _id: productId });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// search product
router.get('/all/search', async (req, res) => {
    const searchText = req.query.s;
    try {
        const searchResult = await productModel.find({ $text: { $search: searchText } });
        res.status(200).json(searchResult);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// post product
router.post('/add', async (req, res) => {
    const productData = req.body;
    try {
        const product = new productModel(productData);
        const result = await product.save();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// update product
router.put('/update', async (req, res) => {
    const { productId, updatedProduct } = req.body;
    try {
        const filter = { _id: productId };
        const update = { $set: updatedProduct };
        const options = { new: true };

        const result = await productModel.findOneAndUpdate(filter, update, options);

        if (!result) {
            return res.status(404).json({ error: 'product not found' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;