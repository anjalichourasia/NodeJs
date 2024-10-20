const cron = require("node-cron");
const Todo = require("../models/toDo");

// 0 0 * * *

const databaseScheduler = {
    scheduleDbStatus: async () => {
        try {
            const toDoList = await Todo.find();

            cron.schedule("0 0 * * * *", function(){
                const expiredDate = toDoList.filter(el => {
                    return el.dueDate < Date.now()
                }).map(getUser => {
                    console.log("user status need to be updated", getUser.user);
                    const status = async () => {
                        const updatedStatus = await Todo.updateMany({user: getUser.user}, {$set: {completed:true}});
                        console.log(updatedStatus);
                    } 
                });
            });
        } catch (err) {
            throw new Error("scheduleDbStatus");
        }

    }
}

module.exports = { databaseScheduler };