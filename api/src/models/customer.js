const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Email('Email is invalid!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:7,
    },
    phone:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
 },{
     timestamps:true 
 })

 customerSchema.virtual('orders', {
     ref:'Order',
     localField:'_id',
     foreignField:'owner'
 })

 customerSchema.methods.toJSON = function(){
     const customer = this

     const customerObject = customer.toObject()

     delete customerObject.password
     delete customerObject.tokens

     return customerObject
 }

 //Generate auth token
 customerSchema.methods.generateAuthToken = async function(){
    const customer = this
    const token = jwt.sign({_id:customer._id.toString()}, process.env.JWT_SECRET_KEY)

    customer.tokens = customer.tokens.concat({token})
    await customer.save()

    return token
 }

 //Customer login
 customerSchema.statics.findByCredentials = async function(email, password){
    const customer = await Customer.findOne({email})

    if(!customer){
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, customer.password)

    if(!isMatch){
        throw new Error('Unable to login!')
    }

    return customer
 }

 //Hash password
 customerSchema.pre('save', async function(next){  
    const customer = this

    if(customer.isModified('password')){
        customer.password = await bcrypt.hash(customer.password, 8)
    }
    next()
 })

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer