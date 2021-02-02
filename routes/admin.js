const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config/key')
const Auth = require('../middleware/adminMiddleware')
const router = express.Router()
const Admin = mongoose.model("admin")
const User = mongoose.model("user")

router.post('/', function(req, res) {
    console.log("done")
});  

router.post('/Adminsignup',(req,res)=>{
    console.log(req.body)
    const {name,adminemail,password,company,position,pics} = req.body
    if(!adminemail || !password || !name || !company || !position ){
        return res.status(422).json({error:"Please fill all the fields"})
    }
    Admin.findOne({adminemail:adminemail})
    .then((savedAdmin)=>{
        if(savedAdmin){
            return res.status(422).json({errMessage:"Admin already exist"}) 
        }
        bcrypt.hash(password,12)
        .then(hashedpassword =>{
            const admin = new Admin({
                adminemail,
                name,
                password:hashedpassword,
                company,
                position,
                pics:pics
            })
            admin.save().then(admin=>{
                console.log("signup",admin)
                res.json({message:"Registered successfully!!"})
            })
        
    }).catch(err =>{
        console.log(err)
    })
  })
})

router.post('/Adminlogin',(req,res)=>{
    const {adminemail,password} = req.body
    if(!adminemail || !password){
      return res.status(422).json({error:"add adminemail/password"})
    }
    Admin.findOne({adminemail:adminemail}).then(savedAdmin =>{
        if(!savedAdmin){
            return res.status(422).json({error:"invalid Admin"})
        }
        bcrypt.compare(password,savedAdmin.password)
        .then(doMatch =>{
            if(doMatch){
                const token = jwt.sign({_id:savedAdmin._id},SECRET_KEY)
                const {_id,name,adminemail} = savedAdmin
                res.json({token,admin:{_id,name,adminemail}})
            }
            else{
                return res.status(422).json({error:"invalid Admin"})
            }
        }).catch(err =>{
            console.log(err)
        })
    })
})



module.exports = router