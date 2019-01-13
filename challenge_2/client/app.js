$(document).ready(function(){
    $('form').on('submit', function(event){
        event.preventDefault();
        var reader = new FileReader();
        var fileInput = document.getElementById('inputFile').files;
        if(fileInput.length !== 0){
            reader.onload = function () {
                var fileData = reader.result;
                console.log(fileData);
                $.ajax({
                    method: 'POST', 
                    url: '/upload_json',
                    data: {fileData},
                    success: function(result){
                        console.log(result);
                        //render html page here
                        $('#csvTemplate').html('');//clear before appending
                        $('#csvTemplate').append(result);
                    }
                });
            }
            reader.readAsBinaryString(fileInput[0]);
        }

    });

});
