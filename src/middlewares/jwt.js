const jwt = require('jsonwebtoken')
const {JWT_SECRET} =require('../configs/constant')


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err)
        return res.status(403).json({message:"Unauthenticated:For Signed in User Only"})
      }
  
      req.user = user
  
      next()
    })
  }

  module.exports = {authenticateToken};