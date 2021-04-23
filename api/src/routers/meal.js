const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const Meal = require('../models/meal')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('file type not supported.'))
        }
        cb(undefined, true)
    }
})


router.post("/create/meal", upload.single('pics'), async (req, res) => {  
    const mealData = req.body
    mealData.pics = process.env.SERVER_URL + "/meal/pics/" + req.file.originalname          

    const mealBody = new Meal(mealData)

    try{
        await mealBody.save()
        res.status(201).send(mealBody)

    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/meals", async (req, res) => {

    try{
        const meals = await Meal.find({}).sort({createdAt:-1}).exec()
        res.send(meals)

    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/meal/:id", async (req, res) => {
    const _id = req.params.id

    try{
        const meal = await Meal.findById(_id)

        if(!meal){
            return res.status(404).send()
        }
        
        res.send(meal)

    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/meal/pics/:id", (req, res) => {  
    const id = req.params.id

    const filePath = `uploads/${id}`
    const file = path.resolve(__dirname, "../../", filePath)
    if (fs.existsSync(file)) {
        const reader = fs.createReadStream(file)
        return reader.pipe(res)
    }
    res.send({ error: "The file you are looking for does not exist." })
})

router.patch("/meal/:id", upload.single('pics'), async (req, res) => {
    const _id = req.params.id
    mealData.pics = process.env.SERVER_URL + "/meal/pics/" + req.file.originalname

    const mealBody = new Meal(mealData)

    try {
        const meal = await Meal.findByIdAndUpdate(_id, mealBody, { new: true, runValidators: true })

        if (!meal) {
            return res.status(404).send()
        }
        await meal.save()
        res.send(meal)

    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete("/meal/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const meal = await Meal.findByIdAndDelete(_id)

        if (!meal) {
            return res.status(404).send()
        }

        res.send(meal)

    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router