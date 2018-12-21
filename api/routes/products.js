const express=require('express');
const router=express.Router();

const multer = require('multer');
const checkAuth=require('../middleware/check-auth');

const productsController=require('../controller/products');

const storage =  multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uplords/');
    },
    filename:function(req,file,cb){
        cb(null,new Date().getDate()+file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const uplord = multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*10
    },
    fileFilter:fileFilter,
});


router.get('/',productsController.products_get);

router.post('/',checkAuth,uplord.single('productImage'),productsController.products_post);

router.get('/:productId',productsController.product_id_get);


router.patch('/:productId',checkAuth,productsController.product_id_patch);

router.delete('/:productId',checkAuth,productsController.product_id_delete);


module.exports=router;