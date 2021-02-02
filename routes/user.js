const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config/key')
const Auth = require('../middleware/userMiddleware')
const router = express.Router()
const users = mongoose.model("user")

router.post('/', function(req, res) {
    console.log("done")
});  

router.post('/signup',(req,res)=>{
    console.log(req.body)
    const {name,email,password,experience,education,skills,pic} = req.body
    if(!email || !password || !name || !experience || !education || !skills){
        return res.status(422).json({error:"Please fill all the fields"})
    }
    users.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({errMessage:"user already exist"}) 
        }
        bcrypt.hash(password,12)
        .then(hashedpassword =>{
            const User = new users({
                email,
                password:hashedpassword,
                name,
                experience,
                education,
                skills,
                pic:pic
            })
            User.save().then(User=>{
                console.log("signup",User)
                res.json({message:"Registered successfully!!"})
            })
        
    }).catch(err =>{
        console.log(err)
    })
  })
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
      return res.status(422).json({error:"add email/password"})
    }
    users.findOne({email:email}).then(savedUser =>{
        if(!savedUser){
            return res.status(422).json({error:"invalid user"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch =>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},SECRET_KEY)
                const {_id,name,email} = savedUser
                res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"invalid user"})
            }
        }).catch(err =>{
            console.log(err)
        })
    })
})

module.exports = router