const express = require("express");
const app = express(); //creating new express js application
const connectDB = require("./config/database")
const Todo = require("./models/toDo");
const { authentication } = require("./middleware/auth")
const { err } = require("./middleware/err");

//handing incoming request : Request Handler

app.post("/signUp", async (req, res) => {
    const toDoObj = {
        title: "My first Todo",
        description: "Trial 1",
        dueDate: Date.now(),
        completed: true,
        user: "Anjali",
    }

    const toDo = new Todo(toDoObj); // created new instance of ToDo model
    await toDo.save()
    res.send("User added SuccessFully")
});

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