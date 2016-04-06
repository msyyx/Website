var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Host = require('../models/host.js');
var History = require('../models/history.js');
var jwt = require('jsonwebtoken');


//var app = express();

//direct to order page with localhost:3000/order

router.get("/", function(req,res) {
  res.sendFile('order.html', {root:"view/"});
});

router.get("/comment/:hostname", function(req,res) {
  //console.log(321312);
  res.sendFile('comment.html', {root:"view/"});
});

router.post("/add", function(req,res, next) {
  new History({
    hostID: req.body.id,
    date: req.body.date,
    orderDetail: req.body.orderDetail,
    userName: req.body.username,
    hostName: req.body.hostName,
    hostOwner: req.body.hostOwner,
    comment: ''
  }).save(function(err, host, count) {
    if(err){
      res.status(500);
    }
    console.log(host);
    res.end();
  });
});

router.get('/:id', function (req, res) {
  var username = req.params.id;
  History.find({'userName' : username}, function(err, data) {
    res.json(data);

  })
});

router.post('/update', function(req,res) {
  console.log("hi");
  var hostID = req.body.hostID;
  var comment = req.body.comment;
  var username = req.body.username;
  var rate = req.body.rate;
  console.log(hostID);
  console.log(comment);
  console.log(username);
  History.update({'hostID' : hostID, 'userName' : username, 'comment' : ''}, {'comment' : comment, 'rate' : rate}, function(err, data) {
    if(err) {
      console.log("err");
      res.status(403);
    }
    console.log('good');
    res.end();
  })
});

//show histories of a given host
router.get('/showhost/:hostID', function(req,res) {
  var hostID = req.params.hostID;
  console.log("looking for host");
  console.log(hostID);
  History.find({'hostID' : hostID}, function(err,data) {
    //if (err) res.status(403);
    console.log(data);

    res.json(data);
  });
});

router.post('/show', function (req,res) {
  console.log(5677);
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  // decode token
  if (token) {

      // verifies secret and checks exp
      jwt.verify(token, 'SecretKey', function(err, decoded) {
          if (err) {
            console.log(1234);
              return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;
              console.log(decoded._doc.username);
              History.find({'userName' : decoded._doc.username}, function(err, data) {
                res.json(data);
                console.log(1111);
              })

          }
      });
    }
});

router.post('/myorder', function(req,res) {
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  // decode token
  if (token) {

      // verifies secret and checks exp
      jwt.verify(token, 'SecretKey', function(err, decoded) {
          if (err) {
            console.log(1234);
              return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;
              console.log(decoded._doc.username);
              History.find({'hostOwner' : decoded._doc.username}, function(err, data) {
                res.json(data);
                console.log(1121);
              })

          }
      });
    }
});

//router.get("/")

module.exports = router;
