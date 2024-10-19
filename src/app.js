const express = require("express");
const app = express(); //creating new express js application
require("./config/database")
const { authentication } = require("./middleware/auth")
const { err } = require("./middleware/err");

//handing incoming request : Request Handler



app.listen(3000, () => console.log("Server started on port 3000....")); // listening our web server on 3000 port\

// put at the end of ur application
app.use("/", err);

module.exports = { app };