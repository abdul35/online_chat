const userService = require("../services/UserService")
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")
const tokenService = require("../services/TokenService")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        let errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            errors = null
            return
        }
      
        const user = await userService.getUserByEmail(email);

        if (user) {
            return res.status(401).json({
                message: `User with the email: ${email} is already registered.`
            })
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        
        await User.create({email, password: hashedPass, name: username})
        
        return res.status(200).json({
            message: "User succesfully registerred.",
        })
    } catch (error) {
        res.status(500).send("Server error...")
        console.error(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userService.getUserByEmail(email)

        if (!user) {
            return res.status(401).json({
                msg: "User not found."
            })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password) 
        

        if (!isPasswordCorrect) {
            return res.status(401).json({
                msg: "Invalid password."
            })
        }
        
        const token = await tokenService.getToken(user);
        
        res.status(201).json({
            token,
        })
    } catch (error) {
        res.status(500).send("Server error...")
        console.error(error.message)
    }
}

module.exports = {
    register,
    login
}