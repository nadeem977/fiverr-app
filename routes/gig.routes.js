const express = require('express');
const {CreateGig,DeleteGig,SingleGig,AllGigs} = require("../controllers/gig.controller")
const verifyToken = require('../middleware/jwt')

const router = express.Router()


router.post('/',verifyToken,CreateGig)
router.delete('/:id',verifyToken,DeleteGig)
router.get('/single/:id',SingleGig)
router.get('/',AllGigs)

module.exports = router