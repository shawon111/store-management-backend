const dotenv = require('dotenv')
const mongoose = require('mongoose');
dotenv.config();
const connectionString = process.env.DB_CONN_STRING;
const connectDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('Database connected successfully!')
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;