
var renderForm = function(){
    return `<form action='/getCSV' method='post'>
            <input type="text" name="textarea">
            <input type="submit" value="Submit">
    </form>`;
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

var openFile = function(event){
    var reader = new FileReader();
    var fileInput = event.target;
    //check if file was selected
    if(fileInput.files.length !== 0){
        reader.onload = function () {
            var buffer = reader.result;
            var data = JSON.parse(buffer.split(';')[0]);
            var keyList = {};
            var result = csvParse(data, [], keyList);
            var csvData = Object.keys(keyList).join() + '\n' + result;
            console.log(csvData);
            document.getElementById('form').innerHTML = `
            <form>
                <input type="file" onchange='openFile(event)'>
            </form>
            <br><p>${csvData}</p>`;
        }
        reader.readAsBinaryString(fileInput.files[0]);
    } else {

    }
};



module.exports = {openFile, csvParse, renderForm};