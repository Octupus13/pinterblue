const express = require('express')
const   router = express.Router()
const {uploadFile,getAllImg,getImgByID} = require('../controllers/pictures')
const upload= require('../middlewares/uploads')
const {authenticateToken} = require('../middlewares/jwt')


router.post('/upload',authenticateToken,upload.single('file'),uploadFile)
router.get('/get',getAllImg)
router.get('/get/:id',getImgByID)

module.exports = router