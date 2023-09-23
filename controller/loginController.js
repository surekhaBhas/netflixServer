const User = require('../model/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config()

const handleLogin=async(req,res)=>{
    const {password,email}=req.body;
    if(!password || !email) return res.status(400).json({"message":" password and email required"})
    const foundUser= await User.findOne({email:email}).exec()
    if (!foundUser) return res.sendStatus(401)
    const match=await bcrypt.compare(password,foundUser.password)
    if(match){
        const accessToken=jwt.sign(
            {"email": foundUser.email} ,
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'})
            
        const refreshToken=jwt.sign(
            {"email":foundUser.email},
            process.env.REFRESH_TOKEN_SECRET
            ,{expiresIn:"1d"}
            )
           foundUser.refreshToken=refreshToken;
           const result=await foundUser.save();
           
           res.cookie('jwt',refreshToken,{httpOnly:true,sameSite: 'None',maxAge:24*60*60*1000})
           res.json({accessToken})
    }else{
        res.sendStatus(401)
    }
}

module.exports=handleLogin