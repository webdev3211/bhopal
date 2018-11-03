var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Twit = require('twit');
var twitterRoute=require('./routes/twitter');
var facebookRoute=require('./routes/facebook');
const multer = require('multer');
var request = require('request');
// Init App
var app = express();


// View Engine
app.set('view engine', 'ejs');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));


var instagram = require('instagram-node').instagram();
instagram.use({
    client_id: '5f7dfba5fc484d289c83a29880ebf993',
    client_secret: '6a2387eb67214baea4ee54bdf42a0c2c'
});

var redirect_uri = 'http://localhost:3000/feed';

app.get('/oauth', function (req, res) {
    res.redirect(instagram.get_authorization_url(redirect_uri, {
        scope: ['public_content'],
        state: 'a state'
    }));
});


let accessToken;

app.get('/feed', function (req, res) {
    instagram.authorize_user(req.query.code, redirect_uri, function (err, result) {
        if (err) {
            console.log(err);
            res.send("Didn't work");
        } else {
            console.log('Yay! Access token is ' + result.access_token);
            // res.send('You made it!!');
            var accessToken = result.access_token;
            app.set('accessTokenn', accessToken);
            // setTimeout(function () {
                res.redirect('/instagram');
            // }, 2000);

        }
    });
})

app.get('/instagram', function (req, ress) {
    // create a new instance of the use method which contains the access token gotten
    // instagram.use({
    //     access_token: app.get('accessToken')
    // });
    // console.log(access_token);
    console.log('Hello', app.get('accessTokenn'));
    var url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + app.get('accessTokenn');
    var options = {
        url: url,
        method: "GET",
        json: true
    }
    var instadata;
    request(options, (err, res, body) => {
        console.log(body.data);
        ress.render('instagram',{data:body.data});
       // ress.json(body.data);
    })

    //  ig.user_media_recent('access_token.split('.')[0]', function(err, result, pagination, remaining, limit) {
    //      if(err) res.json(err);
    //   // pass the json file gotten to our ejs template
    //      res.render('pages/index', { instagram : result });
    //  });
});

//Multer Setup
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// var upload = multer({
//     storage: storage
// })

//twitter bot setup
//var T = new Twit(require('./config/config'));


//Setting Up Routes
app.use('/twitter',twitterRoute);
app.use('/facebook',facebookRoute);




// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('Server started on the port ' + app.get('port'));
});