const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const ServiceProvider = require('../models/serviceprovider')

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



router.post('/create/service-provider', upload.single('logo'), async (req, res) => {
       
    const serviceProvider = new ServiceProvider(req.body)

    if (req.file) serviceProvider.logo = process.env.SERVER_URL + "/provider/logo/" + req.file.originalname

    try{
        await serviceProvider.save()
        res.status(201).send(serviceProvider)

    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/providers', async (req, res) => {

    try {
        const serviceProvider = await ServiceProvider.find({}).sort({ createdAt: -1 }).exec()  
        res.send(serviceProvider)

    } catch (e) {
        res.status(500).send()
    }
})

router.get('/provider/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const serviceProvider = await ServiceProvider.findById(_id)

        if (!serviceProvider) {
            return res.status(404).send()
        }
        res.send(serviceProvider)

    } catch (e) {
        res.status(500).send()
    }
})

router.get('/provider/logo/:id', (req, res) => {
    const id = req.params.id

    const filePath = `uploads/${id}`
    const file = path.resolve(__dirname, "../../", filePath)
    if (fs.existsSync(file)) {
        const reader = fs.createReadStream(file)
        return reader.pipe(res)
    }
    res.send({ error: "The file you are looking for does not exist." })
})

router.patch('/provider/update/:id', upload.single('logo'), async (req, res) => {
    const _id = req.params.id

    const providerBody = req.body
    if (req.file) providerBody.logo = process.env.SERVER_URL + "/provider/logo/" + req.file.originalname

    try {
        const serviceProvider = await ServiceProvider.findByIdAndUpdate(_id, providerBody, { new: true, runValidators: true })

        if (!serviceProvider) {
            return res.status(404).send()
        }
        await serviceProvider.save()
        res.send(serviceProvider)

    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/provider/delete/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const serviceProvider = await ServiceProvider.findByIdAndDelete(_id)

        if (!serviceProvider) {
            return res.status(404).send()
        }

        res.send(serviceProvider)

    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router  