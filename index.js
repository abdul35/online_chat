require("dotenv").config()
const express = require("express")
const routes = require("./routes/index")
const connection = require("./db/connection")()
const { Sequelize } = require("sequelize")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get("/", (req, res) => {
    console.log(req.body);
    res.send("Main page")
})
app.use(routes)



const main = async () => {
    try {
        app.listen(process.env.PORT, () => console.log("Server has been started!", process.env.PORT));
        await connection.authenticate();
        let db = {}
        db.Sequelize = Sequelize
        db.sequelize = connection
        db.users = require("./models/UserModel")
        
        console.log('[DB] - Connection has been established successfully.');
        db.sequelize.sync()

    } catch (error) {
        console.log(error);
    }
}

main()