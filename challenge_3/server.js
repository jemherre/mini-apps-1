var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var db = require('./config').db;
var dbInit = require('./config').dbInit;
//create Tables
dbInit();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 3000;
var currUser = 0;

 app.use(express.static(__dirname + "/public"));  //sets up index.html on localhost

app.post('/createUser', function(req ,res) {
	db.serialize(function(){
		db.run(`INSERT INTO Users (name, email, password) VALUES('${req.body.name}', '${req.body.email}', '${req.body.password}')`);
		db.get(`SELECT id FROM Users WHERE name = '${req.body.name}'`,[],
		function(err, rows){
			if(err){
				console.log(err.message);
			} else {
				currUser = rows.id;
			}
		});
	});
  res.end('user created');
});

app.post('/shipping', function(req, res){
    db.serialize(function(){
        db.run(`INSERT INTO ShippingInfo (add1, add2, city, state, user_id), VALUES(${req.body.add1}, ${req.body.add2}, ${req.body.city}, ${req.body.state},${currUser})`);
    });
    res.end('shipped');
});

app.post('/billing', function(req, res){
	db.serialize(function(){
		db.run(`INSERT INTO BillingInfo (cc, exp, cvv, zip, user_id), VALUES(${req.body.cc}, ${req.body.exp}, ${req.body.cvv}, ${req.body.zip},${currUser})`);
});
    res.send('billed');
});

app.get('/confirmation', function(req, res){
	//do an inner join and structure html
	db.serialize(function(){
		db.all(`SELECT * FROM Users, WHERE name = '${req.body.name}'`,[],
		function(err, rows){
			if(err){
				console.log(err.message);
			} else {
				currUser = rows.id;
			}
		});
	});
    res.send('confirmed');
});

app.listen(port, function(){
    console.log(`Listening on port ${port}!`);
});