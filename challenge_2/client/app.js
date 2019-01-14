$(document).ready(function(){
    $('form').on('submit', function(event){
        event.preventDefault();
        var reader = new FileReader();
        var fileInput = document.getElementById('inputFile').files;
        if(fileInput.length !== 0){
            reader.onload = function () {
                var fileData = reader.result;
                $.ajax({
                    method: 'POST', 
                    url: '/upload_json',
                    data: {
                        'name': fileInput[0].name,
                        fileData},
                    success: function(result){
                        //render html page here
                        $('.csvTemplate').html('');//clear before appending
                        $('.csvTemplate').attr('filename', fileInput[0].name);
                        $('.csvTemplate').append(result);
                    }
                });
            }
            reader.readAsBinaryString(fileInput[0]);
        }

    });

});
