const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'product/GET Request'
    })
})

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message:'product/POST Request'
    })
})

router.get('/:productId',(req,res,next)=>{
    const id=parseInt(req.params.productId);
    if(typeof(id) == 'number'){
        res.status(200).json({
            message:`products/${id}/GET Request`,
            id:id
        })
    }else{
        res.status(200).json({
            message:'Id is missing'
        })
    }
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