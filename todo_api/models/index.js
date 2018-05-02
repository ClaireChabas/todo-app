/*
    INITIALIZING MONGOOSE
*/

var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo'); // When you require the models directory you're getting the Todo model