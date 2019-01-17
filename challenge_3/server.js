var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

<<<<<<< HEAD
var port = 3000;
 app.use(express.static(__dirname + "/public"));  //sets up index.html on localhost

app.post('/createUser', function(req, res){
    console.log('creating user');
    res.end();
});

app.post('/billing', function(req, res){
    console.log('Billing Info');
    res.end();
});

app.post('/shipping', function(req, res){
    console.log('Shipping Info');
    res.end();
});

app.get('/confirmation', function(req, res){
    console.log('confirmation');
    res.end();
});

app.listen(port, function(){
    console.log(`Listening on port ${port}!`);
=======
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
>>>>>>> 472a1c67dc05ba439a72004c8237373cccea7e98
});