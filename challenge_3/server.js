var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var db = require('./config').db;
var dbInit = require('./config').dbInit;
//create Tables
dbInit();
//deleteTables --> when app closes, before rstart
// dbclose();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 3000;
var currUser = 2;

 app.use(express.static(__dirname + "/public"));  //sets up index.html on localhost

app.post('/createUser', function(req ,res) {
    //puts info into DB
	var user = {
		'currUser': currUser,
		'name': req.body.name,
		'email': req.body.email,
		'password': req.body.password
	};
// console.log(user);
	db.serialize(function(){
		var sql = `INSERT INTO Users (name, email, password) VALUES('${user.name}', '${user.email}', '${user.password}')`;
		// db.run('INSERT INTO Users (id, name, email, password) VALUES($currUser,$name, $email, $password)',user,function(err){
		// 		if(err) console.log('ERROR: INSERT USER',err.message);
		// });
		db.run(sql, function(err){
			if(err) console.log(err.message);
			console.log(this.changes);
		});
		db.get('SELECT * FROM Users',function(err, rows){
			if(err){
				console.log(err.message);
			} else {
				console.log(rows);
			}
		});
		
	});

    res.send('yaya!');
});

app.post('/shipping', function(req, res){
    var user = req.body;
    // db.serialize(function(){
    //     db.run(`INSERT INTO ShippingInfo(add1, add2, city, state), VALUES(${user.name}, ${user.email}, ${user.password})`);
    // });
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