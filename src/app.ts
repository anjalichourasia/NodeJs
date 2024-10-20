const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express(); //creating new express js application

const connectDB = require("./config/database")

const Todo = require("./models/toDo");
const UserDetail = require("./models/userDetail");

const { validateSignUpData } = require("./utils/validation")

const { authentication } = require("./middleware/auth")
const { err } = require("./middleware/err");

const { databaseScheduler } = require("./utils/database-scheduler")

//handing incoming request : Request Handler

//added middleware to read JSON from postman

app.use(express.json()); 

// we can access the cookie whenever it is passed
app.use(cookieParser());

//Cron job added
databaseScheduler.scheduleDbStatus()


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
app.get("/feed", authentication, async (req,res) => {
    const userName: string = req.body.user;
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

app.patch("/update", authentication, async (req, res) => {
    const newData = req.body;
    const toDoId = req.body.toDoId;
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

app.delete("/user", authentication, async (req, res) => {
    const toDoId = req.body.toDoId;
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

//without middleware to test

app.post("/signUpEasy", async (req, res) => {  
    const toDoObj = {
        title: "My second Todo",
        description: "Trial 2",
        dueDate: new Date(Date.now() + 7 * 3600000),
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
        // Validation of data
        
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

        const isPasswordValid = await user.validatePassword(password);
        
        if (!isPasswordValid){
            res.status(404).send("User not found");
        } else {
            // Create JWT token
            const token = await user.getJWT();
            res.cookie("token", token, { 
                expires: new Date(Date.now() + 7 * 3600000)
            });
        }
        res.send("User signUp SuccessFully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

// Get Profile after Login

app.get("/profile", authentication, async (req, res) => {
    try {
        const user: String = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message)
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