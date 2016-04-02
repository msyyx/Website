

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js');


router.get('/', function(req, res, next) {
   
    res.sendFile('profile.html', {root: "view/"});
});

router.put('/:id', function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
       	User.update(
       	{username: req.body.Username},
       	{
       		username: req.body.Username,
       		email :req.body.email,
       		dateofbirth: req.body.birthdate,
       		name :req.body.name,

       	},
       	{upsert:true}
       	)

        res.json(user);


        res.redirect( '/' );
    });
});

module.exports = router;