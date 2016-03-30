var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Host = require('../models/host.js');

/* GET /host all hosts. */
router.get('/', function(req, res, next) {
    Host.find(function (err, hosts) {
        if (err) return next(err);
        res.json(hosts);
    });
});


/* GET /host/id */
router.get('/:id', function(req, res, next) {
    Host.findById(req.params.id, function (err, host) {
        if (err) return next(err);
        res.json(host);
    });
});

/* update host information */
router.put('/:id', function(req, res, next) {
    Host.findByIdAndUpdate(req.params.id, req.body, function (err, host) {
        if (err) return next(err);
        res.json(host);
    });
});

/* DELETE /host/:id */
router.delete('/:id', function(req, res, next) {
    Host.findByIdAndRemove(req.params.id, req.body, function (err, host) {
        if (err) return next(err);
        res.json(host);
    });
});

/* add a host */
router.post('/', function(req, res, next) {
    new Host({
        //owner    : req.cookies.user_id,
        name    : req.body.name,
        description : req.body.description
    }).save( function ( err, host, count ){
        if( err ) return next( err );

        res.redirect( '/' );
    });
});

module.exports = router;