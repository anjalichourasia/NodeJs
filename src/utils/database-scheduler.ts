const cron = require("node-cron");
const Todo = require("../models/toDo");

const databaseScheduler = {
    scheduleDbStatus: async () => {
        try {
            const toDoList = await Todo.find();

            cron.schedule("0 0 * * * *", function(){
                const expiredDate = toDoList.filter(el => {
                    return el.dueDate < Date.now()
                }).map(getUser => {
                    const status = async () => {
                        const updatedStatus = await Todo.updateMany({user: getUser.user}, {$set: {completed:true}});
                        console.log("Cron job Activated");
                    } 
                });
            });
        } catch (err) {
            throw new Error("scheduleDbStatus");
        }
    }
}

module.exports = { databaseScheduler };