require("dotenv").config()
const express = require("express")
const routes = require("./routes/index")
const connection = require("./db/connection")
const app = express()


app.use(express.json())
app.use(routes)


app.listen(process.env.PORT, () => {
    try {
        connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            console.log('connected as id ' + connection.threadId);
        });
        console.log("Server has been started!", process.env.PORT)
    } catch (error) {
        console.log(error);
    }
});