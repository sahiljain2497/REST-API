//contains the server routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/RESTAPI", function (err, db) {  
     if(err) throw err;
    else{
        console.log("connected to db");
    }
     //Write databse Insert/Update/Query code here..
})
//import routes  here
const orderRoutes = require('./api/routes/order');
const productRoutes = require('./api/routes/product');
//routes to be directed here
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//app.use((req,res,next) =>{
//    res.header("Access-Control-Allow-Origin",'*');
//    res.header("Access-Control-Allow-Headers",'*');
//    if(req.method === "OPTIONS"){
//        res.header('Access-Control-Allow-Methods','PUT,DELETE,POST,GET,PATCH');
//        return res.status(200).json({});
//    }
//})

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);


//for handling error for unknow requests
app.use((req,res,next)=>{
    const error = new Error("Not Found");
    error.status = 404
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message:error.message
    })
})

module.exports = app;