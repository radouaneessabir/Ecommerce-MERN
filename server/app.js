const express = require('express')
const app = express()
const cors = require('cors');

const errorMidleware = require('./middleware/error.middleware')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());


// Route Imports
const productRoutes = require('./routes/productRoute.js')
app.use('/api/v1', productRoutes)


// Midleware for Errors
app.use(errorMidleware)


module.exports = app