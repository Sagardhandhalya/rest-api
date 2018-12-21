const Order=require('../models/order');

exports.orders_get_all=(req,res,next)=>{
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
}

exports.order_post=(req,res,next)=>{
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
}

exports.order_id_get=(req,res,next)=>{
    res.status(200).json({
        OrderId:req.params.orderId
    })
}

exports.order_id_delete=(req,res,next)=>{
    res.status(200).json({
        message:`Ordered was deleted`,
        OrderId:req.params.orderId
    })
}