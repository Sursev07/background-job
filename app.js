const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000
const sendEmail = require('./helpers/sendEmailJob')

app.use(express.urlencoded({extended:true}))

app.post('/sendEmailJob', (req, res)=> {
    let {email} = req.body
    console.log(email)
    sendEmail(email)
    return res.status(200).json({message: 'sukses sending email'})
})

app.listen(port, ()=>{
    console.log(`listen on port ${port}`)
})