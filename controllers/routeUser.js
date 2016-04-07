var express = require('express');
var app = express();
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var crypto = require('crypto');

/* GET /host all hosts. */
router.get('/', function (req, res, next) {
    /*Host.find(function (err, hosts) {
        if (err) return next(err);
        res.json(hosts);
    });
    */
    res.sendFile('register.html', {root: "view/"});
});


/* show all hosts */
router.get('/show', function (req, res, next) {
    User.find(function (err, users) {
    if (err) return next(err);
    console.log(users);
    res.json(users);
    });
});

/* add a host */
router.post('/add', function (req, res, next) {
    var key = crypto.pbkdf2Sync(req.body.password, 'salt', 10000, 512);
    console.log(key.toString('hex'));
    User.find({'username':req.body.username}, function (err, users) {
        if (err) return next(err);
        console.log(req.body.username);
        if (users[0] == null){
            new User({
                //owner    : req.cookies.user_id,
                username: req.body.username,
                email: req.body.email,
                password: key
            }).save(function ( err, user, count ){
                if( err ) return next( err );
                res.status(200);
                res.end("Submission completed");
                //res.redirect( '/' );
            });
        }else{
            return next(new Error("Invalid Username"));
        }
    });

});

// GET /host/username, password
router.post('/find', function (req, res, next) {
    var key = crypto.pbkdf2Sync(req.body.password, 'salt', 10000, 512);
    User.find({'username':req.body.username, 'password':key}, function (err, users) {
        if (err) return next(err);
        if (!(users[0] == null)){
            var token = jwt.sign(users[0], 'SecretKey', {
                expiresIn: 1440*60 // expires in 24 hours
            });
            //console.log(token);
            res.send(token);
            res.status(200);            
            res.end("Information found");
        }else{
            return next(new Error("Incorrect information"));
        }
    });
});

router.post('/findGoogle', function (req, res, next) {
    User.find({'username':req.body.username}, function (err, users) {
        if (err) return next(err);
        if (!(users[0] == null)){
            var token = jwt.sign(users[0], 'SecretKey', {
                expiresIn: 1440*60 // expires in 24 hours
            });
            //console.log(token);
            res.send(token);            
            res.end("Information found");
        }else{
            User.find({'username':req.body.username}, function (err, users) {
                if (err) return next(err);
                console.log(req.body.username);
                new User({
                    //owner    : req.cookies.user_id,
                    username: req.body.username,
                    email: req.body.email,
                    name: req.body.name
                }).save(function ( err, user, count ){
                    if( err ) return next( err );
                    res.end("Submission completed");
                });
                res.end("Information registered");
            });
        }
    });
});

/***** Not yet implement
 //update host information
 router.put('/:id', function(req, res, next) {
    Host.findByIdAndUpdate(req.params.id, req.body, function (err, host) {
        if (err) return next(err);
        res.json(host);
    });
});

 // DELETE /host/:id
 router.delete('/:id', function(req, res, next) {
    Host.findByIdAndRemove(req.params.id, req.body, function (err, host) {
        if (err) return next(err);
        res.json(host);
    });
});

 */

module.exports = router;