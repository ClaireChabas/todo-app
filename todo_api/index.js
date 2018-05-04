var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

// Importing all our routes from routes/todos.js
var todoRoutes = require('./routes/todos');

// We use body-parser to access the request body from a POST or PUT request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Getting access to our views files
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);

app.listen(port, function() {
    console.log("APP IS RUNNING ON PORT "+port);
});