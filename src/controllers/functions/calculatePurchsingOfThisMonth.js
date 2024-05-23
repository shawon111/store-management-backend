const sellModel = require('../../models/sellModel');

const calculatePurchasingOfThisMonth = async() => {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const startOfNextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    try {
        const result = await sellModel.aggregate([
            {
                $match: {
                    timeOfSell: { $gte: startOfMonth, $lt: startOfNextMonth }
                }
            },
            {
                $group: {
                    _id: null,
                    totalPurchasing: { $sum: "$totalPurchasePrice" }
                }
            }
        ]);

        if (result.length > 0) {
            const totalPurchasing = result[0].totalPurchasing;
            return totalPurchasing;
        } else {
            return 0;
        }
    } catch (error) {
        console.error('Error calculating monthly profit:', error);
        return 0;
    }
}

module.exports = calculatePurchasingOfThisMonth;