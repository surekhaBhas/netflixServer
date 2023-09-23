const express=require('express');
const router=express.Router();
const handleRefreshToken=require('../controller/refreshController');

router.get('/',handleRefreshToken);

module.exports =router