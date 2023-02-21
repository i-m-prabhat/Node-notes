// stats is used to see status or statistics about file
const fs = require("fs");

// fs.stat("C:/Users/anshu/Desktop/node/fs-module/copy.js",(error,fileInfo)=>{
fs.stat("F:\Node-Notes\fs-module/copy.js",(error,fileInfo)=>{
    if(error == null){
      let sizeKb = fileInfo.size / 1024; //size convert in Bytes to KB

          fileInfo['size'] = sizeKb; //OverRide the FileInfor
          
          console.log('Size is '+fileInfo.size+' KB.');

          //console.log(fileInfo);

    }
    
})