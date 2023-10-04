const express = require('express');
const {CreateReviews,getReviews,DeleteReview} = require("../controllers/review.controller")
const verifyToken = require('../middleware/jwt')


const router = express.Router()


router.post('/', verifyToken,CreateReviews)
router.get('/:gigId',getReviews)
router.delete('/:id',verifyToken,DeleteReview)

module.exports = router