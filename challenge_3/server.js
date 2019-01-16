var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 3000;
 app.use(express.static(__dirname + "/public"));  //sets up index.html on localhost

app.post('/createUser', function(req, res){
    console.log('creating user');
    res.end();
});

app.listen(port, function(){
    console.log(`Listening on port ${port}!`);
});