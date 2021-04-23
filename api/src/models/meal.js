const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price: {
        type: Number,
        required: true
    },
    preparation_time: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    pics: {
        type: String,
        default: "",
        required: true
    },
    plates:{
        type:Number,
        default:1
    },
    restaurant:{
        type:String,
        required:true,
        trim:true,
    },
    category:{
        type:String,
        required:true,
        trim:true
    }
})
const Meal = mongoose.model('Meal', mealSchema)
module.exports = Meal