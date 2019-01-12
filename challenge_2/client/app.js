var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static('client'));
// app.set('client', __dirname + '/client');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/getCSV', function(req, res){
    // res.send('hello world');
    console.log('enter');
    console.log(req.body.textarea);
    res.end();
  });
  

module.exports = app;