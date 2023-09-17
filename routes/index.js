const express = require("express")
const router = express.Router()

const authRouter = require("./authRouter.js")

// router.get("/", (req, res) => {
//     console.log(req.body);
//     res.send("Main page")
// })

router.use(authRouter)

module.exports = router;