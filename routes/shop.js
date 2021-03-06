// importing required dependencies
const express = require('express');
const shopCtrl = require('../controllers/shopCtrl.js');

// using the router function;

const router = express.Router();


router.get('/', shopCtrl.getLanding)
router.get('/shop', shopCtrl.getShop)
router.get('/product/:id', shopCtrl.getProduct)
router.get('/aboutus', shopCtrl.getAboutUs);
router.get('/policy', shopCtrl.getPolicy);
router.get('/terms', shopCtrl.getTerms)

module.exports = router
