const express = require("express");
const app = express(); //creating new express js application

//handing incoming request : Request Handler
app.use((req, res) => {
 res.send("Hello from server");
})

app.listen(3000, () => console.log("Server started on port 3000....")); // listening our web server on 3000 port