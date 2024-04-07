const productModel = require('../../models/productModel')

const handleStock = async (sellData) => {
    let errorMessage;
    const { products } = sellData;
    try {
        for (const product of products) {
            const getProduct = await productModel.findOne({ _id: product.productId });
            if (getProduct) {
                if (getProduct.stock >= product.quantity) {
                    const updateStock = await productModel.findOneAndUpdate({ _id: product.productId }, { $inc: { stock: -product.quantity } })
                    if (!updateStock) {
                        errorMessage = "stock update failed"
                        return { status: false, msg: errorMessage }
                    }
                } else {
                    errorMessage = `${product.title} is not in stock`;
                    return { status: false, msg: errorMessage }
                }
            } else {
                errorMessage = `there is no product called ${product.title}`
                return { status: false, msg: errorMessage }
            }
        }
        return { status: true, msg: "stock updated" }
    } catch (err) {
        console.error("error from stock update", err)
        errorMessage = "stock update failed"
        return { status: false, msg: errorMessage }
    }
}

module.exports = handleStock;