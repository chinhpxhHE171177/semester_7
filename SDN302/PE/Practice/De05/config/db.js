// config/db.js
const mogoose = require('mongoose');

const connectDB = async () => {
    try {
        await mogoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("Connect to MongoDB successfully!");
            });
    } catch (error) {
        console.error(`Connect failed, error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;