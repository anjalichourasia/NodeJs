const mongoose  = require("mongoose");

const ToDOList = {
    title: {
        type: String,
        maxLength: 20,
    },
    description: {
        type: String,
        maxLength: 40,
    },
    dueDate: {
        type: Date,
        required: true,
        validate(value) {
            if(value <= Date.now()){
                throw new Error("Date is already expired");
            }
        },
    },
    completed: {
        type: Boolean,
        required: true,
    },
    user: {
        type: String,
        required: true,
        unique: true,
    }
}
const toDoSchema = new mongoose.Schema(ToDOList);

const ToDoModel = mongoose.model("toDo", toDoSchema);

module.exports = ToDoModel;