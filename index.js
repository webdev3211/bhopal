var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Twit = require('twit');
var twitterRoute=require('./routes/twitter');
 


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

//twitter bot setup
//var T = new Twit(require('./config/config'));


//Setting Up Routes
app.use('/twitter',twitterRoute);


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('Server started on the port ' + app.get('port'));
});