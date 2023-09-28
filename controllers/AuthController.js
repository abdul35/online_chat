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
      
        if (!username || typeof username !== 'string'   ||
            !password || !email || typeof email !== 'string') {
            return res
                .status(400)
                .send("Invalid email or username or password");
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
        const user = await User.findOne({email})

        if (!user) {
            return res.status(401).json({
                msg: "User not found."
            })
        }
        // console.log(user,password, user.password);
        const isPasswordCorrect = await bcrypt.compare(password, user.password) 
        
        // bcrypt.compare(password, user.hash, (err, res) => {
        //     if (err) return console.log(err);
        //     if (!res) return console.log(new Error('Invalid password'));
            
        //     // const token = jwt.encode({
        //     //  username: username,
        //     //  expire: Date.now() + (1000 * 60 * 60) //1 hour
        //     // }, tokenSecret);
            
        //     console.log(null, token);
        //    });


        if (!isPasswordCorrect) {
            return res.status(401).json({
                msg: "Invalid password."
            })
        }
        // console.log("user ===== ",user);
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