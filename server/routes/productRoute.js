const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getAllProducts_V2 } = require('../controllers/productController')

const router = express.Router()


router.get('/products', getAllProducts)
router.get('/products-v2', getAllProducts_V2)
router.post('/product/new', createProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)
router.get('/product/:id', getProductDetails)


module.exports = router