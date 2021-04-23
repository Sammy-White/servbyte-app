 const express = require('express')
 const Order = require('../models/order')
 const auth = require('../middlewares/auth')
 const sendOrderMail = require('../emails/mail')

 const router = new express.Router()

 router.post('/create/order', auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        owner:req.customer._id
    }) 

    try{
        await order.save()
        sendOrderMail(req.body.customer_name, req.body.customer_email)
        res.status(201).send({order, success:"You've successfully placed an order!"})
        
    }catch(e){
        res.status(400).send()
    }
 })

 router.get('/order/me', auth, async (req, res) => {

    try{
        await req.customer.populate({
            path:'orders',
            options:{
                sort:{
                    createdAt:-1
                }
            }
        }).execPopulate()
        res.send(req.customer.orders)  

    }catch(e){
        res.status(500).send()
    }
 })

 router.get('/orders', async (req, res) => {

    try{
        const orders = await Order.find({}).sort({createdAt:-1}).exec()
        res.send(orders)

    }catch(e){
        res.status(500).send()
    }
 })

 router.get('/order/:id', async (req, res) => {
     const _id = req.params.id

     try {
         const order = await Order.findById(_id)

         if (!order) {
             return res.status(404).send()
         }
         res.send(order)

     } catch (e) {
         res.status(500).send()
     }
 })

 router.patch('/order/:id', async (req, res) => {
     const _id = req.params.id
     const updates = req.body


     try {
         const order = await Order.findByIdAndUpdate(_id, updates, { new: true, runValidators: true })

         if (!order) {
             return res.status(404).send()
         }

         await order.save()
         res.send(order)

     } catch (e) {
         res.status(500).send()
     }
 })

 router.delete('/order/:id', async (req, res) => {
     const _id = req.params.id

     try {
         const order = await Order.findOneAndDelete({ _id, owner: req.customer._id })

         if (!order) {
             return res.status(404).send()
         }
         res.send(order)

     } catch (e) {
         res.status(500).send()
     }
 })


 module.exports = router