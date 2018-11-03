var express=require('express');
var router=express.Router();
var fs= require('fs');



router.get('/',(req,res,next)=>{

    res.render('developers');
});

module.exports=router;