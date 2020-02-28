const mongoose = require('mongoose'); // Load mongoose module
const Schema = mongoose.Schema; // Data Structure

// Create recipe schema
const RecipeSchema = new Schema ({

    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    image: {
        type: String
    },
    source: {
        type: String
    },
    url: {
        type: String
    },
    yield: {
        type: Number
    },
    dietLabels: {
        type: Array
    },
    healthLabels: {
        type: [
            String
        ]
    },
    cautions: {
        type: [
            String
        ]
    },
    ingredientLines: {
        type: [
            String
        ]
    },
    ingredients: {
        type: [
            {
                text: {
                    type: String
                },
                weight: {
                    type: Number
                }
            }
        ]
    },
    calories: {
        type: Number
    },
    totalWeight: {
        type: Number
    },
    totalTime: {
        type: Number
    }
    
    // Add other keys
    }
)

// Create a recipe Model
const Recipe = mongoose.model('recipes', RecipeSchema);

module.exports = Recipe;