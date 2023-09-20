const express = require("express")
const router = express.Router()

const authRouter = require("./authRouter.js")
const authMiddleware = require("../middlewares/authMiddleware.js")

// router.get("/", (req, res) => {
//     console.log(req.body);
//     res.send("Main page")
// })

router.use(authRouter)

router.get("/protected-route", authMiddleware ,() => {
    
})

module.exports = router;