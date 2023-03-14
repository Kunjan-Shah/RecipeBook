const mongoose = require("mongoose")
const Schema = mongoose.Schema

let recipeSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: "https://atlasbiomed.com/blog/content/images/2020/04/Superfoods-microbiome-gut-health.png"
    },
    description: {
        type: String,
    },
    ingredients: [{
        name: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 0
        },
        measure: {
            type: String,
        }
    }],
    steps: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true
    },
},
    { timestamps: true }
);

recipeSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("Recipe", recipeSchema)
