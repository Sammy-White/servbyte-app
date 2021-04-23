const mongoose = require('mongoose')
const validator = require('validator')

const serviceProviderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Email('Email is invalid!')
            }
        } 
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    logo:{
        type:String,
        default:""
    }
})
const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema)
module.exports = ServiceProvider