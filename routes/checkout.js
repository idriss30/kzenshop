const express = require("express");
const checkoutCtrl = require('../controllers/checkout')

const router = express.Router();

router.post('/paymentIntent', checkoutCtrl.postPaymentIntent);

router.get('/checkout', checkoutCtrl.getCheckout);

router.post('/postOrder', checkoutCtrl.postOrders);

router.get('/deleteOrder', checkoutCtrl.getDeleteOrder);

router.get('/success', checkoutCtrl.getSuccess)

module.exports = router












