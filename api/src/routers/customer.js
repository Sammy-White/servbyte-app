const express = require('express')
const Customer = require('../models/customer')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/create/customer', async (req, res) => {
    
    const customer = new Customer(req.body)

    try{
        await customer.save() 
        const token = await customer.generateAuthToken()
        res.status(201).send({customer, token})

    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/customer/login', async (req, res) => {

    try{
        const customer = await Customer.findByCredentials(req.body.email, req.body.password)
        const token = await customer.generateAuthToken()
        res.send({customer, token})

    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/customer/logout', auth, async (req, res) => {

    try{
        req.customer.tokens = req.customer.tokens.filter(token => token.token !== req.token)
        await req.customer.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})

router.get('/customer/me', auth, (req, res) => {
    res.send(req.customer)
})

router.get('/customer/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const customer = await Customer.findById(_id)

        if(!customer){
            res.status(404).send()
        }

        res.send(customer)

    }catch(e){
        res.status(500).send()
    }
})

router.get('/customers', async (req, res) => {
    
    try{
        const customers = await Customer.find({}).sort({createdAt:-1}).exec()
        res.send(customers)

    }catch(e){
        res.status(500).send()   
    }
})

//Update name, email, phone
router.patch('/customer/main/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "phone"]
    const isValidUpdates = updates.every(update => allowedUpdates.includes(update))

    if(!isValidUpdates){
        return res.status(400).send({error:'Invalid updates!'})
    }

    try{
        const customer = await req.customer
        updates.forEach(update => customer[update] = req.body[update])
        await customer.save()
        res.send(customer)

    }catch(e){
        res.status(400).send(e)
    }

})

//Update password
router.patch('/customer/password/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["password"]
    const isValidUpdates = updates.every(update => allowedUpdates.includes(update))

    if(!isValidUpdates){
        return res.status(400).send({error:'Invalid update!'})
    }

    try{
        const customer = await req.customer
        updates.forEach(update => customer[update] = req.body[update])
        await customer.save()
        res.send(customer)

    }catch(e){
        res.status(400).send(e)
    }
})

//Update address
router.patch('/customer/address/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["address"]
    const isValidUpdates = updates.every(update => allowedUpdates.includes(update))

    if (!isValidUpdates) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const customer = await req.customer
        updates.forEach(update => customer[update] = req.body[update])
        await customer.save()
        res.send(customer)

    } catch (e) {
        res.status(400).send(e)
    }
})

//Delete customer
router.delete('/customer/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const customer = await Customer.findByIdAndDelete(_id)

        if(!customer){
            return res.status(404).send({error:'customer no longer exists'})
        }

        res.send(customer)

    }catch(e){
        res.status(500).send()
    }

})

module.exports = router