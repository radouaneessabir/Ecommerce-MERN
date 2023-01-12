const express = require('express')
const app = express()
const cors = require('cors');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());


// Route Imports
const productRoutes = require('./routes/productRoute.js')
app.use('/api/v1', productRoutes)


module.exports = app