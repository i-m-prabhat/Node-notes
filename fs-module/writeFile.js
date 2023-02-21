const fs = require("fs");


let content = "This is Output line writen in double Qoutes.";

fs.writeFile("output.txt",content,"utf8",onWriteCompleted)

//Example Asynchronous.
function onWriteCompleted(error){
    if(error == null){
        console.log('writing file completed');
    }
}

console.log('writing on process...');

