//make all imports 
const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cartCtrl')


router.post('/addProduct', cartCtrl.postCart)

router.get('/cartItems', cartCtrl.getCart)

router.get('/delete/:id', cartCtrl.getDeleteProduct)

router.get('/increase/:id', cartCtrl.IncreaseQuantity);

router.get('/decrease/:id', cartCtrl.decreaseQuantity);

router.get('/deleteCart', cartCtrl.DeleteCart);


module.exports = router