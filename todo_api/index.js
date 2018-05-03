var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

// Importing all our routes from routes/todos.js
var todoRoutes = require('./routes/todos');

// We use body-parser to access the request body from a POST or PUT request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.send('hi there');
});

app.use('/api/todos', todoRoutes);

app.listen(port, function() {
    console.log("APP IS RUNNING ON PORT "+port);
});