const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    adminemail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    company:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    pics:{
        type:String,
        default:"https://res.cloudinary.com/dpad3bwv8/image/upload/v1593763032/d_dicqns.png"
     },
    // followers:[{type:ObjectId,ref:"user"}],
    // following:[{type:ObjectId,ref:"user"}]

},{timestamps:true})

mongoose.model("admin",adminSchema)