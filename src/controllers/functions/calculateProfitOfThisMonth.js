const sellModel = require('../../models/sellModel');

const calculateProfitOfThisMonth = async() => {
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
                    totalProfit: { $sum: "$profit" }
                }
            }
        ]);

        if (result.length > 0) {
            const totalProfit = result[0].totalProfit;
            return totalProfit;
        } else {
            return 0;
        }
    } catch (error) {
        console.error('Error calculating monthly profit:', error);
        return 0;
    }
}

module.exports = calculateProfitOfThisMonth;