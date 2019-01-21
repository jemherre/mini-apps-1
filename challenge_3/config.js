var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./shoppingcart.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the main database.');
}); //opens and updates data in file
 
var init = function(){
  db.run('SELECT * FROM Users',function(err){
    if(err){ //no such table exists
      createDB(); //then create the tables
    } else {
      //drop tables 
      dropDB();
      //and recreate them
      createDB();
    }
  });
};

var createDB = function(){
  console.log('creating tables');
  db.serialize(function() {
    db.run(`CREATE TABLE Users (id INTEGER PRIMARY KEY, name varchar, email varchar, password varchar)`);
    db.run(`CREATE TABLE ShippingInfo (id INTEGER PRIMARY KEY, add1 varchar, add2 varchar,city varchar, state varchar, zip int, phonenumber int, foreignKey int)`);
    db.run(`CREATE TABLE BillingInfo (id INTEGER PRIMARY KEY,cc int, exp date,cvv int, zip int, foreignKey int)`);
    db.run(`INSERT INTO Users (name, email, password) VALUES('Jess', 'jessaa', 'passs')`);
  });
};

var dropDB = function(){
  console.log('dropping tables');
  db.serialize(function() {
    db.run(`DROP TABLE Users`);
    db.run(`DROP TABLE ShippingInfo`);
    db.run(`DROP TABLE BillingInfo`);
  });
  // db.close((err) => {
  //   if (err) {
  //     console.error(err.message);
  //   }
  //   console.log('Close the database connection.');
  // });
};

module.exports.db = db;
module.exports.dbInit = init;
//db.close(); //closes the database- maybe when we unmount/close react app