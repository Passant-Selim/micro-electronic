const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URL;

async function dbConnection () {
    try {
        mongoose.connect(mongo_url);
        console.log("db is connected");
    } catch (error) {
        console.log(error);
    }
}

dbConnection();