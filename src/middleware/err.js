const err = (err, req, res, next) => {
    console.log("I am in Handler")
    if(err){
        res.status(500).send("Something went wrong");
    }
}

module.exports = { err };