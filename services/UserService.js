const User = require("../models/UserModel")

const getUserByEmail = async (email) => {
    try {
        
        return await User.findOne({where: {email}})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUserByEmail
}