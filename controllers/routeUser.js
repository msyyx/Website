var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js');

/* GET /host all hosts. */
router.get('/', function(req, res, next) {
    /*Host.find(function (err, hosts) {
        if (err) return next(err);
        res.json(hosts);
    });
    */
    res.sendFile('register.html', {root: "view/"});
});


/* show all hosts */
router.get('/show', function(req, res, next) {
console.log("here I am");

    User.find(function (err, users) {
    if (err) return next(err);
    console.log(users);
    res.json(users);
    });
});

/* add a host */
router.post('/add', function(req, res, next) {
    User.find({'username':req.body.username}, function(err, users) {
        if (err) return next(err);
        console.log(users);
        if (users[0] == null){
            new User({
                //owner    : req.cookies.user_id,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }).save( function ( err, user, count ){
                if( err ) return next( err );

                res.end("Submission completed");
                //res.redirect( '/' );
            });
            console.log("added new user");
        };
    });

});

/***** Not yet implement

 // GET /host/id
 router.get('/:id', function(req, res, next) {
    Host.findById(req.params.id, function (err, host) {
        if (err) return next(err);
        res.json(host);
    });
});

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