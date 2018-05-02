var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Hello I am your express server ready to serve :)');
});

app.listen(port, function() {
    console.log("APP IS RUNNING ON PORT "+port);
});