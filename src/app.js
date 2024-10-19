const express = require("express");
const app = express(); //creating new express js application
const connectDB = require("./config/database")
const { authentication } = require("./middleware/auth")
const { err } = require("./middleware/err");

//handing incoming request : Request Handler


connectDB()
    .then(() => {
        console.log("Database is connected....");
        app.listen(3000, () => console.log("Server started on port 3000....")); // listening our web server on 3000 port\
    })
    .catch(() => {
        console.log("Database is throw error while connecting....");
    })

// put at the end of ur application
app.use("/", err);

module.exports = { app };