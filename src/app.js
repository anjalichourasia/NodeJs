const express = require("express");
const app = express(); //creating new express js application
const { authentication } = require("./middleware/auth")
const { err } = require("./middleware/err");

//handing incoming request : Request Handler

app.use("/admin", authentication);

// put in end : order matter in routes and extension
app.get("/user", (req, res) => {
    throw err = Error("err")
    res.send("Welcome");
})

app.get("/admin/data", (req, res) => {
    res.send("Admin data");
})

app.get("/admin/delete", (req, res, next) => {
    res.send("Admin delete");
})

app.listen(3000, () => console.log("Server started on port 3000....")); // listening our web server on 3000 port\

// put at the end of ur application
app.use("/", err);

module.exports = { app };