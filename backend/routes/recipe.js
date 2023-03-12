const express = require("express");
const recipeRouter = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");

// create recipe
recipeRouter.post("/add-recipe", async (req, res) => {
    const user = req.body.user;
    const ingredients = req.body.ingredients;
    const recipe = new Recipe({
        itemName: req.body.itemName,
        description: req.body.description,
        steps: req.body.steps,
        author: user._id
    })
    try {
        await recipe.save();
        // add ingredients
        for(let i = 0; i < ingredients.length; i++) {
            ingredients[i].name = ingredients[i].name.toLowerCase();
            // check if ingredient already present
            const existingIngredient = await Ingredient.findOne({name: ingredients[i].name})
            if(existingIngredient) {
                await Ingredient.updateOne({_id: existingIngredient._id}, {$push: {itemIdList: recipe._id}});
                await Recipe.updateOne({_id: recipe._id}, {$push: {ingredients: {
                    id: existingIngredient._id,
                    quantity: parseFloat(ingredients[i].quantity),
                    measure: ingredients[i].measure
                }}})
            }
            else {
                const newIngredient = new Ingredient({
                    name: ingredients[i].name,
                    itemIdList: [recipe._id]
                })
                await newIngredient.save();
                await Recipe.updateOne({_id: recipe._id}, {$push: {ingredients: {
                    id: newIngredient._id,
                    quantity: parseFloat(ingredients[i].quantity),
                    measure: ingredients[i].measure
                }}})
                recipe.save();
            }
        }
        res.status(201).send("Recipe added successfully");
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// update recipe
recipeRouter.post("/update-recipe", async (req, res) => {
    try {
        const recipeParam = req.body.recipe
        // const recipe = await Recipe.findOneAndUpdate({_id: recipeParam._id}, {itemName: recipeParam.itemName, description: recipeParam.description, steps: recipeParam.steps})
        await Recipe.findByIdAndDelete({_id: recipeParam._id})
        // add recipe
        const user = req.body.user;
        const ingredients = req.body.ingredients;
        const recipe = new Recipe({
            _id: recipeParam._id,
            itemName: req.body.itemName,
            description: req.body.description,
            steps: req.body.steps,
            author: user._id
        })
        await recipe.save();
        // add ingredients
        for(let i = 0; i < ingredients.length; i++) {
            ingredients[i].name = ingredients[i].name.toLowerCase();
            // check if ingredient already present
            const existingIngredient = await Ingredient.findOne({name: ingredients[i].name})
            if(existingIngredient) {
                await Ingredient.updateOne({_id: existingIngredient._id}, {$push: {itemIdList: recipe._id}});
                await Recipe.updateOne({_id: recipe._id}, {$push: {ingredients: {
                    id: existingIngredient._id,
                    quantity: parseFloat(ingredients[i].quantity),
                    measure: ingredients[i].measure
                }}})
            }
            else {
                const newIngredient = new Ingredient({
                    name: ingredients[i].name,
                    itemIdList: [recipe._id]
                })
                await newIngredient.save();
                await Recipe.updateOne({_id: recipe._id}, {$push: {ingredients: {
                    id: newIngredient._id,
                    quantity: parseFloat(ingredients[i].quantity),
                    measure: ingredients[i].measure
                }}})
                recipe.save();
            }
        }
        res.status(201).send("Recipe updated successfully");
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// update votes
recipeRouter.post("/update-votes", async (req, res) => {
    const voteStatus = req.body.voteStatus
    const recipeId = req.body.recipeId
    console.log("updating ... ", voteStatus, recipeId)
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
        res.status(400).send(error)
    }
})

// get my recipes
recipeRouter.get("/my-recipes", async (req, res) => {
    try {
        const user = req.query.user;
        // let myRecipes = await Recipe.find({author: user._id}).populate('author')
        let myRecipes = await Recipe.find({author: user._id})
        res.status(200).send(myRecipes);
    } catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
})


// get all recipes
recipeRouter.get("/all", async (req, res) => {
    try {
        const allRecipes = await Recipe.find({})
        res.status(200).send(allRecipes);
    } catch (error) {
        res.status(400).send(error)
    }
})

// get all recipes sorted by upvotes
// get all recipes
recipeRouter.get("/top", async (req, res) => {
    try {
        const allRecipes = await Recipe.find({}).sort({upvotes: 'desc'})
        res.status(200).send(allRecipes);
    } catch (error) {
        res.status(400).send(error)
    }
})

// get recipe by pattern
recipeRouter.get("/pattern", async (req, res) => {
    const reg = new RegExp(`${req.query.itemName}`);
    try {
        // const matchingRecipes = await Recipe.find({ itemName: { $regex: reg, $options: "sxmi" } }).populate('author')
        const matchingRecipes = await Recipe.find({ itemName: { $regex: reg, $options: "i" } })
        console.log("Found %s results", matchingRecipes.length)
        res.status(200).send(matchingRecipes);
    } catch (error) {
        res.status(400).send(error)
    }
})

// get recipe by id
recipeRouter.get("/:id", async (req, res) => {
    try {
        const recipeId = req.params.id
        // let recipe = await Recipe.findOne({_id: recipeId}).populate('author').populate('ingredients.id')
        let recipe = await Recipe.findOne({_id: recipeId}).populate('ingredients.id')
        res.status(200).send(recipe);
    } catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// delete recipe
recipeRouter.post("/delete", async (req, res) => {
    try {
        const recipeId = req.body.id
        await Recipe.findByIdAndDelete({_id: recipeId})
        res.status(200).send("Recipe deleted successfully");
    } catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
})


module.exports = recipeRouter