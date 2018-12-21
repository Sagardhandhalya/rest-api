const jwt = require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        const data=token.split(" ");
        console.log(data[1]);
        const decoded=jwt.verify(data[1],'secret-data');
        req.userData=decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message:'Auth failed'
        })
    }
        
}