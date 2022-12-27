const fs =require('fs')

const connection = require('../services/database')

/*---------------/img/upload-----------------*/
const uploadFile = async (req,res)=>{
    /*---------------Get Body-----------------*/
    const user = req.user.id
    const name = req.file.originalname
    const path = req.file.path.replaceAll('\\',"/")
    const data = fs.readFileSync(
        __basepath+'\\resources\\uploads\\' + req.file.filename
    )

    /*---------------Insert uploaded Image in database-----------------*/
    try{
        console.log(req.file);
        if(req.file == undefined) return res.status(400).json({message:"There is no selected file"})
        await connection.query('INSERT INTO pictures(picdata,picname,filepath,upload_by) VALUES (?,?,?,?)',[data,name,path,user])
        res.status(200).json({message:"Upload Complete Successfully"})
    }
    catch(err){
        console.log(err);
        fs.unlink(__basepath + '\\resources\\uploads\\' + req.file.filename)
        return res.status(400).json({message:"Fail to upload"})
    }
}
/*---------------/img/get-----------------*/
const getAllImg = async(req,res) =>{
    const [allImg] = await connection.query('SELECT pid,picname,picdata,filepath,upload_by FROM pictures WHERE delete_at IS NULL')
    allImg.forEach(element => {
        let bufferBase64 = new Buffer.from( element.picdata, 'binary' ).toString('base64');
        element.picdata = bufferBase64;
    });
    res.status(200).json(allImg)
}
/*---------------/img/get/:id-----------------*/
const getImgByID = async(req,res) =>{
    const id = req.params.id
    console.log(id);
    const [Img] = await connection.query('SELECT picname,picdata,upload_by FROM pictures WHERE delete_at IS NULL AND pid = ?',[id])
    if(Img && Img.length != 0) {
    let bufferBase64 = new Buffer.from(Img[0].picdata, 'binary').toString('base64');
    Img[0].picdata = bufferBase64
    console.log('มี');
    return res.status(200).json(Img)
}
    else{ console.log('ไม่มี'); return res.status(404).json([{message:"Page Not Found"}])}
}

const delImg = async (req,res) =>{
    const id = req.params.id
    const uid = req.user.id
    console.log(id);
    const [Img] = await connection.query('SELECT picname,picdata,upload_by FROM pictures WHERE delete_at IS NULL AND pid = ? AND upload_by = ?',[id,uid])
    if(!Img) return res.status(404).json({message:"Page Not Found"})
    else{
        await connection.query('DELETE FROM pictures WHERE pid = ?',[id])
    }
    res.status(200).json({message:'Delete Complete Successfully'})
}

const downloadImg = async (req,res) =>{
    const id = req.params.id
    const [Img] = await connection.query('SELECT picname,picdata,upload_by FROM pictures WHERE delete_at IS NULL AND pid = ?',[id])
    if(!Img) return res.status(404).json({message:"Page Not Found"})
    let bufferBase64 = new Buffer.from(Img[0].picdata, 'binary')
    res.status(200).send(bufferBase64)
}
const checkOwn = async (req,res) =>{
    const id = req.params.id
    const uid = req.user.id
    const [Img] = await connection.query('SELECT picname,picdata,upload_by FROM pictures WHERE delete_at IS NULL AND pid = ? AND upload_by = ?',[id,uid])
    if(Img && Img.length != 0){
        return res.status(200).json({owned:true})
    }
    else return res.status(404).json({message:"Page Not Found OR Not Yours"})
}

module.exports = {
    uploadFile,
    getAllImg,
    getImgByID,
    delImg,
    downloadImg,
    checkOwn
}