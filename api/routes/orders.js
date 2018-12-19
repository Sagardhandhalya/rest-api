const express=require('express');
const  router = express.Router();
const mongoose=require('mongoose');
const Order=require('../models/order');
const Product=require('../models/product');

router.get('/',(req,res,next)=>{
    Order.find()
        .populate('productId','name')
        .select('_id productId quantity')
        .then(doc=>{
            console.log(doc)
            res.status(200).json({
                count:doc.length,
                orders:doc.map(data=>{
                    return{
                        _id:data._id,
                        productId:data.productId,
                        quantity:data.quantity,
                        request:{
                            type:'GET',
                            url:'http:localhost:3000/orders/'+data._id
                        }
                    }
                })
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
})

router.post('/',(req,res,next)=>{
    const order=new Order({
        productId:req.body.productId,
        quantity:req.body.quantity
    });

    Product.findById(req.body.productId)
        .then(result=>{
            if(!result){
                return res.status(500),json({
                    message:'error'
                })
            }
            order.save()
                .then(result=>{
                    console.log(result)
                    res.status(201).json({
                        message:'oreder stored',
                        data:{
                            _id:result._id,
                            productId:result.productId,
                            quantity:result.quantity
                        },
                        request:{
                            type:'GET',
                            url:'http:localhost:3000/orders/'+result._id
                        }
                    })
                })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
})

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        OrderId:req.params.orderId
    })
})

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:`Ordered was deleted`,
        OrderId:req.params.orderId
    })
})

module.exports=router;