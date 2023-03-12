const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");

// create user
userRouter.post("/signup", async (req, res) => {
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
        try {
            await user.save()
            const userData = await User.findOne({email: req.body.email})
            res.status(201).send(userData);
        } catch (error) {
            res.status(400).send(error)
        }
    }
})

// find user details. If exists -> login
userRouter.post("/login", async (req, res) => {
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
        // return user details and all recipes authored by the user
        // const recipesAuthoredList = user.recipesAuthored;
        // let myRecipe = []
        // for(let i = 0; i < recipesAuthoredList.length; i++) {
        //     const recipe = await Recipe.findOne({_id: recipesAuthoredList[i]});
        //     myRecipe.push(recipe);
        // }
        res.status(200).send(user);
    }
})

module.exports = userRouter