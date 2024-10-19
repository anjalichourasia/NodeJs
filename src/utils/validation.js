const validator = require("validator")

const validateSignUpData = (req) => {
    const { name, password} = req.body;
    if(!name || !password){
        throw new Error("Name or Password not found!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong Password!");
    }
}

module.exports = { validateSignUpData }