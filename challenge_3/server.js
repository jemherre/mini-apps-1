var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/create_account',function(req, res){

});

app.post('/shipping_info',function(req, res){

});

app.post('/billing_info',function(req, res){

});

app.get('/confirmation',function(req, res){

});

app.listen(3000, function(){
    console.log('Listening on port: 3000!');
});