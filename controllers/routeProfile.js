

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('../models/user.js');


router.get('/', function(req, res, next) {
   
    res.sendFile('profile.html', {root: "view/"});
});

router.put('/update', function(req, res, next) {

    User.update( { _id:req.body._id},
      {name:req.body.name,
        email:req.body.email,
        dateofbirth:req.body.dateofbirth,       
       
      }, function (err, user) {
        if (err) return next(err);
        //res.json(host);
        console.log(user);
        res.json(user);
    });
});

router.post('/load', function(req,res,next){

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'SecretKey', function(err, decoded) {          
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });      
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;  
                res.send({username : decoded._doc.username,
                            name: decoded._doc.name,
                            email:decoded._doc.email,
                            dateofbirth: decoded._doc.dateofbirth,
                            recentltvisit: decoded._doc.recentltvisit,
                            _id : decoded._doc._id

                });
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.'
        });
        
    }
    
});

router.get('/:id', function(req, res, next) {
     res.sendFile('display.html', {root: "view/"});
});


router.get('/:id/info',function(req,res,next){
    User.findById(req.params.id, function(err, user){
    if (err) return next(err);
 
    res.send({username : user.username,
                            name: user.name,
                            email:user.email,
                            dateofbirth: user.dateofbirth,
                            recentltvisit: user.recentltvisit,
                            _id : user._id

                });
    });
})

module.exports = router;