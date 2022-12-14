const { json } = require('body-parser')
const express = require('express')
const app = express()
const {SERVER_PORT} = require('./src/configs/constant')
const authRoute = require('./src/routes/auth')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/auth',authRoute)

app.listen(SERVER_PORT,()=>{
    console.log("SERVER CONNECTED");
})