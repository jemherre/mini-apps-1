var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var csvParse = function (obj, arr, keyCol){
  var result = '';
  for(var key in obj){
    if(!keyCol[key] & (key != 'children')) { //add new key into key column list
      keyCol[key] = key; 
    } 
    if(key !== 'children'){
      arr.push(obj[key]);
    } else {
      result = arr.join() + '\n';
      for(var i = 0; i< obj[key].length; i++){//iterate through children recursion
        result += csvParse(obj[key][i], [], keyCol);
      }
    }
  }
  if(result === ''){
    result = arr.join() + '\n';
  }
  return result;//return stringified csv data
};

app.post('/upload_json', function(req, res){
  var data = JSON.parse(req.body.fileData.split(';')[0]);
  var keyList = {};
  var result = csvParse(data, [], keyList);
  var csvData = Object.keys(keyList).join() + '\n' + result;
  console.log(`${req.body.name}\n`, csvData);
  //create file to be ready to download
  fs.writeFile('csv_report.csv', csvData, function(err){
    if(err) console.log('ERROR: Creating File ');
    console.log('File created');
  });
  res.send(`<p>${csvData.split('\n').join('<br>')}</p>`);
});

app.get('/download_json', function(req, res){
  res.download('./csv_report.csv');
});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
  });
  
