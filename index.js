require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT
const path = require("path")
const routes = require("./routes/routes")
const connectToDb = require("./database/db")


connectToDb()
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}))
app.use(routes)


app.listen(port, () => {
    console.log("Server is running")
})
