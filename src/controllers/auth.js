const connection = require('../services/database')
const bcrypt = require('bcrypt')
const { query } = require('../services/database')

const register = async (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    
    if(username.length <= 4 )return res.status(400).json({message:"Username must have at least 4 characters"})
    if(password.length <= 4 )return res.status(400).json({message:"Password must have at least 4 characters"})
    if(!firstname)return res.status(400).json({message:"First name is needed for register"})
    if(!lastname)return res.status(400).json({message:"Last name is needed for register"})
    if(!email)return res.status(400).json({message:"Email name is needed for register"})

    const [userCheck] =await connection.query('SELECT username,email FROM users WHERE username = ? OR email = ?',[username,email])
    if(userCheck[0]) return res.status(400).json({message:"Username or Email already had been used"});
    const hashedPWD = await bcrypt.hash(password,10)
    await connection.query('INSERT INTO users(username,password,email) VALUES (?, ?, ?)',[username,hashedPWD,email])
    await connection.query('INSERT INTO users_profile(fname,lname) VALUES (?, ?)',[firstname,lastname])
    res.status(200).json({message:"Register Complete Successfully"})
    
}

const login = async (req,res) =>{
    const username = req.body.username
    const password = req.body.password

    if(!username)return res.status(400).json({message:"Username is empty!!!"})
    if(!password)return res.status(400).json({message:"Password is empty!!!"})
    
    const [userFind] = await connection.query();

}

module.exports = {
    register
}