const express = require("express");
const recipeRouter = express.Router();
const Recipe = require("../models/recipe");
const axios = require("axios")

// create recipe
recipeRouter.post("/add", async (req, res) => {
    const user = req.body.user;
    // upload image
    // console.log("uploading image")
    // const imageUploadResponse = await axios.post(`https://freeimage.host/api/1/upload?key=${process.env.IMAGE_HOST_API_KEY}&action=upload&source=${req.body.imageUrl}`)
    // console.log(imageUploadResponse)
    // if(imageUploadResponse.statusCode !== 200) throw "Error uploading image " + imageUploadResponse.data
    // const imageUrl = imageUploadResponse.data.image.url
    let recipe = new Recipe({
        itemName: req.body.itemName,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        author: user._id,
        imageUrl: req.body.imageUrl
    })
    try {
        await recipe.save();
        res.status(201).send("Recipe added successfully");
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// update recipe
recipeRouter.post("/update", async (req, res) => {
    try {
        await Recipe.updateOne({_id: req.body.recipeId}, {
            itemName: req.body.itemName,
            description: req.body.description,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            imageUrl: req.body.imageUrl
        })
        res.status(200).send("Recipe updated successfully");
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// update votes
recipeRouter.post("/update-votes", async (req, res) => {
    const voteStatus = req.body.voteStatus
    const recipeId = req.body.recipeId
    try {
        const recipe = await Recipe.findOne({_id: recipeId})
        if(voteStatus.upAdd !== 0) {
            await Recipe.updateOne({_id: recipeId}, {
                $set: {'upvotes': recipe.upvotes + voteStatus.upAdd}
            })
        }
        if(voteStatus.downAdd !== 0) {
            await Recipe.updateOne({_id: recipeId}, {
                $set: {'downvotes': recipe.downvotes + voteStatus.downAdd}
            })
        }
        res.status(200).send("Votes updated");
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// get my recipes
recipeRouter.get("/my-recipes", async (req, res) => {
    try {
        const user = req.query.user;
        let myRecipes = await Recipe.find({author: user._id})
        res.status(200).send(myRecipes);
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})


// get all recipes
recipeRouter.get("/all", async (req, res) => {
    try {
        const allRecipes = await Recipe.find({})
        res.status(200).send(allRecipes);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// get all recipes sorted by upvotes
recipeRouter.get("/top", async (req, res) => {
    try {
        const allRecipes = await Recipe.find({}).sort({upvotes: 'desc'})
        res.status(200).send(allRecipes);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// get recipe by pattern
recipeRouter.get("/search", async (req, res) => {
    const reg = new RegExp(`${req.query.itemName}`);
    try {
        const matchingRecipes = await Recipe.find({ itemName: { $regex: reg, $options: "i" } })
        res.status(200).send(matchingRecipes);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// get recipe by id
recipeRouter.get("/:id", async (req, res) => {
    try {
        let recipe = await Recipe.findOne({_id: req.params.id})
        res.status(200).send(recipe);
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// delete recipe
recipeRouter.post("/delete", async (req, res) => {
    try {
        await Recipe.findByIdAndDelete({_id: req.body.id})
        res.status(200).send("Recipe deleted successfully");
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})


module.exports = recipeRouter