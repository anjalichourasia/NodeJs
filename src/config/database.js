const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017"); // it return promise
}

connectDB()
    .then(() => {
        console.log("Database is connected....");
    })
    .catch(() => {
        console.log("Database is throw error while connecting....");
    })