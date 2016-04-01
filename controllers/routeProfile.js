var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var profile = require('../models/profiledb.js');

// GET 
router.get('/', function(req, res, next) {
    
    res.sendFile('profile.html', {root: "view/"});
});


/* show all profile */
 router.get('/show', function(req, res, next) {
 console.log("here am i");

      profile.find(function (err, username) {
      if (err) return next(err);
      console.log(username);
      res.json(username);
      });
});

/* add a user profile  */
/*router.post('/add', function(req, res, next) {
    new profile({
        
        username    : req.body.username,
        dateofbirth : req.body.dateofbirth,
        email : req.body.email,
    }).save( function ( err, host, count ){
        if( err ) return next( err );

        res.end("Submission completed");
    });


});
*/
/*
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