const express = require('express')
const City = require('../models/city')

const router = express.Router()

router.post('/create/city', async (req, res) => {
    const city = new City(req.body)

    try{
        await city.save()
        res.status(201).send(city)

    }catch(e){
        res.status(400).send()
    }
})

router.get('/cities', async (req, res) => {

    try{
        const cities = await City.find({})
        res.send(cities)

    }catch(e){
        res.status(500).send()
    }
})

module.exports = router