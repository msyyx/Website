var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Host = require('../models/host.js');
var jwt = require('jsonwebtoken');

/* GET /host all hosts. */
router.get('/', function(req, res, next) {
    res.sendFile('newHost.html', {root: "view/"});
});


/* show all hosts */
 router.get('/show', function(req, res, next) {

      Host.find(function (err, hosts) {
      if (err) return next(err);
      res.json(hosts);
      });
});
/*search by name(:id)*/
router.get('/search/:id', function(req, res, next) {
    var regex = new RegExp(req.params.id, 'i');
    Host.find({ name : regex} , function(err,q){
            res.send(q);
        }
    );

});



/* add a host */
router.post('/add', function(req, res, next) {
    //verify login
    var token = req.body.token;

    // decode token
    if (token) {
        console.log("token is" + token);
        // verifies secret and checks exp
        jwt.verify(token, 'SecretKey', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Please login first!'});
            } else {
                // if everything is good, save to request for use in other routes

                new Host({
                    owner   : decoded._doc._id,
                    ownerName: decoded._doc.username,
                    contact: req.body.contact,
                    name    : req.body.name,
                    description : req.body.description,
                    items: JSON.parse(req.body.items),
                    prices: JSON.parse(req.body.prices),
                    hours: JSON.parse(req.body.hours),
                }).save( function ( err, host, count ){
                    if( err ) return next( err );
                    console.log(host);

                    res.end( '/host/'+host._id );
                });
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'Please login!'
        });
    }


});

 // GET /host/id
 router.get('/:id', function(req, res, next) {
     res.sendFile('HostPage.html', {root: "view/"});
});

router.get('/:id/info', function(req, res, next) {
    console.log("looking for info");
    Host.findById(req.params.id, function (err, host) {
        if (err) return next(err);
        res.json(host);
    });
});



module.exports = router;
