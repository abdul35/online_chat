const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authoriztion
        console.log(token);
        const pub_key = fs.readFileSync('./keys/rsa.key.pub', 'utf8');
        jwt.verify(token, pub_key)
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}