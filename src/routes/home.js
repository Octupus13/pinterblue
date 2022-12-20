const express =require('express')
const router = express.Router()
const {goHome} = require('../controllers/home')


router.use('/',goHome)

module.exports = router;