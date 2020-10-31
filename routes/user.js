//import the dependencies
const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth')

const router = express.Router();


router.get('/login', userCtrl.getUserPage)
router.post('/login', userCtrl.postUserLogin)
router.post('/create', userCtrl.postCreateUser)
router.get('/profile', auth, userCtrl.getProfile)
router.post('/update', userCtrl.postUpdateProfile)
router.get('/delete/:id', userCtrl.getDeleteUser);
router.get('/logout', userCtrl.getLogout)



module.exports = router;