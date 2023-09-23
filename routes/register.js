const express=require('express');
const router=express.Router();
const registerHandler=require('../controller/registerController');

router.post('/',registerHandler)

module.exports=router
