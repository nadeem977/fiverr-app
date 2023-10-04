const express = require('express');
const Conversetion = require("../controllers/conversetion.controller")

const router = express.Router()


router.get('/',Conversetion)

module.exports = router