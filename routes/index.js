const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const fs = require("fs")
const connection = require("../db/connection")

router.get("/", (req, res) => {
    res.send("Main page")
})


router.get(`/signup`, (req, res) => {
    try {
        const pvt_key = fs.readFileSync('./keys/rsa.key', 'utf8');


        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        });
        connection.end();

        const token = jwt.sign({ userName: 'lolkek' }, pvt_key, { algorithm: 'RS256', expiresIn: "1h" })

        return res.send("<h1>" + token + "</h1>")
    } catch (error) {
        res.status(500).send("Server error...")
        console.error(error)
    }
})

router.get(`/login`, (req, res) => {
    try {
        // const data = jwt.verify(token, process.env.TOKEN_SECRET, { algorithm: 'RS256', expiresIn: "4m" })
        res.send(data)
    } catch (error) {
        res.status(500).send("Server error...")
        console.error(error)
    }
})

module.exports = router;