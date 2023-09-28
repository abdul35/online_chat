const fs = require('fs/promises')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const getToken = async (user) => {
    try {
        const pvt_key = await fs.readFile('./keys/rsa.key', 'utf8');
        // console.log("pvt_key === ",pvt_key);
        const {id, name} = user
        const token = jwt.sign({ id, userName: name }, pvt_key, { algorithm: 'RS256', expiresIn: "1h" })
    
        return token
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {     
    getToken
}