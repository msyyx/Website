var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./controllers/routeUser.js');

var app = express();
var port = 3000;

app.listen(port);

mongoose.connect('mongodb://localhost/db', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'view')));


/** Routing Modules Configuration **/
app.use('/user',userRoute);
app.use('/', function(req, res){res.sendFile('main.html', {root: "./view/"});});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

