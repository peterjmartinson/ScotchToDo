

// set up ============================
var express = reqire('express');
var app     = express();
var mongoose : require('mongoose');
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

// listen ===========================
app.listen(8080);
console.log("App listening on port 8080');
