const fs =require('fs')

const connection = require('../services/database')

/*---------------/img/upload-----------------*/
const uploadFile = async (req,res)=>{
    /*---------------Get Body-----------------*/
    const user = req.user.id
    const name = req.file.originalname
    const caption = req.body.caption
    const path = req.file.path.replaceAll('\\',"/")
    const data = fs.readFileSync(
        __basepath+'\\resources\\uploads\\' + req.file.filename
    )

    /*---------------Insert uploaded Image in database-----------------*/
    try{
        console.log(req.file);
        if(req.file == undefined) return res.status(400).json({message:"There is no selected file"})
        await connection.query('INSERT INTO pictures(picdata,picname,content,filepath,upload_by) VALUES (?,?,?,?,?)',[data,name,caption,path,user])
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
    const [allImg] = await connection.query('SELECT pid,picname,picdata,content,filepath,upload_by FROM pictures WHERE delete_at IS NULL')
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
    const [Img] = await connection.query('SELECT picname,picdata,content,upload_by FROM pictures WHERE delete_at IS NULL AND pid = ?',[id])
    if(!Img) return res.status(404).json({message:"Page Not Found"})
    console.log(Img[0].picname);
    let bufferBase64 = new Buffer.from(Img[0].picdata, 'binary').toString('base64');
    Img.picdata = bufferBase64
    res.status(200).json(Img)
}


module.exports = {
    uploadFile,
    getAllImg,
    getImgByID
}