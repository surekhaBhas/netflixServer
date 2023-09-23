const User=require('../model/User');

const logoutHandler=async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken=cookies.jwt;

    const foundUser=await User.findOne({refreshToken}).exec();
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true,})
        return res.sendStatus(204)
    }
    foundUser.refreshToken='';
    const result=await foundUser.save();

    res.clearCookie('jwt',{httpOnly:true,sameSite: 'None'})
    res.sendStatus(204)
} 

module.exports=logoutHandler