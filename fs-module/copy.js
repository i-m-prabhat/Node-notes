const fs = require("fs");
fs.readFile("A.txt","utf8",(err,data)=>{
   if(err == null){
      //console.log(data);
      fs.writeFile("B.txt",data,"utf8",(error)=>{
        if(error == null){
            console.log('data copied from A to B');
        }
      })
   }
});


