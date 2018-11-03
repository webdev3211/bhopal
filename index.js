var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

// Set Port
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Server started on port ' + app.get('port'));
});