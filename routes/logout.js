const express=require('express');
const router=express.Router();
const logoutHandler=require('../controller/logoutController')

router.get('/',logoutHandler)

module.exports=logoutHandler;