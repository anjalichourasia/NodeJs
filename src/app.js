const express = require("express");
const app = express(); //creating new express js application
const connectDB = require("./config/database")
const Todo = require("./models/toDo");
const { authentication } = require("./middleware/auth")
const { err } = require("./middleware/err");

//handing incoming request : Request Handler

//added middleware to read JSON from postman

app.use(express.json()); 

app.post("/signUp", async (req, res) => {
    const toDoObj = req.body;
    try {    
        const toDo = new Todo(toDoObj); // created new instance of ToDo model
        await toDo.save()
        res.send("User added SuccessFully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

app.post("/signUpEasy", async (req, res) => {  
    const toDoObj = {
        title: "My second Todo",
        description: "Trial 2",
        dueDate: Date.now(),
        completed: false,
        user: "Anjali",
    }
    try {    
        const toDo = new Todo(toDoObj); // created new instance of ToDo model
        await toDo.save()
        res.send("User added SuccessFully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
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