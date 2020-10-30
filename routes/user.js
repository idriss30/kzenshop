//import the dependencies
const express = require('express');
const userCtrl = require('../controllers/userCtrl')

const router = express.Router();


router.get('/login', userCtrl.getUserPage)
router.post('/login', userCtrl.postUserLogin)





module.exports = router;