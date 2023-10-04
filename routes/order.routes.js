const express = require('express');
const Order = require("../controllers/order.controller")

const router = express.Router()


router.get('/',Order)

module.exports = router