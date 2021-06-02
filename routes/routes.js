/*jshint esversion: 6 */

//import modules
const express = require('express');
const Product = require('../models/product');
const path = require('path');
const product = require('../models/product');
// const { NOTFOUND } = require('dns');

// Create a router object
const router = express.Router();

// export our router
module.exports = router;

// Pagina home
router.get('/', (req,res)=>{

    res.render('home');

});

router.get('/home', (req,res)=>{

    res.render('home');

});

// GET
router.get('/api/product',(req, res)=>{
    // va a buscar todo en general de productos
    Product.find({}, (err, products)=>{
        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });
// SI no hay productos
        if(!products) return res.status(404).send({
            message: `No existen productos`
        });
        //  res.status(200).send({products:[products]});
        res.render('products', {
            products:products
        });
    }).lean();
});

//editar
router.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId;
    console.log(req.body);
    Product.findById(productId, (err, products) => {
        // Product.find({price:productId},(err,todook)=>{
        if (err) return res.status(500).send({
            message: `Error al realizar la peticion${err}`
        });
        if (!products) return res.status(404).send({
            message: `El producto no existe`
        });
        //res.status(200).send({product:todook})
        res.render('editar', {
            products
        });
    }).lean();
});


// Post
router.post('/api/product',(req, res)=>{
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    // Esto lo traera en minusculas lowerCase
    product.category = (req.body.category).toLowerCase();
    product.description = req.body.description;
    product.picture = req.body.picture;


    product.save((err, prodGuardado)=>{
        if (err) res.status(500).send({
            message: `Error al salvar en BD ${err}`
        });

        res.redirect('/api/product');
    });

});

router.put('/api/product/:productID', (req, res)=>{

    let productID = req.params.productID;
    let update = req.body;

    Product.findOneAndUpdate({_id: productID }, update, (err, product)=>{

        if (err) res.status(500).send({
            message: `Error al actualizar registro en BD ${err}`
        });

        res.redirect('/api/product');

    });

});

router.delete('/api/product/:productId', (req, res) => {

    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({
            message: `Error al borrar el producto ${err}`
        });
        product.remove(err => {
            if (err) res.status(500).send({
                message: `Error al borrar el producto ${err}`
            });
            //res.status(200).send({message:'El producto ha sido eliminado'})
            res.redirect('/api/product');
        });
    });
});



router.get('/insertar', (req, res)=>{
    res.render('product');
});

