var express=require('express');
var router=express.Router();
var Twit = require('twit');

//twitter bot setup
var T = new Twit(require('../config/config'));
router.get('/',(req,res,next)=>{
    var params = { count: 5}
    T.get('statuses/home_timeline',  params, function (err, data, response) {
        console.log(data);
       res.json(data); 
    //    res.render('tweets',{data:data});
      });
});
router.post('/',(req,res,next)=>{
    T.post('statuses/update', { status: 'done first part!' }, function(err, data, response) {
        console.log(data);
        res.json(data);
          });
});

module.exports=router;