var express = require('express');
var router = express.Router(); // Express Router allows us to break our routes into little modular chunks that we'll be able to require in our main index.js file.
var db = require('../models');
var helpers = require('../helpers/todos');

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo)

router.route('./:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.removeTodo)

module.exports = router;
