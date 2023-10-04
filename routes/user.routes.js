const express = require('express')
const {deleteUsers,getUsersDatabase} = require("../controllers/user.controller")
const verifyToken = require("../middleware/jwt")
const router = express.Router()


router.delete('/:id',verifyToken,deleteUsers)
router.get('/:id',getUsersDatabase)
// router.get('/',getUsersDatabase)

module.exports = router