require("dotenv").config()

const path = require("path")
const express = require('express');
const http = require('http')
const app = express()
const server = http.createServer(app)
const cors = require('cors');

const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");

require("./mongo-connect")

const PORT = process.env.PORT || 8000;
app.use(cors())
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb'}));

app.use("/users", userRouter);
app.use("/recipe", recipeRouter);

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function(_, res) {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function(err) {
            res.status(500).send(err);
        }
    )
}) 

server.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});