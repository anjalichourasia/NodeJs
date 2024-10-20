const cron = require("node-cron");
const Todo = require("../models/toDo");

// 0 0 * * *

const databaseScheduler = {
    scheduleDbStatus: async () => {
        try {
            // const toDoList = await Todo.find();
            // console.log(toDoList)
            const toDoList = await Todo.updateMany({user: "Arya"}, {$set: {completed:true}});
            console.log(toDoList)
            cron.schedule("0 * * * * *", function(){
                console.log("Cron called very second");
            });
        } catch (err) {
            throw new Error("scheduleDbStatus");
        }

    }
}

module.exports = { databaseScheduler };