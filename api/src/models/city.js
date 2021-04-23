const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    cities:{
        type:Array,
        required:true
    }

})
const City = mongoose.model('City', citySchema)
module.exports = City