var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var jsonParse = function (obj, arr, keyCol){
    var result = '';
    for(var key in obj){
        if(!keyCol[key] & (key != 'children')) { //add new key into key column list
            keyCol[key] = key; 
        } 
        if(key !== 'children'){
            arr.push(obj[key]);
        } else {
            result = arr.join() + '\n';
            for(var i = 0; i< obj[key].length; i++){
                result += jsonParse(obj[key][i], [], keyCol);
            }
        }
    }
    if(result === ''){
        result = arr.join() + '\n';
    }
    return result;//return stringified array
};

var renderForm = function(){
    return `<form action='/getCSV' method='post'>
            <input type="text" name="textarea">
            <input type="submit" value="Submit">
    </form>`;
};

app.post('/getCSV', function(req, res){
    //make sure data has no semicolon
    var data = JSON.parse(req.body.textarea);
    var keyColumn = {};
    var result = jsonParse(data, [],keyColumn);
    var csvData = Object.keys(keyColumn).join() + '\n' + result;
    res.send(`${renderForm()}<br><p>${csvData}</p>`);
  });

module.exports = app;