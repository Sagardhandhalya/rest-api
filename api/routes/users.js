const mongoose=require('mongoose');
const express=require('express');
const routes=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


routes.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
        .then(user=>{
            if(user.length>=1){
                return res.status(422).json({
                    messages:'User already Exits...'
                })
            }else{
                bcrypt.hash(req.body.password,5,(err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            error:err 
                       })
                    }else{
                        const user = new User({
                            email:req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(doc=>{
                                console.log(doc)
                                res.status(201).json({
                                    messages:'User created'
                                })
                            })
                            .catch(err=>{
                                res.status(500).json({
                                    error:err
                                })
                            })
                    }
                })
            }
        })
});

routes.post('/login',(req,res,next)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            console.log(user);
                bcrypt.compare(req.body.password,user.password,(err,result)=>{
                    if(err){
                        return res.status(401).json({
                        messages:'Auth failed'
                    }) }
                    if(result){

                        const token=jwt.sign({
                            email:user.email,
                            userId:user._id
                        },'secret-data',{
                            expiresIn:"1h"
                        })

                        return res.status(201).json({
                            messages:'Auth successful',
                            token:token
                        })
                    }
                    
                    res.status(401).json({
                        messages:'Auth failed'
                    })
                })
        
        })
        .catch(err=>{
            console.log((err));
            res.status(500).json({
                error:err
            })
        })
})


routes.delete('/:userId',(req,res,next)=>{
    User.remove({_id:req.params.userId})
        .then(doc=>{
            console.log(doc)
            res.status(200).json({
                messages:'user deleted'
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
})

module.exports=routes;


