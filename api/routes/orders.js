const express=require('express');
const  router = express.Router();

const orderController=require('../controller/orders');

const Product=require('../models/product');

router.get('/',orderController.orders_get_all);

router.post('/',orderController.order_post);

router.get('/:orderId',orderController.order_id_get);

router.delete('/:orderId',orderController.order_id_delete)

module.exports=router;