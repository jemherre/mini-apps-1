var FileAPI = require('file-api');
var FileReader = FileAPI.FileReader;

var openFile = function(event){
    var reader = new FileReader();
    var fileInput = event.target;
    reader.onload = function () {
        var buffer = reader.result;
        console.log(buffer);
    }
    reader.readAsBinaryString(fileInput.files[0]);
};

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
            for(var i = 0; i< obj[key].length; i++){
                result += csvParse(obj[key][i], [], keyCol);
            }
        }
    }
    if(result === ''){
        result = arr.join() + '\n';
    }
    return result;//return stringified array
};

var renderForm = function(){
    return `<form action="/getCSV" method="post">
            <input type="text" name="textarea">
            <input type="submit" value="Submit">
    </form>`;
};


module.exports = {openFile, csvParse, renderForm};