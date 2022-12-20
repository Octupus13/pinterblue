const express = require('express')
const router = express.Router()
const {authenticateToken} = require('../middlewares/jwt')
const {getMyProfile} =require('../controllers/users')

router.use(authenticateToken);

router.get('/getMy', getMyProfile)

module.exports = router