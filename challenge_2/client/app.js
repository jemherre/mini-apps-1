var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

// app.post('/getCSV', function(req, res){
//     //make sure data has no semicolon
//     var keyColumn = {};
//     var result = csvParse(data, [], keyColumn);
//     var csvData = Object.keys(keyColumn).join() + '\n' + result;
//     res.send(`${renderForm()}<br><p>${csvData}</p>`);
//   });

app.post('/upload_json', function(req, res){
     var data = JSON.parse(req.body.fileData.split(';')[0]);
    var keyList = {};
    var result = csvParse(data, [], keyList);
    var csvData = Object.keys(keyList).join() + '\n' + result;
    console.log(csvData);
    res.send(`<p>${csvData}</p>`);
});


module.exports = app;