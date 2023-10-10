const jwt = require("jsonwebtoken")
const fs = require('fs/promises')

const authMiidleware = async (req, res, next) => {
        try {
            const token = req.headers.authorization
            
            const pub_key = await fs.readFile('./keys/rsa.key.pub', 'utf8');
            
            await jwt.verify(token.split(' ')[1], pub_key, { algorithm: 'RS256' } )
            
            return next()

        } catch (error) {
            console.error(error);
            throw Error(error.message)
        }
    }


module.exports = authMiidleware