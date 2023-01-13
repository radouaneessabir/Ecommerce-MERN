
const mongoose = require("mongoose");
const Product = require('../models/productModel')



// Get All Products
exports.getAllProducts = async (req, res) => {

    try {
        const products = await Product.find();

        res.status(200).json({ 
            success: true,
            products 
        });
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


// Get Product Details
exports.getProductDetails = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id)
        res.status(200).json({ 
            success: true,
            product 
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


// Create Product
exports.createProduct = async (req, res, next) => {
    const data = req.body;
    const newProduct = new Product(data);

    try {
        await newProduct.save()
        .then(() => res.status(201).json({
            success: true,
            newProduct
        }))
        .catch((err) => res.json({error : err}));
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


// Update Product
exports.updateProduct = async (req, res) => {
    const id = req.params.id
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Product with id: ${id}`);

    try {
         const product = await Product.findByIdAndUpdate(id, data, {new: true});
        res.status(200).json(product);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


// Delete Product
exports.deleteProduct = async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Product with id: ${id}`);

    try {
        await  Product.findByIdAndRemove(id)
        .then(() => res.status(200).json({
            success: true,
            message: 'Product deleted successfuly!'
        }))
        .catch((err) => res.json({error : err}));
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}