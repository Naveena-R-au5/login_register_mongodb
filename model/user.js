const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    education:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    pic:{
       type:String,
       default:"https://res.cloudinary.com/dpad3bwv8/image/upload/v1593763032/d_dicqns.png"
    },
},{timestamps:true})

mongoose.model("user",userSchema)