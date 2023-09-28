const express = require("express")
const router = express.Router()

const authRouter = require("./authRouter.js")
const authMiddleware = require("../middlewares/authMiddleware.js")


router.get("/protected-route", authMiddleware , (req, res) => {
    return res.send("Hello")
})

router.use(authRouter)

module.exports = router;