/*
 * https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
*/

// set up ============================
var express = reqire('express');
var app     = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ====================

mongoose.connect('mongodb://gordon:gecko@ds011218.mlab.com:11218/scotchtododb')

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'});
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

// define model ====================
var Todo = mongoose.model('Todo', { text : String } );

// routes ===========================
  // api ----------------------------
  app.get('/api/todos', functin(req, res) {
    
    // use mongoose to get all records in the database
    Todo.find(function(err, todos) {
      
      // catch the error
      if (err)
        res.send(err)

      res.json(todos); // return all todos in JSON format
    });
  });

  // CREATE
  app.post('/api/todos', function(req,res) {
    
    // create a todo
    Todo.create({
      text : req.body.text,
      done : false
    }, function(err, todo) {
      if (err)
        res.send(err);

      // get and return all the todos after you create one
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });

  });

  // DELETE
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      // get and return all the todos
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });

  });

// application ======================
// The following is the front end:
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});


// listen ===========================
var port = process.env.PORT; 
app.listen( app.get('port'), function() {
  console.log('App is listening on port ', app.get('port'));
});
