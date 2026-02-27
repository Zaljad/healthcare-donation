require ('dotenv').config({quiet: true})
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session =require('express-session')
const {MongoStore}= require ('connect-mongo')
const path = require('path')
const db = require('./db')
const app = express()

const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])


app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) =>{
  res.send('Medical Equipment Donation API is running 🩺🤝')
})

const PORT = process.env.PORT ? process.env.PORT : 3000

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT} 🚀 `)
})
