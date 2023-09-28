const User = require("../models/UserModel")

const getUserByEmail = async (email) => {
    try {
        const result = User.findOne({email})
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUserByEmail
}