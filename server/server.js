var express = require('express');
var app = express();

var port = 3000;

app.listen(port);

app.get('/*',function(req, res){
    console.log(req.url);
    if(req.url == '/') {
        res.sendFile('main.html', {root: "../"});
    }
    else{
        res.sendFile(req.url, {root: "../"});

    }
});