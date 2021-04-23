const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const customerRouter = require('./routers/customer')
const orderRouter = require('./routers/order')
const cityRouter = require('./routers/city')
const providerRouter = require('./routers/serviceprovider')
const mealRouter = require('./routers/meal')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(customerRouter)
app.use(orderRouter)
app.use(cityRouter)
app.use(providerRouter)
app.use(mealRouter)

module.exports = app