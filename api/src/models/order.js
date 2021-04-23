 const mongoose = require('mongoose')

 const orderSchema = new mongoose.Schema({
    customer_name:{
        type:String,
        required:true,
        trim:true
    },
    cart:{
        type:Array,
        required:true 
    },
    delivered:{
        type:Boolean,
        default:false
    },
    paymentId:{
        type:String,
        required:true
    },
    customer_email:{
        type:String,
        required:true,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    }
 },{
     timestamps:true
 })

 const Order = mongoose.model('Order', orderSchema)
 module.exports = Order