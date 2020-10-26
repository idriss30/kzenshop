//import the dependencies
const express = require('express');
const userRoutes = require('../controllers/userCtrl')

const router = express.Router();


router.get('/login', userRoutes.getUserPage)






module.exports = router;