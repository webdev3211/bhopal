var express=require('express');
var router=express.Router();
var fs= require('fs');
var graph=require('fbgraph');
var access_token=require('../config/fb');
graph.setAccessToken(access_token.at);



router.get('/',(req,res,next)=>{

    res.render('facebook');
    graph.extendAccessToken({
        "access_token":   access_token.at
      , "client_id":      conf.client_id
      , "client_secret":  conf.client_secret
    }, function (err, facebookRes) {
       console.log(facebookRes);
    });
    var wallPost = {
        message: "I'm gonna come at you like a spider monkey, chip!"
      };
    graph.post('/feed', wallPost, function(err, r) {
        // returns the post id
        console.log(r); // { id: xxxxx}
        res.json(r);
    });
})




module.exports=router;