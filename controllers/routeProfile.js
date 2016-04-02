

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js');


router.get('/', function(req, res, next) {
   
    res.sendFile('profile.html', {root: "view/"});
});

router.put('/id', function(req, res, next) {

    User.update( { _id:req.body.params.id},
      {name:req.body.name,
        email:req.body.email,
        dateofbirth:req.body.dateofbirth,       
       
      }, function (err, user) {
        if (err) return next(err);
        //res.json(host);
        console.log(user);
    });
});

module.exports = router;