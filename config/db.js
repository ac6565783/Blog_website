const mongoose = require("mongoose")
const colors = require("colors")
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongoDB database ${mongoose.connection.host}`.bgGreen.gray);
    } catch (error) {
        console.log(`mongo connect error ${error}`.bgWhite.cyan);
    }
}

module.exports = connectDB;