const express = require('express');
const app=express();
const morgan=require('morgan');
const productRoutes=require('./api/routes/product');
const orderRouters=require('./api/routes/order');

app.use(morgan('dev'))

app.use('/products',productRoutes);
app.use('/orders',orderRouters);
app.use((req,res,next)=>{
    const error=new Error('not found');
    res.status(400);
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(error.status||500)
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports=app;