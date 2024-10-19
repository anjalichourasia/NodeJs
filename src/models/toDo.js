const mongoose  = require("mongoose");

const toDoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    completed: {
        type: Boolean
    },
    user: {
        type: String
    },
});

const ToDoModel = mongoose.model("toDo", toDoSchema);

module.exports = ToDoModel;