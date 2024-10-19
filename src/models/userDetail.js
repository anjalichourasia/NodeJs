const mongoose  = require("mongoose");

const userDetail = {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 20,
    },
}
const userDetailSchema = new mongoose.Schema(userDetail);

const UserDetailModel = mongoose.model("userDetail", userDetailSchema);

module.exports = UserDetailModel;