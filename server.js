var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var hostRoute = require('./controllers/routeHost.js');
var orderRoute = require('./controllers/routeOrder.js');
var userRoute = require('./controllers/routeUser.js');
var profileRoute = require('./controllers/routeProfile.js');
var app = express();
var port = 3000;

var server = app.listen(port);

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
app.use('/host',hostRoute);
app.use('/order', orderRoute);
app.use('/user',userRoute);
app.use('/profile',profileRoute);
app.use('/search',function(req, res){res.sendFile('search.html', {root: "./view/"});});
app.use('/', function(req, res){res.sendFile('main.html', {root: "./view/"});});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

exports.listen = function(port) {
  console.log("Listening on port" + port);
  app.listen(port);
}

exports.close = function() {
  console.log("server closed");
  server.close();
}
