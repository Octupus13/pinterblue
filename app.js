global.__basepath = __dirname;
const express = require('express')
const app = express()
const {SERVER_PORT} = require('./src/configs/constant')
const authRoute = require('./src/routes/auth')
const picturesRoute = require('./src/routes/pictures')
const usersRoute = require('./src/routes/users')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/auth',authRoute)
app.use('/img',picturesRoute)
app.use('/users',usersRoute)


app.listen(SERVER_PORT,()=>{
    console.log("SERVER CONNECTED");
})


