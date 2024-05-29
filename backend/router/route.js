const express = require('express');
const router = express.Router();
const auth = require('../controller/auth')
router.get('/userlist', auth.userlist)
router.get('/cartlist', auth.cartlist)
router.get('/wishlist', auth.wishlist)
router.get('/singleuserlist/:id', auth.singleuserlist)
router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.put('/update/:id', auth.update)
router.post('/storedata', auth.storedata)
router.post('/storewish', auth.storewish)
router.delete('/deleteitem/:id', auth.deleteitem)
router.delete('/deletewishitem/:id', auth.deletewishitem)

module.exports = router;