const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {MONGOURL} = require('./config/key')
const PORT =  5000
var cors = require("cors");
// MONGODB SETUP
mongoose.connect(MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
mongoose.connection.on('connected',()=>{
   console.log("connected to mongodb")
})
mongoose.connection.on('error',(err)=>{
    console.log("error in connection",err)
 })

require('./model/user')
require('./model/admin')

app.use(express.json())
app.use(cors());
app.use(require('./routes/user'));
app.use(require('./routes/admin'));

app.listen(PORT,()=>{
    console.log("server on PORT",PORT)
})