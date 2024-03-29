const Product=require('../models/product');
const mongoose=require('mongoose');

exports.products_get=(req,res,next)=>{
    Product.find()
        .select('name price _id productImage')
        . then(docs=>{
            const responce={
                count:docs.length,
                products:docs.map(data=>{
                    return {
                        name:data.name,
                        price:data.price,
                        productImage:data.productImage,
                        _id:data._id,
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/products/'+data._id
                        }
                    }
                })
            };
            //console.log(doc)
            res.status(200).json(responce)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err});
        })
}


exports.products_post=(req,res,next)=>{
    console.log(req.file);
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    })
    product.save()
        .then(result=>{
                console.log(result);
                res.status(201).json({
                message:'Add product successfully',
                createProduct:{
                    name:result.name,
                    price:result.price,
                    productImage:result.productImage,
                    _id:result._id,
                    type:{
                        type:'GET',
                        url:'http://localhost:3000/products/'+result._id
                    }
                }
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
}

exports.product_id_get=(req,res,next)=>{
    const productId=req.params.productId
    Product.findById(productId)
        .select('name price _id')
        .then((doc)=>{
            console.log("From the database",doc);
            res.status(200).json({
                product:doc,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+doc._id
                }
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err})
        })  
}

exports.product_id_patch=(req,res,next)=>{
    const id=req.params.productId;
    Product.update({_id:id},{$set:{
        name:req.body.name,
        price:req.body.price
    }},{})
        .then(result=>{
            console.log(result);
            res.status(200).json({
                product:result,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+id
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err)
        })
}

exports.product_id_delete=(req,res,next)=>{
    const id=(req.params.productId);

    Product.deleteOne({_id:id})    
        .then(doc=>{
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })

    res.status(200).json({
        message:`products/${id}/DELETE Request`
    })
}