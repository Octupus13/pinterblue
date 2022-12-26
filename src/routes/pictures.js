const express = require('express')
const router = express.Router()
const {uploadFile,getAllImg,getImgByID,delImg,downloadImg,checkOwn} = require('../controllers/pictures')
const upload= require('../middlewares/uploads')
const {authenticateToken} = require('../middlewares/jwt')


router.post('/upload',authenticateToken,upload.single('file'),uploadFile)
router.get('/get',getAllImg)
router.get('/get/:id',getImgByID)
router.delete('/del/:id', authenticateToken,delImg)
router.get('/download/:id',downloadImg)
router.get('/check',authenticateToken,checkOwn)

module.exports = router