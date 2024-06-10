const mongoose = require('mongoose')
require('dotenv').config()


//Define The Mongodb Url:
const mongoUrl = process.env.DB_URL
 //replace My Database With Your Database Name:

//Set Up Mongodb Connection:
mongoose.connect(mongoUrl) 

//Get The Default Connection:


//Mongoose Maintain a Default Connection Object Representing The Mongodb Connection:

const db = mongoose.connection

//Define The Event Listners To The Database Connection

db.on('connected', ()=>{
    console.log('Connected To The Mongodb Database Server')
})

db.on('error', ()=>{
    console.log('Error In The Connection')
})

db.on('disconnected', ()=>{
    console.log('DisConnected To The Server')
})


//Export the Database Connection

module.exports = db;