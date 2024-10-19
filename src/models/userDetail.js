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
    }
}
const userDetailSchema = new mongoose.Schema(
    userDetail,
    {
        timestamps: true,
});

const UserDetailModel = mongoose.model("userDetail", userDetailSchema);

module.exports = UserDetailModel;