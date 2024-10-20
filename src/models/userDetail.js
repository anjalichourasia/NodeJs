const mongoose  = require("mongoose");

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
    userDetail,
    {
        timestamps: true,
});

userDetailSchema.method.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id}, "mySecret@123", {
        expiresIn: '1h'
    })

    return token;
}

const UserDetailModel = mongoose.model("userDetail", userDetailSchema);

module.exports = UserDetailModel;