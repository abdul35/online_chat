const jwt = require("jsonwebtoken")
const fs = require("fs")
const connection = require("../db/connection")
const bcrypt = require("bcrypt")
const authService = require("../services/UserService")

const register = async (req, res) => {
    try {
        const pvt_key = fs.readFileSync('./keys/rsa.key', 'utf8');
        const { username, email, password } = req.body
        console.log(req);
        if (!username.length || typeof username !== 'string' ||
            !password.length || typeof password !== 'string' ||
            !email.length || typeof email !== 'string') {
            return res
                .status(400)
                .send("Invalid email or password");
        }

        const user = await authService.getUserByEmail(email);
        
        const token = jwt.sign({ userName: user.name }, pvt_key, { algorithm: 'RS256', expiresIn: "1h" })


        
        

        return res.send("<h1>" + token + "</h1>")
    } catch (error) {
        res.status(500).send("Server error...")
        console.error(error)
    }
}

const login = (req, res) => {
    try {
        // const data = jwt.verify(token, process.env.TOKEN_SECRET, { algorithm: 'RS256', expiresIn: "4m" })
        res.send(data)
    } catch (error) {
        res.status(500).send("Server error...")
        console.error(error)
    }
}

module.exports = {
    register,
    login
}