const validator = require("validator")

const validateSignUpData = (req) => {
    const { email, password} = req.body;
    if(!email || !password){
        throw new Error("Name or Password not found!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong Password!");
    }else if(!validator.isEmail(email)){
        throw new Error("Please valid email");
    }
}

module.exports = { validateSignUpData }