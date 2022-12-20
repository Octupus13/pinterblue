const e = require('express');
const multer = require('multer')
const {IMG_MAX_SIZE} = require('../configs/constant')

const imgFilter = (req, file ,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb("Please upload only images",  false);
    }
}

let storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,__basepath+'\\resources\\uploads\\')
    },
    filename:(req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
let uploadFile = multer({ storage: storage, fileFilter:imgFilter,limits:{fileSize:IMG_MAX_SIZE}})

module.exports = uploadFile