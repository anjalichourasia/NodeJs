const authentication = (req, res, next) => {
    console.log("authenticated for admin");
    const token = "xyz"
    const isAuthenticated = token === "xyz";
    if(!isAuthenticated){ 
        res.status(401).send("UnAutherized")
    } else {
        next();
    }
};

module.exports = { authentication };