const express = require('express');
const Message = require("../controllers/message.controller")

const router = express.Router()


router.get('/',Message)

module.exports = router