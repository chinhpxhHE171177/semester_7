// npm i express
const express = require('express');

const router = express.Router();
const Product = require('../models/Product');

//display list of product 
router.get('/admin', async (req, res) => {
    try {
        const products = await Product.find(); // Get all products
        res.render('admin', { products, product: null }); // Ensure `product` is always defined
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//add new product 
router.post('/add-product', async (req, res) => {
    try {
        const { id, name, price, des } = req.body; // get data from user 
        const newProduct = new Product({ id, name, price, des }); // create a new product
        await newProduct.save(); // save to document of mongo
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get info of a exist product
router.get('/edit-product/:id', async (req, res) => {
    try {
        const productId = req.params.id; // get id from request parameters
        const product = await Product.findById(productId); // find product by id
        const products = await Product.find(); // get list products 
        // if (!product || !products) {
        //     return res.status(404).send('Product not found');
        // }
        res.render('admin', { product, products }); // render edit-product page with product info
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// update a product
router.post('/edit-product/:id', async (req, res) => {
    try {
        const { name, price, des } = req.body; // get info from user input 
        await Product.findByIdAndUpdate(req.params.id, { name, price, des });
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// delete a product 
router.post('/delete-product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;