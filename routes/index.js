const express = require("express")
const router = express.Router()
const { get } = router


get("/", (req, res) => {
    console.log(require('crypto').randomBytes(64).toString('hex'))
    res.send("Main page")
})


get(`/login`, (req, res) => {
    console.log('login page route')
    res.send("login page")
})

module.exports = router;