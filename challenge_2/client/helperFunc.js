
// var openFile = function(event){
//     var reader = new FileReader();
//     var fileInput = event.target;
//     //check if file was selected
//     if(fileInput.files.length !== 0){
//         reader.onload = function () {
//             var buffer = reader.result;
//             var data = JSON.parse(buffer.split(';')[0]);
//             var keyList = {};
//             var result = csvParse(data, [], keyList);
//             var csvData = Object.keys(keyList).join() + '\n' + result;
//             console.log(csvData);
//             document.getElementById('form').innerHTML = `
//             <form>
//                 <input type="file" onchange='openFile(event)'>
//             </form>
//             <br><p>${csvData}</p>`;
//         }
//         reader.readAsBinaryString(fileInput.files[0]);
//     } else {

//     }
// };

// module.exports = {csvParse, renderForm};