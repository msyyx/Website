var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Host = require('../models/host.js');
var History = require('../models/history.js');

//var app = express();

//direct to order page with localhost:3000/order

router.get("/", function(req,res) {
  res.sendFile('order.html', {root:"view/"});
});

router.post("/add", function(req,res, next) {
  new History({
    hostName: req.body.id,
    date: req.body.date,
    orderDetail: req.body.orderDetail,
    userName: req.body.username,
    comment: ''
  }).save(function(err, host, count) {
    if(err){
      res.status(500);
    }
    console.log(host);
    res.end();
  });
});

//router.get("/")

module.exports = router;
