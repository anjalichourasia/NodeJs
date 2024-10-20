const jwt = require('jsonwebtoken');
const UserDetail = require('../models/userDetail')

const authentication = async (req, res, next) => {
    try {
        // Read the token from cookie
        const cookie = req.cookies;

        const { token } = cookie;
        if(!token){
            throw new Error("token is not valid");
        }

        // process.env is best way
        const decodedObj = await jwt.verify(token, "mySecret@123");
        const { _id } = decodedObj;

        const user = await UserDetail.findById(_id);
        if(!user) {
            throw new Error("User not found");
        }
        console.log(user)
        req.user = user;
        next();
    } catch (err) {
        res.status(403).send(err.message);
    }
};

module.exports = { authentication };