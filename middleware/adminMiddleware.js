const mongoose = require('mongoose')
const admin = mongoose.model("admin")
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config/key')


module.exports =(req,res,next)=>{
    // console.log(req.headers)
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({err:"you must be logged in to view page"})
    }
    const token = authorization.replace("Bearer ","")
    console.log("token",token)
    jwt.verify(token,SECRET_KEY,(err,payload)=>{
        if(err){
           return res.status(401).json({error:"you must login first"})
        }
        const {_id,name,adminemail} = payload
      
        admin.findById(_id,name,adminemail).then(admindata =>{
            req.Admin = admindata
            console.log("pay",admindata)
            next()
        })
        
    })
}