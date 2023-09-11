const express = require("express")
const routes = require("./routes/index")

const app = express()

const PORT = 3000;



app.use(routes)


app.listen(PORT, () => {
    console.log("Server has been started!")
});