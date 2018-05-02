var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// Importing all our routes from routes/todos.js
var todoRoutes = require('./routes/todos');

app.get('/', function(req, res) {
    res.send('Hello I am the root route');
});

app.use('/api/todos', todoRoutes);

app.listen(port, function() {
    console.log("APP IS RUNNING ON PORT "+port);
});