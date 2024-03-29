const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    email:{type:String,required:true,match:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/},
    password:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model('User',userSchema);