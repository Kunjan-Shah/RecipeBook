const express = require("express");
const ingredientRouter = express.Router();
const Ingredient = require("../models/ingredient")
const Recipe = require("../models/recipe")

// get all ingredients
ingredientRouter.get("/all", async (req, res) => {
    try {
        const allIngredients = await Ingredient.find({})
        res.status(200).send(allIngredients);
    } catch (error) {
        res.status(400).send(error)
    }
})

// get recipe by ingredient name
ingredientRouter.get("/pattern", async (req, res) => {
    const reg = new RegExp(`${req.query.itemName}`);
    try {
        const matchingIngredients = await Ingredient.find({ name: { $regex: reg, $options: "sxmi" } }).populate('itemIdList')
        let matchingRecipes = []
        for(let i = 0; i < matchingIngredients.length; i++) {
            matchingRecipes = matchingRecipes.concat(matchingIngredients[i].itemIdList)
        }
        // remove duplicates
        matchingRecipes = matchingRecipes.filter((item, index) => matchingRecipes.indexOf(item) === index);
        res.status(200).send(matchingRecipes);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = ingredientRouter