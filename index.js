const express = require('express');
const connectDB = require('./src/database/connectDB');
const app = express();
const port = process.env.PORT || 5000;

// import routers
const productRouter = require('./src/controllers/productController');
const sellRouter = require('./src/controllers/sellController');

// use json body data
app.use(express.json())

// connect database
connectDB();

// Product Route
app.use('/api/v1/products', productRouter)

// Sells Route
app.use('/api/v1/sell', sellRouter)

app.get('/', async (req, res) => {
    try {
        res.json("Hello World!")
    } catch (err) {
        res.json("There is an error occured, please try again later")
    }
});

// app error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        next('There was an error!');
    } else {
        if (err.message) {
            res.status(500).send(err.message);
        } else {
            res.status(500).send('There was an error!');
        }
    }
})

app.listen(port, () => {
    console.log(`The app is running at the port: ${port}`)
})