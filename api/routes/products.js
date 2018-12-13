const express=require('express');
const router=express.Router();

const Product=require('../models/product');

router.get('/',(req,res,next)=>{
    Product.find()
        . then(doc=>{
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err});
        })
})

router.post('/',(req,res,next)=>{
    // const product={
    //     name:req.body.name,
    //     price:req.body.price
    // }
    
    const product = new Product({
        name:req.body.name,
        price:req.body.price
    })
    product.save()
        .then(result=>console.log(result))
        .catch(err=>console.log(err))

    res.status(201).json({
        message:'product/POST Request',
        createProduct:product
    })
})

router.get('/:productId',(req,res,next)=>{
    const productId=req.params.productId
    Product.findById(productId)
        .then((doc)=>{
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err})
        })  
});


router.patch('/:productId',(req,res,next)=>{
    const id=parseInt(req.params.productId);
    res.status(200).json({
        message:`products/${id}/PETCH Request`
    })
})

router.delete('/:productId',(req,res,next)=>{
    const id=parseInt(req.params.productId);
    res.status(200).json({
        message:`products/${id}/DELETE Request`
    })
})


module.exports=router;