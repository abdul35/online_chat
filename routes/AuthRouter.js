const express = require("express")
const router = express.Router()
const authController = require("../controllers/AuthController")
const {body} = require("express-validator")


router.post(`/register`, 
body("email").exists({values: "undefined" | "null" | "falsy" | undefined}).notEmpty().isEmail(),
        body("username").exists({values: "undefined" | "null" | "falsy" | undefined}).notEmpty().isString().isLength({min:5, max:15}),
        body("password").exists({values: "undefined" | "null" | "falsy" | undefined}).notEmpty().isStrongPassword(), 
authController.register)

router.get(`/login`, 
        body("email").exists({values: "undefined" | "null" | "falsy" | undefined}).notEmpty().isEmail(),
        body("password").exists({values: "undefined" | "null" | "falsy" | undefined}).notEmpty().isStrongPassword()
,authController.login)

module.exports = router;