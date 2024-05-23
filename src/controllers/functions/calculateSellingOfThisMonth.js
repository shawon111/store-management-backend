const sellModel = require('../../models/sellModel');

const calculateSelingOfThisMonth = async() => {
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
                    totalSelling: { $sum: "$totalSellingPrice" }
                }
            }
        ]);

        if (result.length > 0) {
            const totalSelling = result[0].totalSelling;
            return totalSelling;
        } else {
            return 0;
        }
    } catch (error) {
        console.error('Error calculating monthly profit:', error);
        return 0;
    }
}

module.exports = calculateSelingOfThisMonth;