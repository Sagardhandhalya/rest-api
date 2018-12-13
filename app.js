const express = require('express');
const app=express();
const morgan=require('morgan');
const productRoutes=require('./api/routes/products');
const orderRouters=require('./api/routes/orders');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Shoping-Database')
    .then(()=>console.log('connected to databse'))
    .catch(err=>console.log('ErroR..',err))

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorizatioin');
    if(req.method==='OPTIONS'){ 
        res.method('Access-Control-Allow-Methods','PUT,DELETE,PETCH,GET,POST');
        return res.status(200).json({});
    }
    next();
})

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