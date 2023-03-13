require("dotenv").config({ path: "../config.env" })

const path = require("path")
const express = require('express');
const http = require('http')
const app = express()
const server = http.createServer(app)
const cors = require('cors');
const axios = require('axios')

const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");

require("./mongo-connect")

const PORT = 4000;
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use("/users", userRouter);
app.use("/recipe", recipeRouter);

server.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});