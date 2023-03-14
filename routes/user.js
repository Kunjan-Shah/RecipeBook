const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

// create user
userRouter.post("/signup", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.pwdHash
        })
        const existingUser = await User.findOne({email: req.body.email})
        if(existingUser) {
            res.status(223).send("User already exists")
        }
        else {
            await user.save()
            const userData = await User.findOne({email: req.body.email})
            res.status(201).send(userData);
        }
    } catch(error) {
        console.error(error)
        res.status(500).send(error)
    }
})

// find user details. If exists -> login
userRouter.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const pwdHash = req.body.pwdHash;
        const user = await User.findOne({email: email});
        if(!user) {
            res.status(208).send("User does not exist")
        }
        else if(user.password != pwdHash) {
            res.status(208).send("Incorrect password")
        }
        else {
            res.status(200).send(user);
        }
    } catch(error) {
        console.error(error)
        res.status(500).send(error)
    }
})

module.exports = userRouter