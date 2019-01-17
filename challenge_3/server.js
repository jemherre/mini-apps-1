var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 3000;
 app.use(express.static(__dirname + "/public"));  //sets up index.html on localhost

app.post('/createUser', function(req, res){
    console.log('creating user', req.body);
    //puts info into DB
    res.send('yaya!');
});

app.post('/shipping', function(req, res){
    console.log('Shipping Info', req.body);
    //puts info into DB
    res.send('shipped');
});

app.post('/billing', function(req, res){
    console.log('Billing Info', req.body);
    //puts info into DB
    res.send('billed');
});

app.get('/confirmation', function(req, res){
    console.log('confirmation', req.body);
    //returns info from DB
    res.send('confirmed');
});

app.listen(port, function(){
    console.log(`Listening on port ${port}!`);
});
