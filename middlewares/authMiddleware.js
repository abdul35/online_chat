const jwt = require("jsonwebtoken")
const fs = require('fs/promises')

const authMiidleware = async (req, res, next) => {
        try {
            const token = req.headers.authorization
            const pub_key = await fs.readFile('./keys/rsa.key.pub', 'utf8');
            
            jwt.verify(token.split(' ')[1], pub_key)
            
            next()
        } catch (error) {
            console.log(error);
            // next(error)
        }
    }


module.exports = authMiidleware