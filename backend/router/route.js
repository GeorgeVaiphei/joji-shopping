const express = require('express');
const router = express.Router();
const auth = require('../controller/auth')
router.get('/userlist', auth.userlist)
router.get('/singleuserlist/:id', auth.singleuserlist)
router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.put('/update/:id', auth.update)

module.exports = router;