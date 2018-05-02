var express = require('express');
var router = express.Router(); // Express Router allows us to break our routes into little modular chunks that we'll be able to require in our main index.js file.
var db = require('../models');

router.get('/', function(req, res) {
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    })
});



module.exports = router;
