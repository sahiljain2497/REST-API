const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product')

router.get('/',(req,res,next) =>{
     Product.find().select('price name _id').exec().then(doc => {res.status(200).json(doc)}).catch(err => {console.log(err)})
});

router.post('/',(req,res,next) =>{
    const product = new Product({
        name :req.body.name,
        price:req.body.price
    })
    product.save().then(result =>{console.log(result)}).catch(err=>{console.log(err)})
    res.status(200).json({
        message:"post request handled",
        createProduct: product
    });
});

router.patch('/:productId',(req,res,next) => {
    const idd = req.params.productId;
    Product.update(
        { _id:idd},
        {$set : {"name":req.body.newName,"price":req.body.newPrice}}
    ).exec().then(result => {res.status(200).json(result)}).catch(err => console.log(err));
})

router.delete('/:productId',(req,res,next) => {
    const idd = req.params.productId;
    Product.remove({  _id:idd});
})

router.get('/:productId',(req,res,next) => {
    Product.findById(req.params.productId).exec().then(doc => {res.status(200).json(doc)}).catch(err => {console.log(err)})
})
router.patch('/:productId',(req,res,next) => {
    res.status(200).json({
        message:"Product Updated",
    })
})
router.delete('/:productId',(req,res,next) => {
    res.status(200).json({
        message:"Product Deleteds",
    })
})


module.exports = router;