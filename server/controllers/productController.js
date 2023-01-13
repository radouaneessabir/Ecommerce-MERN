
const mongoose = require("mongoose");
const Product = require('../models/productModel');
const ApiFeatures = require("../utils/apiFeaures");
const ErrorHandler = require("../utils/errorHandler");


// Get All Products
exports.getAllProducts = async (req, res) => {
    // const searchQuery  = req.query.searchQuery ;

    const resultPage = 6
    try {
        // let products;
        // if (searchQuery) {
        //     products = await Product.find({
        //         name: {
        //             $regex: searchQuery,
        //             $options: "i",
        //         }  ,
        //     });
        // } else {
        //     products = await Product.find();
        // }

        const productCount =  await Product.countDocuments();

        const apiFeature = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter().pagination(resultPage)

        const products = await apiFeature.query;
        
        res.status(200).json({ 
            success: true,
            products,
            productCount
        });
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


exports.getAllProducts_V2 = async (req, res) => {
    const {name, description} = req.query ;

    try {
        let products;

        if (name || description) {        
            products = await Product.find( { 
                $or: [
                    { name: { $eq: name } },
                    { description: { $eq: description } },
                    { $expr: { $eq: [ { name }, { description } ] } }
                 ]
            } )

        } else {
            console.log('pff')
            products = await Product.find();
        }
        
        res.status(200).json({ 
            success: true,
            products 
        });
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


// Get Product Details
exports.getProductDetails = async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler(`No Product with id: ${id}`, 404))
    }

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
exports.createProduct = async (req, res) => {
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
exports.updateProduct = async (req, res, next) => {
    const id = req.params.id
    const data = req.body;

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Product with id: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler(`No Product with id: ${id}`, 404))
    }

    try {
         const product = await Product.findByIdAndUpdate(id, data, {new: true});
        res.status(200).json(product);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


// Delete Product
exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Product with id: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler(`No Product with id: ${id}`, 404))
    }

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