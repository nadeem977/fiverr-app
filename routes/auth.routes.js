const express = require('express');
const {register,logout,login} = require("../controllers/auth.controller")

const router = express.Router()


router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)

module.exports = router