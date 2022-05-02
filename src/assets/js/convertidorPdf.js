base64Global = new Array(5);
var base64Simple;

function convertToBase64(variable) {

    //Read File
    var selectedFile = document.getElementById("inputFile"+variable).files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad  = selectedFile[0];

        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console}

            if(variable ==1){
                base64Global[0] = base64;
            }
            
            if(variable == 2){
                base64Global[1] = base64;
            }

            if(variable == 3){
                base64Global[2] = base64;
            }

            if(variable == 4){
                base64Global[3] = base64;
            }

            if(variable == 5){
                base64Global[4] = base64;
            }
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
}

function getBase64(){
    return base64Global;
}

function getBase64Simple(){
    return base64Simple;
}

function convertToBase64Simple(variable) {
    //Read File
    var selectedFile = document.getElementById(variable).files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad  = selectedFile[0];

        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            //console.log(base64);
            base64Simple = base64;
            // Print data in console}
            //return base64;
        };

        //console.log(base64Simple);
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
}


