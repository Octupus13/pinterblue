const connection = require('../services/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_EXPIRE_TIMEOUT, JWT_SECRET} = require('../configs/constant')

/*---------------/auth/register-----------------*/
const register = async (req,res) =>{
    console.log(req.body);
    /*---------------Get Body-----------------*/
    const username = req.body.username
    const password = req.body.password
    const cfpassword = req.body.confirm_password
    const email = req.body.email

    /*---------------Validation-----------------*/
    if(!username) return res.status(400).json({message:"Username is empty!!"})
    if(!password) return res.status(400).json({message:"Password is empty!!"})
    if(!email.includes('@')) return res.status(400).json({message:'Email should have "@"'})
    if(username.length <= 4 )return res.status(400).json({message:"Username must have at least 4 characters"})
    if(password.length <= 4 )return res.status(400).json({message:"Password must have at least 4 characters."})
    if(!email)return res.status(400).json({message:"Email name is needed for register."})
    if(password !== cfpassword) return res.status(400).json({message:"password and confirm password are not match"})

    /*---------------Check data on database-----------------*/
    const [userCheck] =await connection.query('SELECT username,email FROM users WHERE username = ? OR email = ?',[username,email])
    if(userCheck[0]) return res.status(400).json({message:"Username or Email already had been used."});

    /*---------------Hash and Insert data into database-----------------*/
    const hashedPWD = await bcrypt.hash(password,10)
    await connection.query('INSERT INTO users(username,password,email) VALUES (?, ?, ?)',[username,hashedPWD,email])
    res.status(200).json({message:"Register Complete Successfully."})

    
}
/*---------------/auth/login-----------------*/
const login = async (req,res) =>{
    /*---------------Get Body-----------------*/
    const username = req.body.username
    const password = req.body.password

    /*---------------Validation-----------------*/
    if(!username)return res.status(400).json({message:"Username is empty!!!"})
    if(!password)return res.status(400).json({message:"Password is empty!!!"})
    
    /*---------------Check data on database-----------------*/
    const [userFind] = await connection.query('SELECT uid,username,email, password FROM users WHERE username = ? or email = ?',[username,username]);
    if(!userFind[0]) return res.status(400).json({message:"Username, Email or Password is incorrect."})
    
    else if(!(await bcrypt.compare(password,userFind[0].password))) return res.status(400).json({message:"Username or Password is incorrect."})

    /*---------------Complete and Sign the token for user-----------------*/
    else {
        const token = jwt.sign({id:userFind[0].uid}, JWT_SECRET, {expiresIn: JWT_EXPIRE_TIMEOUT})
        res.status(200).json({
            message:'Login Complete Successfully',
            token:token
})}
}

module.exports = {
    register,
    login
}