const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require("../models/order");
const Product = require('../models/product');
router.get('/',(req,res,next) => {
    Order.find().exec().then(doc=>{res.status(200).json(doc)}).catch(err=>{console.log(err)});
})

router.post('/',(req,res,next) => {
    Product.findById(req.body.productId).then(product => {
        const order = new Order({
        "quantity":req.body.quantity,
        "product":req.body.productId
    })
        order.save().then(result => {
            console.log(result)
        }).catch(err => {console.log(err)})
    }).catch(err => { res.status(500).json({
            message:"Product not found",
            error:err
        })
    })
    
})

router.get('/:orderId',(req,res,next) => {
    Order.findById(req.params.orderId).then(result =>{
        if(result){
            res.status(200).json({result});
        }
        else{
            res.status(404).json({message:"Order Not Found"})
        }
    }).catch(err => {console.log(err)});
})

router.delete('/:orderId',(req,res,next) => {
    Order.remove({ _id : req.params.orderId}).then(result => {
        res.status(200).json({
        message:"order deleted",
    })    
    }).catch(err => res.status(500).json({error:err}))
    
})

module.exports = router;