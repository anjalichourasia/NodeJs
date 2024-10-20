const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express(); //creating new express js application

const connectDB = require("./config/database")

const Todo = require("./models/toDo");
const UserDetail = require("./models/userDetail");

const { validateSignUpData } = require("./utils/validation")

const { authentication } = require("./middleware/auth")
const { err } = require("./middleware/err");

//handing incoming request : Request Handler

//added middleware to read JSON from postman

app.use(express.json()); 

// we can access the cookie whenever it is passed
app.use(cookieParser());
// 1. CREATE
app.post("/create", async (req, res) => {
    const toDoObj = req.body;
    try {    
        const toDo = new Todo(toDoObj); // created new instance of ToDo model
        await toDo.save()
        res.send("User added SuccessFully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

// 2. READ
// get user from database
app.get("/feed", async (req,res) => {
    const userName = req.body.user;
    console.log(userName)
    try {
    const toDoList = await Todo.find({user: userName});
    if(toDoList.length === 0) {
        res.status(404).send("User not found");
    } else {
        res.send(toDoList);
    }
    } catch (err) {
        res.status(400).send("Get api not working....");
    }
})

// 3. UPDATE
// Put or patch can be used to update depend if u want to update whole or some part

app.patch("/update", async (req, res) => {
    const newData = req.body;
    const toDoId = req.body.toDoId;
    console.log("newData", newData);
    console.log("toDoId", toDoId);
    try {    
        const toDoList = await Todo.findByIdAndUpdate({ _id: toDoId}, newData, { runValidators: true});
        if(!toDoList) {
            res.status(404).send("User not found");
        } else {
            res.send("User updated SuccessFully")
        }
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

// 4. DELETE

app.delete("/user", async (req, res) => {
    const toDoId = req.body.toDoId;
    console.log(toDoId)
    try {
        if (!toDoId) {
            res.status(404).send("User not found");
        }
        const toDoList = await Todo.findByIdAndDelete(toDoId);
        if(toDoList.length === 0) {
            res.status(404).send("User not found to Delete");
        } else {
            res.send("User deleted Successfully");
        }
    } catch (err) {
        res.status(400).send("Something went wrong while deleting....")
    }
})

app.post("/signUpEasy", async (req, res) => {  
    const toDoObj = {
        title: "My second Todo",
        description: "Trial 2",
        dueDate: Date.now(),
        completed: false,
        user: "Anjali",
        _id: "9999e4e3fc5f26cf73b9e043"
    }
    try {    
        const toDo = new Todo(toDoObj); // created new instance of ToDo model
        await toDo.save()
        res.send("User added SuccessFully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

// SIGN IN

app.post("/signIn", async (req, res) => { 
    try {  
        validateSignUpData(req)  ;
        const { email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)
        // Validation of data
        // const userDetailObj = req.body;
        const userDetail = new UserDetail({
            email,
            password: passwordHash
        }); // created new instance of ToDo model
        await userDetail.save()
        res.send("User signUp SuccessFully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

// LOGIN

app.post("/login", async (req, res) => { 
    try {  
        const { email, password } = req.body;

        if(!email || !password){
            res.status(404).send("User not found");
        }

        const user = await UserDetail.findOne({email: email});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            res.status(404).send("User not found");
        } else {
            // Create JWT token
            const token = await jwt.sign({ _id: user._id}, "mySecret@123")
            console.log(token)
            res.cookie("token", token);
            console.log("send cookies")
        }
        res.send("User signUp SuccessFully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

// Get Profile after Login

app.get("/profile", async (req, res) => {
    const cookie = req.cookies;
    if(cookie) {
        //validate token to be added
        console.log(cookie);
        res.send("User detail fetch from db and send it")
    }
})

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