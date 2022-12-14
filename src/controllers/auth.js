const connection = require('../services/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_TOKEN, JWT_EXPIRE_TIMEOUT, JWT_SECRET} = require('../configs/constant')


const register = async (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    
    if(username.length <= 4 )return res.status(400).json({message:"Username must have at least 4 characters"})
    if(password.length <= 4 )return res.status(400).json({message:"Password must have at least 4 characters."})
    if(!firstname)return res.status(400).json({message:"First name is needed for register."})
    if(!lastname)return res.status(400).json({message:"Last name is needed for register."})
    if(!email)return res.status(400).json({message:"Email name is needed for register."})

    const [userCheck] =await connection.query('SELECT username,email FROM users WHERE username = ? OR email = ?',[username,email])
    if(userCheck[0]) return res.status(400).json({message:"Username or Email already had been used."});
    const hashedPWD = await bcrypt.hash(password,10)
    await connection.query('INSERT INTO users(username,password,email) VALUES (?, ?, ?)',[username,hashedPWD,email])
    await connection.query('INSERT INTO users_profile(fname,lname) VALUES (?, ?)',[firstname,lastname])
    res.status(200).json({message:"Register Complete Successfully."})
    
}

const login = async (req,res) =>{
    const username = req.body.username
    const password = req.body.password

    if(!username)return res.status(400).json({message:"Username is empty!!!"})
    if(!password)return res.status(400).json({message:"Password is empty!!!"})
    
    const [userFind] = await connection.query('SELECT uid,username, password FROM users WHERE username = ?',[username]);
    if(!userFind[0]) return res.status(400).json({message:"Username or Password is incorrect."})
    
    else if(!(await bcrypt.compare(password,userFind[0].password))) return res.status(400).json({message:"Username or Password is incorrect."})
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