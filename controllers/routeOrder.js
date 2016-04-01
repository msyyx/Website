var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Host = require('../models/host.js');

//var app = express();

//direct to order page with localhost:3000/order

router.get("/", function(req,res) {
  res.sendFile('order.html', {root:"view/"})
});

module.exports = router;
