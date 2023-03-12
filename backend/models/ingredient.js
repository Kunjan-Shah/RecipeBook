const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    itemIdList: [{
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: "Recipe"
    }],
},
    { timestamps: true }
);

module.exports = mongoose.model("Ingredient", ingredientSchema)
