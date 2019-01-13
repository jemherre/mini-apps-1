var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var library = require('./helperFunc');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/getCSV', function(req, res){
    //make sure data has no semicolon
    var keyColumn = {};
    var result = library.csvParse(data, [],keyColumn);
    var csvData = Object.keys(keyColumn).join() + '\n' + result;
    res.send(`${library.renderForm()}<br><p>${csvData}</p>`);
    res.end();
  });

module.exports = app;