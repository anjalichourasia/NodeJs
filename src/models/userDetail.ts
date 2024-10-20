const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDetail = {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}
const userDetailSchema = new mongoose.Schema(
    userDetail, {
        timestamps: true,
});

userDetailSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id}, "mySecret@123", {
        expiresIn: '1h'
    })

    return token;
}

userDetailSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid =  await bcrypt.compare(
        passwordInputByUser, 
        passwordHash
    );
    return isPasswordValid;
}

module.exports = mongoose.model("UserDetail", userDetailSchema);