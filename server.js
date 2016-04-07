var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var	compress = require('compression');
var	cluster	=require('cluster');
var	numCPUs	=require('os').cpus().length;


var hostRoute = require('./controllers/routeHost.js');
var orderRoute = require('./controllers/routeOrder.js');
var userRoute = require('./controllers/routeUser.js');
var profileRoute = require('./controllers/routeProfile.js');
var app = express();
var port = 3000;




if	(cluster.isMaster)	{
    for	(var i	=0;	i <	numCPUs;i++)
        cluster.fork();
} else {
    mongoose.connect('mongodb://localhost/db', function(err) {
        if(err) {
            console.log('connection error', err);
        } else {
            console.log('connection successful');
        }
    });

    app.use(compress());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'view'), {maxAge:86400000}));



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

    app.listen(port);


}
exports.listen = function(port) {
    console.log("Listening on port" + port);
    app.listen(port);
}

exports.close = function() {
    console.log("server closed");
    app.close();
}